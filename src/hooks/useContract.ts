import { Contract } from '@ethersproject/contracts';
import { ChainId } from '@uniswap/sdk';
import { useMemo } from 'react';
import ENS_ABI from '../constants/abis/ens-registrar.json';
import ENS_PUBLIC_RESOLVER_ABI from '../constants/abis/ens-public-resolver.json';
import ERC20_BYTES32_ABI from '../constants/abis/erc20.json';
import ERC20_ABI from '../constants/abis/erc20.json';
import VESTING_ABI from '../constants/abis/vesting.json';
import BURNER_ABI from '../constants/abis/burner.json';
import { MULTICALL_ABI, MULTICALL_NETWORKS } from '../constants/multicall';
import { getContract } from '../utils';
import { useActiveWeb3React } from './index';

// returns null on errors
export function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | null {
  const { library, account } = useActiveWeb3React();

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [address, ABI, library, withSignerIfPossible, account]);
}

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}

export function useBurnContract(
  burnAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(burnAddress, BURNER_ABI, withSignerIfPossible);
}

export function useVestingContract(
  vestingAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(vestingAddress, VESTING_ABI, withSignerIfPossible);
}

export function useENSRegistrarContract(
  withSignerIfPossible?: boolean
): Contract | null {
  const { chainId } = useActiveWeb3React();
  let address: string | undefined;
  if (chainId) {
    switch (chainId) {
      case ChainId.MAINNET:
        address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
        break;
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible);
}

export function useENSResolverContract(
  address: string | undefined,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible);
}

export function useBytes32TokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible);
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveWeb3React();
  return useContract(
    chainId && MULTICALL_NETWORKS[chainId],
    MULTICALL_ABI,
    false
  );
}
