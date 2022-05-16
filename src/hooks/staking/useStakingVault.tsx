import { useEffect, useMemo, useState, useCallback } from 'react';
import { Contract as MulticallContract, Provider as MulticallProvider } from '@pelith/ethers-multicall';
import { useWeb3React } from '@web3-react/core';
import { JsonRpcProvider } from '@ethersproject/providers';
import debounce from 'lodash.debounce';
import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import { ChainDataFetchingState, NEW_SHAKKA_ADDRESSES, ChainId } from '../../constants';
import STAKING_ABI from '../../constants/abis/shakka.json';
import { useBlockNumber } from '../../state/application/hooks';

export interface VaultType {
  hakkaAmount: BigNumber;
  wAmount: BigNumber;
  unlockTime: BigNumber;
}

export default function useStakingVault(): {
  vault: VaultType[];
  vaultCount: BigNumber;
  fetchDataState: ChainDataFetchingState;
  } {
    const { chainId, account } = useWeb3React();
    const latestBlockNumber = useBlockNumber();
    const [vault, setVault] = useState<VaultType[]>([]);
    const [vaultCount, setVaultCount] = useState<BigNumber>(Zero);
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

    const fetchVault = useCallback(async (chainId: ChainId) => {
      setTransactionSuccess(false);
      const multicallProvider = new MulticallProvider(providers[chainId], chainId);
      const sHakkaContract = new MulticallContract(NEW_SHAKKA_ADDRESSES[chainId], STAKING_ABI);
      try {
        const [ vault, vaultCount ] = await multicallProvider.all([sHakkaContract.vaults(account), sHakkaContract.vaultCount(account)]);
        setVault(vault);
        setVaultCount(vaultCount);
        setTransactionSuccess(true);
      } catch (e) {
        console.log(e);
        console.log('fetch vaults data error');
      }
    }, [])
  
    const debouncedFetchVault = useMemo(() => debounce(fetchVault, 200), []);
  
    useEffect(() => {
      debouncedFetchVault(chainId);
    }, [latestBlockNumber, chainId]);
  
    return { vault, vaultCount, fetchDataState };
  }
  