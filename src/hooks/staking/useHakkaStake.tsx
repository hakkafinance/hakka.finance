/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { toast } from 'react-toastify';
import { ExternalLink } from 'react-feather';

import { useStakeContract } from '../useContract';
import { calculateGasMargin, getEtherscanLink, shortenTxId } from '../../utils';
import { useEffect } from 'react';

export enum StakeState {
  UNKNOWN,
  PENDING
}

export function useHakkaStake(
  stakeAddress: string,
  spender: string,
  amountParsed: BigNumber,
  lockSec: number,
): [StakeState, () => Promise<void>] {
  const { chainId } = useWeb3React();
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const stakeState: StakeState = useMemo(() => {
    if (!spender) return StakeState.UNKNOWN;

    return currentTransaction
      ? StakeState.PENDING
      : StakeState.UNKNOWN;
  }, [currentTransaction, spender]);

  const stakeContract = useStakeContract(stakeAddress);

  const stake = useCallback(async (): Promise<void> => {
    if (!spender) {
      console.error('no spender');
      return;
    }

    try {
      const estimatedGas = await stakeContract.estimateGas.stake(spender, amountParsed, lockSec);
      const tx = await stakeContract.stake(spender, amountParsed, lockSec, {
        gasLimit: estimatedGas.mul(BigNumber.from(15000)).div(BigNumber.from(10000)),  // * 1.5
      });
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
    lockSec,
  ]);

  return [stakeState, stake];
}
