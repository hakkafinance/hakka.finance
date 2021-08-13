import React, { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useRewardsContract } from './useContract';
import { useSnackbar } from './useSnackbar';
import { getEtherscanLink, shortenTxId } from '../utils';
import { parseUnits } from '@ethersproject/units';

export enum DepositState {
  UNKNOWN,
  PENDING
}

export function useDepositCallback(
  depositAddress?: string,
  amount?: string,
  spender?: string,
): [DepositState, () => Promise<void>] {
  const { chainId } = useWeb3React();
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const depositState: DepositState = useMemo(() => {
    if (!spender) return DepositState.UNKNOWN;

    return currentTransaction
      ? DepositState.PENDING
      : DepositState.UNKNOWN;
  }, [currentTransaction, spender]);

  const depositContract = useRewardsContract(depositAddress);

  const deposit = useCallback(async (): Promise<void> => {
    if (!spender) {
      console.error('no spender');
      return;
    }

    try {
      const amountParsed = parseUnits(amount || '0', 18);
      const tx = await depositContract.stake(amountParsed);
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
    depositContract,
    amount,
    spender,
  ]);

  return [depositState, deposit];
}
