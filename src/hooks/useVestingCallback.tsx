import React, { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useVestingContract } from './useContract';
import { useSnackbar } from './useSnackbar';
import { getEtherscanLink, shortenTxId } from '../utils';

export enum VestingState {
  UNKNOWN,
  PENDING,
}

export function useVestingCallback(
  vestingAddress?: string,
  spender?: string
): [VestingState, () => Promise<void>] {
  const { chainId } = useWeb3React();
  const [currentTransaction, setCurrentTransaction] = useState(null)
  const { enqueueSnackbar } = useSnackbar()

  const vestingState: VestingState = useMemo(() => {
    if (!spender) return VestingState.UNKNOWN;

    return currentTransaction
        ? VestingState.PENDING
        : VestingState.UNKNOWN
  }, [currentTransaction, spender]);

  const vestingContract = useVestingContract(vestingAddress);

  const vesting = useCallback(async (): Promise<void> => {
    if (!spender) {
      console.error('no spender');
      return;
    }
    
    try {
      const tx = await vestingContract.withdraw();
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
    vestingContract,
    spender,
  ]);

  return [vestingState, vesting];
}
