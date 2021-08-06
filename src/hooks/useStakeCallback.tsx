import React, { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { useStakeContract } from './useContract';
import { useSnackbar } from './useSnackbar';
import { getEtherscanLink, shortenTxId } from '../utils';

export enum StakeState {
  UNKNOWN,
  PENDING
}

export function useStakeCallback(
  stakeAddress: string,
  spender: string,
  amountParsed: BigNumber,
  lockMonth: number,
): [StakeState, () => Promise<void>] {
  const { chainId } = useWeb3React();
  const [currentTransaction, setCurrentTransaction] = useState(null)
  const { enqueueSnackbar } = useSnackbar()

  const stakeState: StakeState = useMemo(() => {
    if (!spender) return StakeState.UNKNOWN;

    return currentTransaction
        ? StakeState.PENDING
        : StakeState.UNKNOWN
  }, [currentTransaction, spender]);

  const stakeContract = useStakeContract(stakeAddress);

  const stake = useCallback(async (): Promise<void> => {
    if (!spender) {
      console.error('no spender');
      return;
    }
    
    try {
      const tx = await stakeContract.stake(spender, amountParsed, lockMonth * 60 * 60 * 24 * 30);
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
    stakeContract,
    spender,
    amountParsed,
    lockMonth,
  ]);

  return [stakeState, stake];
}
