import { Web3Provider } from '@ethersproject/providers';
/** @deprecated */
export default function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  const parsedChainId = parseInt(provider.chainId, 16)
  library.pollingInterval = 5000;
  if (parsedChainId === 1) {
    library.pollingInterval = 15000;
  }
  return library;
}
