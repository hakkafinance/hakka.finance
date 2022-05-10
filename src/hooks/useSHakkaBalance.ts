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

    const providers = useMemo(() => {
      const ethProvider = new JsonRpcProvider(process.env.REACT_APP_NETWORK_URL);
      const bscProvider = new JsonRpcProvider(process.env.REACT_APP_BSC_NETWORK_URL);
      const polygonProvider = new JsonRpcProvider(process.env.REACT_APP_POLYGON_NETWORK_URL);
      const kovanProvider = new JsonRpcProvider(process.env.REACT_APP_KOVAN_NETWORK_URL);
      return {[ChainId.MAINNET]: ethProvider, [ChainId.BSC]: bscProvider, [ChainId.POLYGON]: polygonProvider, [ChainId.KOVAN]: kovanProvider};
    }, [])

    const getSHakkaBalance = async (chainId: ChainId) => {
      const multicallProvider = new MulticallProvider(providers[chainId], chainId);
      const sHakkaContract = new MulticallContract(NEW_SHAKKA_ADDRESSES[chainId], STAKING_ABI);
      const [ sHakkaBalance ] = await multicallProvider.all([sHakkaContract.balanceOf(account)]);
      return sHakkaBalance;
    };

    const fetchSHakkaBalance = async () => {
      setTransactionSuccess(false);
      try {
        const ethSHakkaBalance = await getSHakkaBalance(ChainId.MAINNET);
        const bscSHakkaBalance = await getSHakkaBalance(ChainId.BSC);
        const polygonSHakkaBalance = await getSHakkaBalance(ChainId.POLYGON);
        const kovanSHakkaBalance = await getSHakkaBalance(ChainId.KOVAN);
        
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
    }, [latestBlockNumber]);
  
    return { sHakkaBalanceInfo, fetchDataState };
  }
  