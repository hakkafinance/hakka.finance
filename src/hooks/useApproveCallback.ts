import { MaxUint256 } from '@ethersproject/constants';
import { TransactionResponse } from '@ethersproject/providers';
import { TokenAmount, CurrencyAmount, ETHER } from '@uniswap/sdk';
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
  amountToApprove?: CurrencyAmount,
  spender?: string
): [{ state: ApprovalState, txid: string }, () => Promise<void>] {
  const { account } = useActiveWeb3React();
  const token =
    amountToApprove instanceof TokenAmount ? amountToApprove.token : undefined;
  const currentAllowance = useTokenAllowance(
    token,
    account ?? undefined,
    spender
  );
  const [currentTransaction, setCurrentTransaction] = useState(null)

  const approvalInfo: { state: ApprovalState, txid: string | null } = useMemo(() => {
    if (!amountToApprove || !spender) return { state: ApprovalState.UNKNOWN, txid: null };
    if (amountToApprove.currency === ETHER) return { state: ApprovalState.APPROVED, txid: null };
    if (!currentAllowance) return { state: ApprovalState.UNKNOWN, txid: null };

    return { state: currentAllowance.lessThan(amountToApprove)
      ? currentTransaction
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED,
      txid: null };
  }, [currentTransaction, amountToApprove, currentAllowance, spender]);

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

    if (!amountToApprove) {
      console.error('missing amount to approve');
      return;
    }

    if (!spender) {
      console.error('no spender');
      return;
    }

    let useExact = false;
    const estimatedGas = await tokenContract.estimateGas
      .approve(spender, MaxUint256)
      .catch(() => {
        useExact = true;
        return tokenContract.estimateGas.approve(
          spender,
          amountToApprove.raw.toString()
        );
      });

    return tokenContract
      .approve(
        spender,
        useExact ? amountToApprove.raw.toString() : MaxUint256,
        {
          gasLimit: calculateGasMargin(estimatedGas),
        }
      )
      .then((response: TransactionResponse) => {
        setCurrentTransaction(response.hash);
      })
      .catch((error: Error) => {
        console.debug('Failed to approve token', error);
        throw error;
      });
  }, [
    approvalInfo,
    token,
    tokenContract,
    amountToApprove,
    spender,
  ]);

  return [approvalInfo, approve];
}
