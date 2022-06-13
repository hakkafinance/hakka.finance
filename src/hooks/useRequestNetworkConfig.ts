import { useMemo } from 'react';
import { ChainId } from '../constants';

export default function useRequestNetworkConfig(targetNetwork: ChainId): any {
  const switchMethod = useMemo(() => {
    if (targetNetwork === ChainId.BSC) {
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
          rpcUrls: [process.env.GATSBY_BSC_NETWORK_URL],
          blockExplorerUrls: ['https://bscscan.com/'],
        }],
      }
    } else if (targetNetwork === ChainId.POLYGON) {
      return {
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x89',
            chainName: 'Polygon Network',
            nativeCurrency: {
              name: 'Matic',
              symbol: 'Matic',
              decimals: 18,
            },
            rpcUrls: ['https://rpc-mainnet.matic.network'],
            blockExplorerUrls: ['https://polygonscan.com/'],
          },
        ],
      };
    } else {
      return {
        method: 'wallet_switchEthereumChain',
        params: [{
          chainId: '0x1'
        }]
      }
    }
  }, [targetNetwork]);

  return switchMethod;
}
