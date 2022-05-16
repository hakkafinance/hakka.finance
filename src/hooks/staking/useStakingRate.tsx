import { useEffect, useMemo, useState } from 'react';
import { Contract as MulticallContract, Provider as MulticallProvider } from '@pelith/ethers-multicall';
import { useWeb3React } from '@web3-react/core';
import { JsonRpcProvider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import debounce from 'lodash.debounce';
import { ChainDataFetchingState, NEW_SHAKKA_ADDRESSES, ChainId } from '../../constants';
import STAKING_ABI from '../../constants/abis/shakka.json';
import { useBlockNumber } from '../../state/application/hooks';

export default function useStakingRate(): {
  stakingRate: BigNumber;
  fetchDataState: ChainDataFetchingState;
  } {
    const { chainId } = useWeb3React();
    const latestBlockNumber = useBlockNumber();
    const [stakingRate, setStakingRate] = useState<BigNumber>();
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

    const fetchStakingRate = async () => {
      setTransactionSuccess(false);
      const multicallProvider = new MulticallProvider(providers[chainId], chainId);
      const sHakkaContract = new MulticallContract(NEW_SHAKKA_ADDRESSES[chainId], STAKING_ABI);
      try {
        const [rate] = await multicallProvider.all([sHakkaContract.stakingRateMax()]);
        setStakingRate(rate);
        setTransactionSuccess(true);
      } catch (e) {
        console.log(e);
        console.log('fetch staking rate error');
      }
    };
  
    const debouncedFetchStakingRate = useMemo(() => debounce(fetchStakingRate, 200), [fetchStakingRate]);
  
    useEffect(() => {
      debouncedFetchStakingRate();
    }, [latestBlockNumber]);
  
    return { stakingRate, fetchDataState };
  }
  