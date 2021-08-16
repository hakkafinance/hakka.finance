import React, { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useRewardsContract } from './useContract';
import { useSnackbar } from './useSnackbar';
import { getEtherscanLink, shortenTxId } from '../utils';

export enum ExitState {
  UNKNOWN,
  PENDING
}

export function useExitCallback(
  exitAddress?: string,
  spender?: string,
): [ExitState, () => Promise<void>] {
  const { chainId } = useWeb3React();
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const exitState: ExitState = useMemo(() => {
    if (!spender) return ExitState.UNKNOWN;

    return currentTransaction
      ? ExitState.PENDING
      : ExitState.UNKNOWN;
  }, [currentTransaction, spender]);

  const exitContract = useRewardsContract(exitAddress);

  const exit = useCallback(async (): Promise<void> => {
    if (!spender) {
      console.error('no spender');
      return;
    }

    try {
      const tx = await exitContract.exit();
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
    exitContract,
    spender,
  ]);

  return [exitState, exit];
}
