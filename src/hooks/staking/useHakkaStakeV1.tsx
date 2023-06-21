/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { useStakeV1Contract } from '../useContract';
import { getEtherscanLink, shortenTxId } from '../../utils';
import { toast } from 'react-toastify';
import { ExternalLink } from 'react-feather';

export enum StakeState {
  UNKNOWN,
  PENDING
}

export function useHakkaStakeV1(
  stakeAddress: string,
  spender: string,
  amountParsed: BigNumber,
  lockMonth: number,
): [StakeState, () => Promise<void>] {
  const { chainId } = useWeb3React();
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const stakeState: StakeState = useMemo(() => {
    if (!spender) return StakeState.UNKNOWN;

    return currentTransaction
      ? StakeState.PENDING
      : StakeState.UNKNOWN;
  }, [currentTransaction, spender]);

  const stakeContract = useStakeV1Contract(stakeAddress);

  const stake = useCallback(async (): Promise<void> => {
    if (!spender) {
      console.error('no spender');
      return;
    }

    try {
      // After calculation, lockMonth can only be 1 sec or 1, 3, 6, 12 month.
      const tx = await stakeContract.stake(spender, amountParsed, lockMonth * 60 * 60 * 24 * 30);
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
    stakeContract,
    spender,
    amountParsed,
    lockMonth,
  ]);

  return [stakeState, stake];
}
