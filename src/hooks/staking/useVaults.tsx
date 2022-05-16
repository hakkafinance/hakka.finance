import { useEffect, useMemo, useState } from 'react';
import { Contract as MulticallContract, Provider as MulticallProvider } from '@pelith/ethers-multicall';
import { useWeb3React } from '@web3-react/core';
import { JsonRpcProvider } from '@ethersproject/providers';
import debounce from 'lodash.debounce';
import { ChainDataFetchingState, NEW_SHAKKA_ADDRESSES, ChainId } from '../../constants';
import STAKING_ABI from '../../constants/abis/shakka.json';
import { useBlockNumber } from '../../state/application/hooks';

export default function useVaults(): {
  vaults: any;
  vaultCount: any;
  fetchDataState: ChainDataFetchingState;
  } {
    const { chainId } = useWeb3React();
    const latestBlockNumber = useBlockNumber();
    const [vaults, setVaults] = useState<any>();
    const [vaultCount, setVaultCount] = useState<any>();
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

    const fetchVaults = async () => {
      setTransactionSuccess(false);
      const multicallProvider = new MulticallProvider(providers[chainId], chainId);
      const sHakkaContract = new MulticallContract(NEW_SHAKKA_ADDRESSES[chainId], STAKING_ABI);
      try {
        const [ vaults, vaultCount ] = await multicallProvider.all([sHakkaContract.vaults(), sHakkaContract.vaultCount()]);
        setVaults(vaults);
        setVaultCount(vaultCount);
        setTransactionSuccess(true);
      } catch (e) {
        console.log(e);
        console.log('fetch vaults data error');
      }
    };
  
    const debouncedFetchVaults = useMemo(() => debounce(fetchVaults, 200), [fetchVaults]);
  
    useEffect(() => {
      debouncedFetchVaults();
    }, [latestBlockNumber]);
  
    return { vaults, vaultCount, fetchDataState };
  }
  