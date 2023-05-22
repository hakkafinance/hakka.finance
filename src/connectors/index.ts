export * from './NetworkConnector';
export * from './UauthConnector';
export * from './Injected';
export * from './WalletConnect'

const FORMATIC_KEY = process.env.GATSBY_FORTMATIC_KEY;
const PORTIS_ID = process.env.GATSBY_PORTIS_ID;

// export const injected = new InjectedConnector({
//   supportedChainIds: process.env.GATSBY_ENV === 'development' ? [1, 4, 42, 56, 137, 250] : [1, 56, 137, 250],
// });


// export const walletconnect = new WalletConnectConnector({
//   supportedChainIds: [1, 56, 137, 250],
//   rpc: {
//     1: NETWORK_URL,
//     56: BSC_NETWORK_URL,
//     137: POLYGON_NETWORK_URL,
//     250: FANTOM_NETWORK_URL,
//   },
//   bridge: 'https://bridge.walletconnect.org',
//   qrcode: true,
//   pollingInterval: 15000,
// });

// mainnet only
// export const fortmatic = new FortmaticConnector({
//   apiKey: FORMATIC_KEY ?? '',
//   chainId: 1,
// });

// mainnet only
// export const portis = new PortisConnector({
//   dAppId: PORTIS_ID ?? '',
//   networks: [1],
// });

// mainnet only
// export const walletlink = new WalletLinkConnector({
//   url: NETWORK_URL,
//   appName: 'Hakka Finance',
//   appLogoUrl:
//     'https://raw.githubusercontent.com/hakka-finance/token-profile/e84d84e3345a9ef52c863a84867e9460a0ed1a40/images/0x0E29e5AbbB5FD88e28b2d355774e73BD47dE3bcd.png',
// });
