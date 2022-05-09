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

export type SHakkaBalanceType = {
    [chainId in ChainId]: BigNumber; 
  };

export default function useSHakkaBalance(): {
  sHakkaBalanceInfo: SHakkaBalanceType;
  fetchDataState: ChainDataFetchingState;
  } {
    const { account } = useWeb3React();
    const latestBlockNumber = useBlockNumber();
    const [sHakkaBalanceInfo, setSHakkaBalanceInfo] = useState<SHakkaBalanceType>();
    const [transactionSuccess, setTransactionSuccess] = useState(false);
  
    const fetchDataState: ChainDataFetchingState = useMemo(() => {
      return transactionSuccess ? ChainDataFetchingState.SUCCESS : ChainDataFetchingState.LOADING;
    }, [transactionSuccess]);
  
    const ethProvider = new JsonRpcProvider(process.env.REACT_APP_NETWORK_URL);
    const bscProvider = new JsonRpcProvider(process.env.REACT_APP_BSC_NETWORK_URL);
    const polygonProvider = new JsonRpcProvider(process.env.REACT_APP_POLYGON_NETWORK_URL);
    const kovanProvider = new JsonRpcProvider(process.env.REACT_APP_KOVAN_NETWORK_URL);

    const fetchSHakkaBalance = async () => {
      setTransactionSuccess(false);
      const ethMulticallProvider = new MulticallProvider(ethProvider, ChainId.MAINNET);
      const bscMulticallProvider = new MulticallProvider(bscProvider, ChainId.BSC);
      const polygonMulticallProvider = new MulticallProvider(polygonProvider, ChainId.POLYGON);
      const kovanMulticallProvider = new MulticallProvider(kovanProvider, ChainId.KOVAN);

      const ethSHakkaContract = new MulticallContract(NEW_SHAKKA_ADDRESSES[ChainId.MAINNET], STAKING_ABI);
      const bscSHakkaContract = new MulticallContract(NEW_SHAKKA_ADDRESSES[ChainId.BSC], STAKING_ABI);
      const polygonSHakkaContract = new MulticallContract(NEW_SHAKKA_ADDRESSES[ChainId.POLYGON], STAKING_ABI);
      const kovanSHakkaContract = new MulticallContract(NEW_SHAKKA_ADDRESSES[ChainId.KOVAN], STAKING_ABI);

      try {
        const [ ethSHakkaBalance ] = await ethMulticallProvider.all([ethSHakkaContract.balanceOf(account)]);
        const [ bscSHakkaBalance ] = await bscMulticallProvider.all([bscSHakkaContract.balanceOf(account)]);
        const [ polygonSHakkaBalance ] = await polygonMulticallProvider.all([polygonSHakkaContract.balanceOf(account)]);
        const [ kovanSHakkaBalance ] = await kovanMulticallProvider.all([kovanSHakkaContract.balanceOf(account)]);
        
        setSHakkaBalanceInfo({
          [ChainId.MAINNET]: ethSHakkaBalance,
          [ChainId.BSC]: bscSHakkaBalance,
          [ChainId.POLYGON]: polygonSHakkaBalance,
          [ChainId.KOVAN]: kovanSHakkaBalance});
        setTransactionSuccess(true);
      } catch (e) {
        console.log(e);
        console.log('fetch user sHakka balance error');
      }
    };
  
    const debouncedFetchSHakkaBalance = useMemo(() => debounce(fetchSHakkaBalance, 200), [fetchSHakkaBalance]);
  
    useEffect(() => {
      debouncedFetchSHakkaBalance();
    }, [ethProvider, bscProvider, polygonProvider, kovanProvider, latestBlockNumber]);
  
    return { sHakkaBalanceInfo, fetchDataState };
  }
  