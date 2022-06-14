import { useEffect, useMemo, useState } from 'react';
import {
  Contract as MulticallContract,
  Provider as MulticallProvider,
} from '@pelith/ethers-multicall';
import { useWeb3React } from '@web3-react/core';
import { BigNumber } from '@ethersproject/bignumber';
import { Zero, AddressZero } from '@ethersproject/constants';
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
  ): Promise<BigNumber> => {
    const multicallProvider = new MulticallProvider(
      providers[chainId],
      chainId
    );
    const sHakkaContract = new MulticallContract(
      NEW_SHAKKA_ADDRESSES[chainId],
      STAKING_ABI
    );
    const [stakedHakka] = await multicallProvider.all([
      sHakkaContract.stakedHakka(account),
    ]);
    return stakedHakka;
  };

  const fetchStakedHakka = async (account: string) => {
    if (account === AddressZero || !account) return;

    setTransactionSuccess(false);
    try {
      // TODO: restore these when provider is ready

      // const [ethStakedHakka, bscStakedHakka, polygonStakedHakka, kovanStakedHakka] = await Promise.all([
      //   getStakedHakka(ChainId.MAINNET),
      //   getStakedHakka(ChainId.BSC),
      //   getStakedHakka(ChainId.POLYGON),
      //   getStakedHakka(ChainId.KOVAN),
      // ]);

      const [ethStakedHakka, kovanStakedHakka, rinkebyStakedHakka] = await Promise.all([
        getStakedHakka(ChainId.MAINNET, account),
        getStakedHakka(ChainId.KOVAN, account),
        getStakedHakka(ChainId.RINKEBY, account),
      ]);

      // setStakedHakka({
      //   [ChainId.MAINNET]: ethStakedHakka,
      //   [ChainId.BSC]: bscStakedHakka,
      //   [ChainId.POLYGON]: polygonStakedHakka,
      //   [ChainId.KOVAN]: kovanStakedHakka});

      setStakedHakka({
        [ChainId.MAINNET]: ethStakedHakka,
        [ChainId.BSC]: Zero,
        [ChainId.POLYGON]: Zero,
        [ChainId.KOVAN]: kovanStakedHakka,
        [ChainId.RINKEBY]: rinkebyStakedHakka,
      });
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
    throttledFetchStakedHakka(account);
  }, [latestBlockNumber, account]);

  return { stakedHakka, fetchDataState };
}
