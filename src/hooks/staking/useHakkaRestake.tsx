/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { toast } from 'react-toastify';
import { ExternalLink } from 'react-feather';

import { useStakeV1Contract } from '../useContract';
import { getEtherscanLink, shortenTxId } from '../../utils';

export enum RestakeState {
  UNKNOWN,
  PENDING
}

export default function useHakkaRestake(
  stakeAddress: string,
  spender: string,
  amountParsed: BigNumber,
  lockMonth: number,
): [RestakeState, () => Promise<void>] {
  const { chainId } = useWeb3React();
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const stakeState: RestakeState = useMemo(() => {
    if (!spender) return RestakeState.UNKNOWN;

    return currentTransaction
      ? RestakeState.PENDING
      : RestakeState.UNKNOWN;
  }, [currentTransaction, spender]);

  const stakeContract = useStakeV1Contract(stakeAddress);

  const restake = useCallback(async (): Promise<void> => {
    if (!spender) {
      console.error('no spender');
      return;
    }

    try {
      // After calculation, lockMonth can only be 1 sec or 1, 3, 6, 12 month.
      const tx = await stakeContract.restake(spender, amountParsed, lockMonth * 2592000);
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
    stakeContract,
    spender,
    amountParsed,
    lockMonth,
  ]);

  return [stakeState, restake];
}
