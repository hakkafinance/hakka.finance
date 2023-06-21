/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { useStakeContract } from '../useContract';
import { getEtherscanLink, shortenTxId } from '../../utils';
import { toast } from 'react-toastify';
import { ExternalLink } from 'react-feather';
import { TransactionState } from '../../constants';

export function useHakkaUnstake(
  unstakeAddress: string,
  spender: string,
  index: number,
  amountParsed: BigNumber,
): [TransactionState, () => Promise<void>] {
  const { chainId } = useWeb3React();
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [transactionState, setTransactionState] = useState<TransactionState>(TransactionState.UNKNOWN);

  const unstakeState: TransactionState = useMemo(() => {
    if (!spender) return TransactionState.UNKNOWN;

    return currentTransaction
      ? TransactionState.PENDING
      : transactionState
  }, [currentTransaction, transactionState, spender]);

  const unstakeContract = useStakeContract(unstakeAddress);

  const unstake = useCallback(async (): Promise<void> => {
    setTransactionState(TransactionState.UNKNOWN);
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
          rel="noreferrer noopener"
          sx={{ textDecoration: 'none', color: '#253e47' }}
        >
        {shortenTxId(tx.hash)} <ExternalLink size={16} />
        </a>
      , { containerId: 'tx' });
      await tx.wait();
      setTransactionState(TransactionState.SUCCESS);
    } catch (err) {
      toast.error(<div>{err.data ? JSON.stringify(err.data) : err.message}</div>,  { containerId: 'error' });
      setTransactionState(TransactionState.ERROR);
    } finally {
      setCurrentTransaction(null);
    }
  }, [
    unstakeContract,
    spender,
    index,
    amountParsed,
  ]);

  useEffect(() => {
    setTransactionState(TransactionState.UNKNOWN);
  }, [index])

  return [unstakeState, unstake];
}
