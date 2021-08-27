/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { useBurnContract } from './useContract';
import { getEtherscanLink, shortenTxId } from '../utils';
import { toast } from 'react-toastify';
import { ExternalLink } from 'react-feather';

export enum BurnState {
  UNKNOWN,
  PENDING
}

export function useBurnCallback(
  burnAddress?: string,
  spender?: string,
  amountParsed?: BigNumber,
  pickedRewardTokensAddress?: string[],
): [BurnState, () => Promise<void>] {
  const { chainId } = useWeb3React();
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const burnState: BurnState = useMemo(() => {
    if (!spender) return BurnState.UNKNOWN;

    return currentTransaction
      ? BurnState.PENDING
      : BurnState.UNKNOWN;
  }, [currentTransaction, spender]);

  const burnContract = useBurnContract(burnAddress);

  const burn = useCallback(async (): Promise<void> => {
    if (!spender) {
      console.error('no spender');
      return;
    }

    try {
      const tx = await burnContract.ragequit(pickedRewardTokensAddress, amountParsed);
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
    burnContract,
    spender,
    amountParsed,
    pickedRewardTokensAddress,
  ]);

  return [burnState, burn];
}
