import { JSBI, Percent, Token } from '@uniswap/sdk';
import { AbstractConnector } from '@web3-react/abstract-connector';

import {
  fortmatic,
  injected,
  portis,
} from '../connectors';

export enum ChainId {
  MAINNET = 1,
  KOVAN = 42,
}

export interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
  iconName: string;
  description: string;
  href: string | null;
  color: string;
  primary?: true;
  mobile?: true;
  mobileOnly?: true;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true,
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true,
  },
  FORTMATIC: {
    connector: fortmatic,
    name: 'Fortmatic',
    iconName: 'fortmaticIcon.png',
    description: 'Login using Fortmatic hosted wallet',
    href: null,
    color: '#6748FF',
    mobile: true,
  },
  Portis: {
    connector: portis,
    name: 'Portis',
    iconName: 'portisIcon.png',
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true,
  },
};

export const NetworkContextName = 'NETWORK';

export const HAKKA: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(
    1,
    '0x0E29e5AbbB5FD88e28b2d355774e73BD47dE3bcd',
    18,
    'HAKKA',
    'Hakka Finance'
  ),
  [ChainId.KOVAN]: new Token(
    42,
    '0xf0b165c4a0674bac5e78d75f66180ce5da87ddcf', //my own hakka contract on kovan
    18,
    'HAKKA',
    'Hakka Finance'
  ),
};

export const BURNER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xde02313f8BF17f31380c63e41CDECeE98Bc2b16d',
  [ChainId.KOVAN]: '0x793f3a1427592f674113E97A1741D39c91904971',
};

export const GUILDBANK: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x83D0D842e6DB3B020f384a2af11bD14787BEC8E7',
  [ChainId.KOVAN]: '0xB062FE463548FCEf976C9BC5B93f29813e142DB8',
};

export const ETHADDRESS: string = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

const NAME: string = 'name';
const SYMBOL: string = 'symbol';
const DECIMALS: string = 'decimals';

export const REWARD_TOKENS: { [chainId in ChainId]: any } = {
  [ChainId.MAINNET]: {
    '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE': {
      [NAME]: 'Ether',
      [SYMBOL]: 'ETH',
      [DECIMALS]: 18,
    },
    '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2': {
      [NAME]: 'Maker',
      [SYMBOL]: 'MKR',
      [DECIMALS]: 18,
    },
    '0x35101c731b1548B5e48bb23F99eDBc2f5c341935': {
      [NAME]: 'BlackHoleSwap-Compound DAI/USDC v1',
      [SYMBOL]: 'BHSc$',
      [DECIMALS]: 18,
    },
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': {
      [NAME]: 'USD Coin',
      [SYMBOL]: 'USDC',
      [DECIMALS]: 6,
    },
  },
  [ChainId.KOVAN]: {
    '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE': {
      [NAME]: 'Ether',
      [SYMBOL]: 'ETH',
      [DECIMALS]: 18,
    },
    '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa': {
      [NAME]: 'Dai Stablecoin',
      [SYMBOL]: 'DAI',
      [DECIMALS]: 18,
    },
    '0xb7a4F3E9097C08dA09517b5aB877F7a917224ede': {
      [NAME]: 'USD Coin ',
      [SYMBOL]: 'USDC',
      [DECIMALS]: 6,
    },
    '0x61460874a7196d6a22D1eE4922473664b3E95270': {
      [NAME]: 'Compound',
      [SYMBOL]: 'COMP',
      [DECIMALS]: 18,
    },
  },
};