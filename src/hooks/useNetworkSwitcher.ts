import { useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ChainId } from '../constants';

export default function useNetworkSwitcher(): any {
  const { chainId } = useWeb3React();
  const switchMethod = useMemo(() => {
    if (chainId === ChainId.MAINNET) {
      return {
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x38',
          chainName: 'BSC Mainnet',
          nativeCurrency: {
            name: 'Binance Coin',
            symbol: 'BNB',
            decimals: 18,
          },
          rpcUrls: [process.env.REACT_APP_BSC_NETWORK_URL],
          blockExplorerUrls: ['https://bscscan.com/'],
        }],
      }
    } else {
      return {
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: '0x1'
        }]
      }
    }
  }, [chainId]);

  return switchMethod;
}
