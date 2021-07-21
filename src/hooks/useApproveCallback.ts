import { MaxUint256, WeiPerEther } from '@ethersproject/constants';
import { TransactionResponse } from '@ethersproject/providers';
import { Token } from '@uniswap/sdk';
import { useState, useCallback, useMemo } from 'react';
import { useTokenAllowance } from '../data/Allowances';
import { calculateGasMargin } from '../utils';
import { useTokenContract } from './useContract';
import { useActiveWeb3React } from './index';

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

export function useApproveCallback(
  tokenToApprove?: Token,
  spender?: string
): [{ state: ApprovalState, txid: string }, () => Promise<void>] {
  const { account } = useActiveWeb3React();
  const token = tokenToApprove;
  const currentAllowance = useTokenAllowance(
    token,
    account ?? undefined,
    spender
  );
  const [currentTransaction, setCurrentTransaction] = useState(null)

  const approvalInfo: { state: ApprovalState, txid: string | null } = useMemo(() => {
    if (!tokenToApprove || !spender) return { state: ApprovalState.UNKNOWN, txid: null };
    if (!currentAllowance) return { state: ApprovalState.UNKNOWN, txid: null };

    return { state: currentAllowance.multiply(WeiPerEther.toString()).lessThan(MaxUint256.toString())
      ? currentTransaction
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED,
      txid: currentTransaction };
  }, [currentTransaction, tokenToApprove, currentAllowance, spender]);

  const tokenContract = useTokenContract(token?.address);

  const approve = useCallback(async (): Promise<void> => {
    if (approvalInfo.state !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily');
      return;
    }
    if (!token) {
      console.error('no token');
      return;
    }

    if (!tokenContract) {
      console.error('tokenContract is null');
      return;
    }

    if (!spender) {
      console.error('no spender');
      return;
    }

    const estimatedGas = await tokenContract.estimateGas.approve(
      spender,
      MaxUint256,
    );

    return tokenContract
      .approve(spender, MaxUint256, {
        gasLimit: calculateGasMargin(estimatedGas),
      })
      .then((response: TransactionResponse) => {
        setCurrentTransaction(response.hash);
        setTimeout(() => setCurrentTransaction(null), 5000);
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error);
        throw error;
      });
  }, [
    approvalInfo,
    token,
    tokenContract,
    tokenToApprove,
    spender,
  ]);

  return [approvalInfo, approve];
}
