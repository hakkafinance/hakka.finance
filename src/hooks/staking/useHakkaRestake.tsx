/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from 'ethers';
import { toast } from 'react-toastify';
import { ExternalLink } from 'react-feather';
import { useStakeContract } from '../useContract';
import { getEtherscanLink, shortenTxId } from '../../utils';
import { TransactionState } from '../../constants';
export default function useHakkaRestake (
  stakeAddress: string,
  index: number,
  amountParsed: BigNumber,
  sec: number,
): [TransactionState, () => Promise<void>] {
  const { chainId } = useWeb3React();
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [transactionState, setTransactionState] = useState<TransactionState>(TransactionState.UNKNOWN);

  const stakeState: TransactionState = useMemo(() => {
    return currentTransaction
      ? TransactionState.PENDING
      : transactionState;
  }, [currentTransaction, transactionState, index]);

  const stakeContract = useStakeContract(stakeAddress);
  const restake = useCallback(async (): Promise<void> => {
    setTransactionState(TransactionState.UNKNOWN);
    if (Number.isNaN(+index)) {
      console.error('no index');
      return;
    }

    try {
      const estimatedGas = await stakeContract.estimateGas.restake(index, amountParsed, sec);
      const tx = await stakeContract.restake(index, amountParsed, sec, {
        gasLimit: estimatedGas.mul(BigNumber.from(15000)).div(BigNumber.from(10000)), // * 1.5
      });
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
      toast.error(<div>{err.data ? JSON.stringify(err.data) : err.message}</div>, { containerId: 'error' });
      setTransactionState(TransactionState.ERROR);
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
