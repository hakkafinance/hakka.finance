import { JSON_RPC_PROVIDER } from './../constants/index';
import {
  Contract as MulticallContract,
  Provider as MulticallProvider,
} from '@pelith/ethers-multicall';
import { useWeb3React } from '@web3-react/core';
import { ChainDataFetchingState, NEW_SHAKKA_ADDRESSES } from '../constants';
import throttle from 'lodash/throttle';
import { BigNumber } from '@ethersproject/bignumber';
import { Zero, AddressZero } from '@ethersproject/constants';
import { ChainId } from '../constants';
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
    const sHakkaContract = new MulticallContract(
      NEW_SHAKKA_ADDRESSES[chainId],
      STAKING_ABI
    );
    const [sHakkaBalance] = await multicallProvider.all([
      sHakkaContract.balanceOf(account),
    ]);
    return sHakkaBalance;
  };

  const fetchSHakkaBalance = async (account: string) => {
    if (account === AddressZero || account === undefined) return undefined;
    setTransactionSuccess(false);
    try {
      // TODO: restore this when production is ready
      // const [ethSHakkaBalance, bscSHakkaBalance, polygonSHakkaBalance, kovanSHakkaBalance] = await Promise.all([
      //   getSHakkaBalance(ChainId.MAINNET),
      //   getSHakkaBalance(ChainId.BSC),
      //   getSHakkaBalance(ChainId.POLYGON),
      //   getSHakkaBalance(ChainId.KOVAN),
      // ]);

      const [ethSHakkaBalance, kovanSHakkaBalance, rinkebySHakkaBalance] = await Promise.all([
        getSHakkaBalance(ChainId.MAINNET, account),
        getSHakkaBalance(ChainId.KOVAN, account),
        getSHakkaBalance(ChainId.RINKEBY, account),
      ]);

      // setSHakkaBalanceInfo({
      //   [ChainId.MAINNET]: ethSHakkaBalance,
      //   [ChainId.BSC]: bscSHakkaBalance,
      //   [ChainId.POLYGON]: polygonSHakkaBalance,
      //   [ChainId.KOVAN]: kovanSHakkaBalance});
      setSHakkaBalanceInfo({
        [ChainId.MAINNET]: ethSHakkaBalance,
        [ChainId.BSC]: Zero,
        [ChainId.POLYGON]: Zero,
        [ChainId.KOVAN]: kovanSHakkaBalance,
        [ChainId.RINKEBY]: rinkebySHakkaBalance,
      });
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
    throttledFetchSHakkaBalance(account);
  }, [latestBlockNumber, account]);

  return { sHakkaBalanceInfo, fetchDataState };
}
