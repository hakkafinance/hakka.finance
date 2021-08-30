import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { PortisConnector } from '@web3-react/portis-connector';

import { FortmaticConnector } from './Fortmatic';
import { NetworkConnector } from './NetworkConnector';

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL;
const BSC_NETWORK_URL = process.env.REACT_APP_BSC_NETWORK_URL;
const FORMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY;
const PORTIS_ID = process.env.REACT_APP_PORTIS_ID;

export const NETWORK_CHAIN_ID: number = parseInt(
  process.env.REACT_APP_CHAIN_ID ?? '1',
);

if (typeof NETWORK_URL === 'undefined' || typeof BSC_NETWORK_URL === 'undefined') {
  throw new Error(
    'REACT_APP_NETWORK_URL and REACT_APP_BSC_NETWORK_URL must be a defined environment variable',
  );
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL },
});

let networkLibrary: Web3Provider | undefined;
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any));
}

export const injected = new InjectedConnector({
  supportedChainIds: process.env.NODE_ENV === 'development' ? [1, 42, 56] : [1, 56],
});

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: [1],
  rpc: { 1: NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
});

export const bscWalletconnect = new WalletConnectConnector({
  supportedChainIds: [56],
  rpc: { 56: BSC_NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 15000,
});

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: FORMATIC_KEY ?? '',
  chainId: 1,
});

// mainnet only
export const portis = new PortisConnector({
  dAppId: PORTIS_ID ?? '',
  networks: [1],
});

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: NETWORK_URL,
  appName: 'Hakka Finance',
  appLogoUrl:
    'https://raw.githubusercontent.com/hakka-finance/token-profile/e84d84e3345a9ef52c863a84867e9460a0ed1a40/images/0x0E29e5AbbB5FD88e28b2d355774e73BD47dE3bcd.png',
});
