/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useCallback, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useRewardsContract } from '../useContract';
import { getEtherscanLink, shortenTxId } from '../../utils';
import { parseUnits } from '@ethersproject/units';
import { toast } from 'react-toastify';
import { ExternalLink } from 'react-feather';
import { REWARD_POOLS } from '../../constants/rewards';

export enum DepositState {
  UNKNOWN,
  PENDING
}

export function useRewardsDeposit(
  depositAddress?: string,
  amount?: string,
  decimal?: number,
  spender?: string,
): [DepositState, () => Promise<void>] {
  const { chainId } = useWeb3React();
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const depositState: DepositState = useMemo(() => {
    if (!spender) return DepositState.UNKNOWN;

    return currentTransaction
      ? DepositState.PENDING
      : DepositState.UNKNOWN;
  }, [currentTransaction, spender]);

  const depositContract = useRewardsContract(depositAddress);

  const deposit = useCallback(async (): Promise<void> => {
    if (!spender) {
      console.error('no spender');
      return;
    }

    if (REWARD_POOLS[depositAddress].chain !== chainId) {
      toast.error(<div>Wrong Network</div>,  { containerId: 'error' });
      return;
    }

    try {
      const amountParsed = parseUnits(amount || '0', decimal);
      const tx = await depositContract.stake(amountParsed);
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
    depositContract,
    amount,
    spender,
  ]);

  return [depositState, deposit];
}
