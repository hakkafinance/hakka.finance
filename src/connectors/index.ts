import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { UAuthConnector } from '@uauth/web3-react';

import { FortmaticConnector } from './Fortmatic';
import { NetworkConnector } from './NetworkConnector';

const NETWORK_URL = process.env.GATSBY_NETWORK_URL;
const BSC_NETWORK_URL = process.env.GATSBY_BSC_NETWORK_URL;
const POLYGON_NETWORK_URL = process.env.GATSBY_POLYGON_NETWORK_URL;
const FANTOM_NETWORK_URL = process.env.GATSBY_FANTOM_NETWORK_URL;
const FORMATIC_KEY = process.env.GATSBY_FORTMATIC_KEY;
const PORTIS_ID = process.env.GATSBY_PORTIS_ID;
const UAUTH_CLIENT_ID = process.env.GATSBY_UAUTH_CLIENT_ID;

export const NETWORK_CHAIN_ID: number = parseInt(
  process.env.GATSBY_CHAIN_ID ?? '1',
);

if (typeof NETWORK_URL === 'undefined' || typeof BSC_NETWORK_URL === 'undefined'
  || typeof POLYGON_NETWORK_URL === 'undefined' || typeof FANTOM_NETWORK_URL === 'undefined') {
  throw new Error(
    'GATSBY_NETWORK_URL and GATSBY_BSC_NETWORK_URL and POLYGON_NETWORK_URL must be a defined environment variable',
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
  supportedChainIds: process.env.GATSBY_ENV === 'development' ? [1, 4, 42, 56, 137, 250] : [1, 56, 137, 250],
});

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: [1, 56, 137, 250],
  rpc: { 1: NETWORK_URL, 56: BSC_NETWORK_URL, 137: POLYGON_NETWORK_URL, 250: FANTOM_NETWORK_URL },
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

export const uauthOptions = {
  clientID: UAUTH_CLIENT_ID || 'client_id',
  redirectUri: process.env.REACT_APP_ENV === 'production' ? 'https://hakka.finance' : 'http://localhost:8000',
  postLogoutRedirectUri: 'https://hakka.finance',
  scope: 'openid wallet',
  connectors: { injected, walletconnect },
};

export const uauth = new UAuthConnector(uauthOptions);
