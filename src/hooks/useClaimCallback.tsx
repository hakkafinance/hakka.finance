/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useRewardsContract } from './useContract';
import { getEtherscanLink, shortenTxId } from '../utils';
import { toast } from 'react-toastify';
import { ExternalLink } from 'react-feather';

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
       toast.error(<div>{err.message}</div>,  { containerId: 'error' });
    } finally {
      setCurrentTransaction(null);
    }
  }, [
    claimContract,
    spender,
  ]);

  return [claimState, claim];
}
