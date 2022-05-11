import { Contract as MulticallContract, Provider as MulticallProvider } from '@pelith/ethers-multicall';
import { useWeb3React } from '@web3-react/core';
import { ChainDataFetchingState, NEW_SHAKKA_ADDRESSES } from '../constants';
import debounce from 'lodash.debounce';
import { BigNumber } from '@ethersproject/bignumber';
import { ChainId } from '../constants';
import { useEffect, useMemo, useState } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useBlockNumber } from '../state/application/hooks';
import STAKING_ABI from '../constants/abis/shakka.json';

export type StakedHakkaType = {
    [chainId in ChainId]: BigNumber; 
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
      return transactionSuccess ? ChainDataFetchingState.SUCCESS : ChainDataFetchingState.LOADING;
    }, [transactionSuccess]);

    const providers = useMemo(() => {
      const ethProvider = new JsonRpcProvider(process.env.REACT_APP_NETWORK_URL);
      const bscProvider = new JsonRpcProvider(process.env.REACT_APP_BSC_NETWORK_URL);
      const polygonProvider = new JsonRpcProvider(process.env.REACT_APP_POLYGON_NETWORK_URL);
      const kovanProvider = new JsonRpcProvider(process.env.REACT_APP_KOVAN_NETWORK_URL);
      return {[ChainId.MAINNET]: ethProvider, [ChainId.BSC]: bscProvider, [ChainId.POLYGON]: polygonProvider, [ChainId.KOVAN]: kovanProvider};
    }, [])

    const getStakedHakka = async (chainId: ChainId) => {
      const multicallProvider = new MulticallProvider(providers[chainId], chainId);
      const sHakkaContract = new MulticallContract(NEW_SHAKKA_ADDRESSES[chainId], STAKING_ABI);
      const [ sHakkaBalance ] = await multicallProvider.all([sHakkaContract.stakedHakka(account)]);
      return sHakkaBalance;
    };

    const fetchStakedHakka = async () => {
      setTransactionSuccess(false);
      try {
        const [ethStakedHakka, bscStakedHakka, polygonStakedHakka, kovanStakedHakka] = await Promise.all([
          getStakedHakka(ChainId.MAINNET),
          getStakedHakka(ChainId.BSC),
          getStakedHakka(ChainId.POLYGON),
          getStakedHakka(ChainId.KOVAN),
        ]);
        
        setStakedHakka({
          [ChainId.MAINNET]: ethStakedHakka,
          [ChainId.BSC]: bscStakedHakka,
          [ChainId.POLYGON]: polygonStakedHakka,
          [ChainId.KOVAN]: kovanStakedHakka});
        setTransactionSuccess(true);
      } catch (e) {
        console.log(e);
        console.log('fetch user staked hakka error');
      }
    };
  
    const debouncedFetchStakedHakka = useMemo(() => debounce(fetchStakedHakka, 200), [fetchStakedHakka]);
  
    useEffect(() => {
      debouncedFetchStakedHakka();
    }, [latestBlockNumber]);
  
    return { stakedHakka, fetchDataState };
  }
  