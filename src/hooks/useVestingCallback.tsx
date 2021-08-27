/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useVestingContract } from './useContract';
import { getEtherscanLink, shortenTxId } from '../utils';
import { toast } from 'react-toastify';
import { ExternalLink } from 'react-feather';

export enum VestingState {
  UNKNOWN,
  PENDING,
}

export function useVestingCallback(
  vestingAddress?: string,
  spender?: string,
): [VestingState, () => Promise<void>] {
  const { chainId } = useWeb3React();
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const vestingState: VestingState = useMemo(() => {
    if (!spender) return VestingState.UNKNOWN;

    return currentTransaction
      ? VestingState.PENDING
      : VestingState.UNKNOWN;
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
      toast(
        <a
          target="_blank"
          href={getEtherscanLink(chainId ?? 1, tx.hash, 'transaction')}
          rel="noreferrer"
          sx={{ textDecoration: 'none', color: '#253e47' }}
        >
        {shortenTxId(tx.hash)} <ExternalLink size={16} />
        </a>
      , { containerId: 'tx' });
      await tx.wait();
    } catch (err) {
      toast.error(<div>{err.data ? JSON.stringify(err.data) : err.message}</div>,  { containerId: 'error' });
    } finally {
      setCurrentTransaction(null);
    }
  }, [
    vestingContract,
    spender,
  ]);

  return [vestingState, vesting];
}
