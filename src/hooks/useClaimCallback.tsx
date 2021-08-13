import React, { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useRewardsContract } from './useContract';
import { useSnackbar } from './useSnackbar';
import { getEtherscanLink, shortenTxId } from '../utils';

export enum ClaimState {
  UNKNOWN,
  PENDING
}

export function useClaimCallback(
  claimAddress?: string,
  spender?: string,
): [ClaimState, () => Promise<void>] {
  const { chainId } = useWeb3React();
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const claimState: ClaimState = useMemo(() => {
    if (!spender) return ClaimState.UNKNOWN;

    return currentTransaction
      ? ClaimState.PENDING
      : ClaimState.UNKNOWN;
  }, [currentTransaction, spender]);

  const claimContract = useRewardsContract(claimAddress);

  const claim = useCallback(async (): Promise<void> => {
    if (!spender) {
      console.error('no spender');
      return;
    }

    try {
      const tx = await claimContract.getReward();
      setCurrentTransaction(tx.hash);
      enqueueSnackbar(
        <a
          target="_blank"
          href={getEtherscanLink(chainId ?? 1, tx.hash, 'transaction')}
          rel="noreferrer"
        >
          {shortenTxId(tx.hash)}
        </a>,
        tx.hash,
      );
      await tx.wait();
    } catch (err) {
      enqueueSnackbar(
        <div>{err.message}</div>,
        err.message,
      );
    } finally {
      setCurrentTransaction(null);
    }
  }, [
    claimContract,
    spender,
  ]);

  return [claimState, claim];
}
