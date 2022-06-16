import { useEffect, useMemo, useState } from 'react';
import {
  Contract as MulticallContract,
  Provider as MulticallProvider,
} from '@pelith/ethers-multicall';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';
import {
  ChainDataFetchingState,
  NEW_SHAKKA_ADDRESSES,
  ChainId,
  JSON_RPC_PROVIDER,
} from '../constants';
import { useBlockNumber } from '../state/application/hooks';
import STAKING_ABI from '../constants/abis/shakka.json';
import throttle from 'lodash/throttle';
export type StakedHakkaType = {
  [chainId in ChainId]?: BigNumber;
};

export default function useStakedHakka(): {
  stakedHakka: StakedHakkaType;
  fetchDataState: ChainDataFetchingState;
} {
  const { account } = useWeb3React();
  const latestBlockNumber = useBlockNumber();
  const [stakedHakka, setStakedHakka] = useState<StakedHakkaType>();
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const fetchDataState: ChainDataFetchingState = useMemo(() => {
    return transactionSuccess
      ? ChainDataFetchingState.SUCCESS
      : ChainDataFetchingState.LOADING;
  }, [transactionSuccess]);

  const providers = JSON_RPC_PROVIDER;

  const getStakedHakka = async (
    chainId: ChainId,
    account: string
  ): Promise<[ChainId, BigNumber]> => {
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
    const [stakedHakka] = await multicallProvider.all([
      sHakkaContract.stakedHakka(account),
    ]);
    return [chainId, stakedHakka];
  };

  const fetchStakedHakka = async (account: string) => {
    if (account === AddressZero || !account) return;

    setTransactionSuccess(false);
    try {
      const stakedList = [
        getStakedHakka(ChainId.MAINNET, account),
        getStakedHakka(ChainId.BSC, account),
        getStakedHakka(ChainId.POLYGON, account),
      ];
      if (process.env.GATSBY_ENV === 'development') {
        stakedList.push(
          getStakedHakka(ChainId.KOVAN, account),
          getStakedHakka(ChainId.RINKEBY, account)
        );
      }
      const stakedHakkaResult = await Promise.all(stakedList);

      setStakedHakka(Object.fromEntries(stakedHakkaResult));
      setTransactionSuccess(true);
    } catch (e) {
      console.log(e);
      console.log('fetch user staked hakka error');
    }
  };

  const throttledFetchStakedHakka = useMemo(
    () => throttle(fetchStakedHakka, 2000),
    []
  );

  useEffect(() => {
    throttledFetchStakedHakka(account as string);
  }, [latestBlockNumber, account]);

  return { stakedHakka, fetchDataState };
}
