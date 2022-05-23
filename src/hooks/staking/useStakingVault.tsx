import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Contract as MulticallContract,
  Provider as MulticallProvider,
} from '@pelith/ethers-multicall';
import { useWeb3React } from '@web3-react/core';
import { JsonRpcProvider } from '@ethersproject/providers';
import debounce from 'lodash.debounce';
import { BigNumber } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import {
  ChainDataFetchingState,
  NEW_SHAKKA_ADDRESSES,
  ChainId,
} from '../../constants';
import STAKING_ABI from '../../constants/abis/shakka.json';
import { useBlockNumber } from '../../state/application/hooks';

import _isEqual from 'lodash/isEqual';
import _range from 'lodash/range';

import { AddressZero } from '@ethersproject/constants';

export interface VaultType {
  hakkaAmount: BigNumber;
  wAmount: BigNumber;
  unlockTime: BigNumber;
}

const ethProvider = new JsonRpcProvider(process.env.REACT_APP_NETWORK_URL);
const bscProvider = new JsonRpcProvider(process.env.REACT_APP_BSC_NETWORK_URL);
const polygonProvider = new JsonRpcProvider(
  process.env.REACT_APP_POLYGON_NETWORK_URL
);
const kovanProvider = new JsonRpcProvider(
  process.env.REACT_APP_KOVAN_NETWORK_URL
);
const chainProviders = {
  [ChainId.MAINNET]: ethProvider,
  [ChainId.BSC]: bscProvider,
  [ChainId.POLYGON]: polygonProvider,
  [ChainId.KOVAN]: kovanProvider,
};
export default function useStakingVault(
  activeChainId: ChainId
): {
  vault: VaultType[];
  vaultCount: BigNumber;
  fetchDataState: ChainDataFetchingState;
} {
  const { account } = useWeb3React();
  const latestBlockNumber = useBlockNumber();
  const [{ vaultCache, vaultCount }, setVaultData] = useState({
    vaultCache: {} as Record<ChainId, VaultType[]>,
    vaultCount: Zero,
  });
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const fetchDataState: ChainDataFetchingState = useMemo(() => {
    return transactionSuccess
      ? ChainDataFetchingState.SUCCESS
      : ChainDataFetchingState.LOADING;
  }, [transactionSuccess]);

  const fetchVault = useCallback(async (chainId: ChainId, account: string) => {
    if (NEW_SHAKKA_ADDRESSES[chainId] === AddressZero) return;
    if (account === AddressZero || !account) return;
    setTransactionSuccess(false);
    const multicallProvider = new MulticallProvider(
      chainProviders[chainId],
      chainId
    );
    const sHakkaContract = new MulticallContract(
      NEW_SHAKKA_ADDRESSES[chainId],
      STAKING_ABI
    );
    try {
      const [vaultCount] = await multicallProvider.all([
        sHakkaContract.vaultCount(account),
      ]);
      const vaultsIndex = (vaultCount as BigNumber).toNumber();
      const vaultsRequests = _range(vaultsIndex).map((vaultNum) =>
        sHakkaContract.vaults(account, vaultNum)
      );
      const [...vault] = await multicallProvider.all(vaultsRequests);

      setVaultData((state) => {
        if (_isEqual(state.vaultCache[chainId], vault)) {
          return state;
        }
        state.vaultCache[chainId] = vault;
        return { vaultCache: state.vaultCache, vaultCount };
      });
      setTransactionSuccess(true);
    } catch (e) {
      console.log(e);
      console.log('fetch vaults data error');
    }
  }, []);

  const debouncedFetchVault = useMemo(
    () => debounce(fetchVault, 200, { leading: true }),
    []
  );

  useEffect(() => {
    debouncedFetchVault(activeChainId, account);
  }, [latestBlockNumber, activeChainId, account]);

  return { vault: vaultCache[activeChainId] ?? [], vaultCount, fetchDataState };
}
