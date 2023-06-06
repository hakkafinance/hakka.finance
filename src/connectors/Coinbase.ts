import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector } from '@web3-react/core';
import { CHAIN_URL_DICT } from '../constants/chainDetail';

export const [walletlink, walletlinkHooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        url: CHAIN_URL_DICT['1'][0],
        appName: 'Hakka Finance',
        appLogoUrl:
          'https://raw.githubusercontent.com/hakka-finance/token-profile/e84d84e3345a9ef52c863a84867e9460a0ed1a40/images/0x0E29e5AbbB5FD88e28b2d355774e73BD47dE3bcd.png',
      },
    })
);
