/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { useStakeContract } from './useContract';
import { getEtherscanLink, shortenTxId } from '../utils';
import { toast } from 'react-toastify';
import { ExternalLink } from 'react-feather';

export enum UnstakeState {
  UNKNOWN,
  PENDING
}

export function useUnstakeCallback(
  unstakeAddress: string,
  spender: string,
  index: number,
  amountParsed: BigNumber,
): [UnstakeState, () => Promise<void>] {
  const { chainId } = useWeb3React();
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const unstakeState: UnstakeState = useMemo(() => {
    if (!spender) return UnstakeState.UNKNOWN;

    return currentTransaction
      ? UnstakeState.PENDING
      : UnstakeState.UNKNOWN;
  }, [currentTransaction, spender]);

  const unstakeContract = useStakeContract(unstakeAddress);

  const unstake = useCallback(async (): Promise<void> => {
    if (!spender) {
      console.error('no spender');
      return;
    }

    try {
      const tx = await unstakeContract.unstake(spender, index, amountParsed);
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
    unstakeContract,
    spender,
    index,
    amountParsed,
  ]);

  return [unstakeState, unstake];
}
