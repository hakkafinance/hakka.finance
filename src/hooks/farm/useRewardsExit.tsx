/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useRewardsContract } from '../useContract';
import { getEtherscanLink, shortenTxId } from '../../utils';
import { toast } from 'react-toastify';
import { ExternalLink } from 'react-feather';
import { REWARD_POOLS } from '../../constants/rewards';

export enum ExitState {
  UNKNOWN,
  PENDING
}

export function useRewardsExit(
  exitAddress?: string,
  spender?: string,
): [ExitState, () => Promise<void>] {
  const { chainId } = useWeb3React();
  const [currentTransaction, setCurrentTransaction] = useState(null);

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

    if (REWARD_POOLS[exitAddress].chain !== chainId) {
      toast.error(<div>Wrong Network</div>,  { containerId: 'error' });
      return;
    }

    try {
      const tx = await exitContract.exit();
      setCurrentTransaction(tx.hash);
      toast(
        <a
          target="_blank"
          href={getEtherscanLink(chainId ?? 1, tx.hash, 'transaction')}
          rel="noreferrer noopener"
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
    exitContract,
    spender,
  ]);

  return [exitState, exit];
}
