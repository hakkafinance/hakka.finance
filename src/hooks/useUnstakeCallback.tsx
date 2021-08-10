import React, { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { useStakeContract } from './useContract';
import { useSnackbar } from './useSnackbar';
import { getEtherscanLink, shortenTxId } from '../utils';

export enum UnstakeState {
  UNKNOWN,
  PENDING
}

export function useUnstakeCallback(
  unstakeAddress: string,
  spender: string,
  index: number,
  amountParsed: BigNumber,
): [UnstakeState, () => Promise<void>] {
  const { chainId } = useWeb3React();
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const unstakeState: UnstakeState = useMemo(() => {
    if (!spender) return UnstakeState.UNKNOWN;

    return currentTransaction
      ? UnstakeState.PENDING
      : UnstakeState.UNKNOWN;
  }, [currentTransaction, spender]);

  const unstakeContract = useStakeContract(unstakeAddress);

  const unstake = useCallback(async (): Promise<void> => {
    if (!spender) {
      console.error('no spender');
      return;
    }

    try {
      const tx = await unstakeContract.unstake(spender, index, amountParsed);
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
    unstakeContract,
    spender,
    index,
    amountParsed,
  ]);

  return [unstakeState, unstake];
}
