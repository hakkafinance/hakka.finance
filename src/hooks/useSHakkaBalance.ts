import { JSON_RPC_PROVIDER } from './../constants/index';
import {
  Contract as MulticallContract,
  Provider as MulticallProvider,
} from '@pelith/ethers-multicall';
import { useWeb3React } from '@web3-react/core';
import {
  ChainDataFetchingState,
  NEW_SHAKKA_ADDRESSES,
  ChainId,
} from '../constants';
import throttle from 'lodash/throttle';
import { BigNumber } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';
import { useEffect, useMemo, useState } from 'react';
import { useBlockNumber } from '../state/application/hooks';
import STAKING_ABI from '../constants/abis/shakka.json';

export type SHakkaBalanceType = {
  [chainId in ChainId]?: BigNumber;
};

export default function useSHakkaBalance(): {
  sHakkaBalanceInfo: SHakkaBalanceType;
  fetchDataState: ChainDataFetchingState;
} {
  const { account } = useWeb3React();
  const latestBlockNumber = useBlockNumber();
  const [sHakkaBalanceInfo, setSHakkaBalanceInfo] = useState<
    SHakkaBalanceType
  >();
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const fetchDataState: ChainDataFetchingState = useMemo(() => {
    return transactionSuccess
      ? ChainDataFetchingState.SUCCESS
      : ChainDataFetchingState.LOADING;
  }, [transactionSuccess]);

  const providers = JSON_RPC_PROVIDER;

  const getSHakkaBalance = async (chainId: ChainId, account: string) => {
    const multicallProvider = new MulticallProvider(
      providers[chainId],
      chainId
    );
    if (NEW_SHAKKA_ADDRESSES[chainId] === AddressZero)
      return [chainId, undefined];
    const sHakkaContract = new MulticallContract(
      NEW_SHAKKA_ADDRESSES[chainId],
      STAKING_ABI
    );
    const [sHakkaBalance] = await multicallProvider.all([
      sHakkaContract.balanceOf(account),
    ]);
    return [chainId, sHakkaBalance] as [ChainId, BigNumber];
  };

  const fetchSHakkaBalance = async (account: string) => {
    setTransactionSuccess(false);
    try {
      const shakkaList = [
        getSHakkaBalance(ChainId.MAINNET, account),
        getSHakkaBalance(ChainId.BSC, account),
        getSHakkaBalance(ChainId.POLYGON, account),
      ];
      if (process.env.GATSBY_ENV === 'development') {
        shakkaList.push(
          getSHakkaBalance(ChainId.KOVAN, account),
          getSHakkaBalance(ChainId.RINKEBY, account)
        );
      }

      const shakkaBalanceResults = await Promise.all(shakkaList);

      setSHakkaBalanceInfo(Object.fromEntries(shakkaBalanceResults));
      setTransactionSuccess(true);
    } catch (e) {
      console.log(e);
      console.log('fetch user sHakka balance error');
    }
  };

  const throttledFetchSHakkaBalance = useMemo(
    () => throttle(fetchSHakkaBalance, 2000),
    []
  );

  useEffect(() => {
    if (account === AddressZero || !account) return;
    throttledFetchSHakkaBalance(account);
  }, [latestBlockNumber, account]);

  return { sHakkaBalanceInfo, fetchDataState };
}
