import { TransactionResponse } from '@ethersproject/providers';
import { useState, useCallback, useMemo } from 'react';
import { useVestingContract } from './useContract';

export enum VestingState {
  UNKNOWN,
  PENDING
}

export function useVestingCallback(
  vestingAddress?: string,
  spender?: string
): [{ state: VestingState, txid: string }, () => Promise<void>] {
  const [currentTransaction, setCurrentTransaction] = useState(null)

  const vestingInfo: { state: VestingState, txid: string | null } = useMemo(() => {
    if (!spender) return { state: VestingState.UNKNOWN, txid: null };

    return { state: currentTransaction
        ? VestingState.PENDING
        : VestingState.UNKNOWN,
      txid: currentTransaction };
  }, [currentTransaction, spender]);

  const vestingContract = useVestingContract(vestingAddress);

  const vesting = useCallback(async (): Promise<void> => {
    if (!spender) {
      console.error('no spender');
      return;
    }

    return vestingContract
      .withdraw()
      .then((response: TransactionResponse) => {
        setCurrentTransaction(response.hash);
        setTimeout(() => setCurrentTransaction(null), 5000);
      })
      .catch((error: Error) => {
        console.debug('Failed to vest', error);
        throw error;
      });
  }, [
    vestingContract,
    spender,
  ]);

  return [vestingInfo, vesting];
}
