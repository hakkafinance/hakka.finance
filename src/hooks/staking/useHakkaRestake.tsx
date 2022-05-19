/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { toast } from 'react-toastify';
import { ExternalLink } from 'react-feather';

import { useStakeContract } from '../useContract';
import { getEtherscanLink, shortenTxId } from '../../utils';

export enum RestakeState {
  UNKNOWN,
  PENDING
}

export default function useHakkaRestake(
  stakeAddress: string,
  index: number,
  amountParsed: BigNumber,
  sec: number,
): [RestakeState, () => Promise<void>] {
  const { chainId } = useWeb3React();
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const stakeState: RestakeState = useMemo(() => {
    if (!index) return RestakeState.UNKNOWN;

    return currentTransaction
      ? RestakeState.PENDING
      : RestakeState.UNKNOWN;
  }, [currentTransaction, index]);

  const stakeContract = useStakeContract(stakeAddress);
  const restake = useCallback(async (): Promise<void> => {
    if (!index) {
      console.error('no index');
      return;
    }

    try {
      const tx = await stakeContract.restake(index, amountParsed, sec);
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
    index,
    amountParsed,
    sec,
  ]);

  return [stakeState, restake];
}
