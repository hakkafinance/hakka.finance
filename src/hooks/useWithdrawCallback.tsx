import React, { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useRewardsContract } from './useContract';
import { useSnackbar } from './useSnackbar';
import { getEtherscanLink, shortenTxId } from '../utils';
import { parseUnits } from '@ethersproject/units';

export enum WithdrawState {
  UNKNOWN,
  PENDING
}

export function useWithdrawCallback(
  withdrawAddress?: string,
  amount?: string,
  spender?: string,
): [WithdrawState, () => Promise<void>] {
  const { chainId } = useWeb3React();
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const withdrawState: WithdrawState = useMemo(() => {
    if (!spender) return WithdrawState.UNKNOWN;

    return currentTransaction
      ? WithdrawState.PENDING
      : WithdrawState.UNKNOWN;
  }, [currentTransaction, spender]);

  const withdrawContract = useRewardsContract(withdrawAddress);

  const withdraw = useCallback(async (): Promise<void> => {
    if (!spender) {
      console.error('no spender');
      return;
    }

    try {
      const amountParsed = parseUnits(amount || '0', 18);
      const tx = await withdrawContract.withdraw(amountParsed);
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
    withdrawContract,
    amount,
    spender,
  ]);

  return [withdrawState, withdraw];
}
