import { MaxUint256, WeiPerEther } from '@ethersproject/constants';
import { useWeb3React } from '@web3-react/core';
import { Token } from '@uniswap/sdk';
import React, { useState, useCallback, useMemo } from 'react';
import { useTokenAllowance } from '../data/Allowances';
import { useTokenContract } from './useContract';
import { useSnackbar } from './useSnackbar';
import { useActiveWeb3React } from './index';
import { getEtherscanLink, shortenTxId } from '../utils';

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

export function useApproveCallback(
  tokenToApprove?: Token,
  spender?: string
): [ApprovalState, () => Promise<void>] {
  const { account } = useActiveWeb3React();
  const { chainId } = useWeb3React();
  const { enqueueSnackbar } = useSnackbar();
  const token = tokenToApprove;
  const currentAllowance = useTokenAllowance(
    token,
    account ?? undefined,
    spender
  );
  const [currentTransaction, setCurrentTransaction] = useState(null)

  const approvalState: ApprovalState = useMemo(() => {
    if (!tokenToApprove || !spender) return ApprovalState.UNKNOWN;
    if (!currentAllowance) return ApprovalState.UNKNOWN;

    return currentAllowance.multiply(WeiPerEther.toString()).lessThan(MaxUint256.toString())
      ? currentTransaction
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED
  }, [currentTransaction, tokenToApprove, currentAllowance, spender]);

  const tokenContract = useTokenContract(token?.address);

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
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
    
    try {
      const tx = await tokenContract.approve(spender, MaxUint256);
      setCurrentTransaction(tx.hash);
      enqueueSnackbar(
        <a
          target='_blank'
          href={getEtherscanLink(chainId ?? 1, tx.hash, 'transaction')}
        >{shortenTxId(tx.hash)}</a>,
        tx.hash
      );
      await tx.wait()
    } catch (err) {
      enqueueSnackbar(
        <div>{err.message}</div>,
        err.message
      );
    } finally {
      setCurrentTransaction(null)
    }
  }, [
    approvalState,
    token,
    tokenContract,
    tokenToApprove,
    spender,
  ]);

  return [approvalState, approve];
}
