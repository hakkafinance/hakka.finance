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
