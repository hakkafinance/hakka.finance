/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useCallback, useMemo } from 'react';
import { MaxUint256 } from '@ethersproject/constants';
import { useWeb3React } from '@web3-react/core';
import { Token } from '@uniswap/sdk';
import { useTokenAllowance } from '../data/Allowances';
import { useTokenContract } from './useContract';
import { useActiveWeb3React } from './web3Manager';
import { getEtherscanLink, shortenTxId, tryParseAmount } from '../utils';
import { toast } from 'react-toastify';
import { ExternalLink } from 'react-feather';
import isZero from '../utils/isZero';

export enum ApprovalState {
  UNKNOWN,
  NOT_APPROVED,
  PENDING,
  APPROVED,
}

export function useTokenApprove(
  tokenToApprove: Token,
  spender: string,
  requiredAllowance: string,
): [ApprovalState, () => Promise<void>] {
  const { account } = useActiveWeb3React();
  const { chainId } = useWeb3React();
  const token = tokenToApprove;
  const currentAllowance = useTokenAllowance(
    token,
    account ?? undefined,
    spender,
  );
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const approvalState: ApprovalState = useMemo(() => {
    if (!tokenToApprove || !spender) return ApprovalState.UNKNOWN;
    if (!currentAllowance) return ApprovalState.UNKNOWN;

    return currentAllowance.lessThan(tryParseAmount(requiredAllowance)) || currentAllowance.equalTo(tryParseAmount('0'))
      ? currentTransaction
        ? ApprovalState.PENDING
        : ApprovalState.NOT_APPROVED
      : ApprovalState.APPROVED;
  }, [currentTransaction, tokenToApprove, currentAllowance, spender]);

  const tokenContract = useTokenContract(token?.address);

  const approve = useCallback(async (): Promise<void> => {
    if (approvalState !== ApprovalState.NOT_APPROVED) {
      console.error('approve was called unnecessarily');
      return;
    }
    if (!token) {
      console.error('no token');
      return;
    }

    if (!tokenContract) {
      console.error('tokenContract is null');
      return;
    }

    if (!spender || isZero(spender)) {
      console.error('no spender');
      return;
    }

    try {
      const tx = await tokenContract.approve(spender, MaxUint256);
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
    approvalState,
    token,
    tokenContract,
    tokenToApprove,
    spender,
  ]);

  return [approvalState, approve];
}
