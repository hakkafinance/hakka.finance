import React, { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { useBurnContract } from './useContract';
import { useSnackbar } from './useSnackbar';
import { getEtherscanLink, shortenTxId } from '../utils';

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
  const [currentTransaction, setCurrentTransaction] = useState(null)
  const { enqueueSnackbar } = useSnackbar()

  const burnState: BurnState = useMemo(() => {
    if (!spender) return BurnState.UNKNOWN;

    return currentTransaction
        ? BurnState.PENDING
        : BurnState.UNKNOWN
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
      enqueueSnackbar(
        <a
          target='_blank'
          href={getEtherscanLink(chainId ?? 1, tx.hash, 'transaction')}
        >{shortenTxId(tx.hash)}</a>,
        tx.hash
      );
      await tx.wait()
    } catch (err) {
      enqueueSnackbar(
        <div>{err.message}</div>,
        err.message
      );
    } finally {
      setCurrentTransaction(null)
    }
  }, [
    burnContract,
    spender,
    amountParsed,
    pickedRewardTokensAddress,
  ]);

  return [burnState, burn];
}
