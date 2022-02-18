import { Token } from '@uniswap/sdk';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { AddressZero } from '@ethersproject/constants';

import {
  walletconnect,
  walletlink,
  fortmatic,
  injected,
  portis,
} from '../connectors';

export enum ChainId {
  MAINNET = 1,
  KOVAN = 42,
  BSC = 56,
  POLYGON = 137,
}

export const stakingMonth = [1, 3, 6, 12];

export const ChainName: { [chainId in ChainId]: string } = {
  1: 'Ethereum Mainnet',
  42: 'Kovan Testnet',
  56: 'Binance Smart Chain',
  137: 'Polygon Network',
};

export interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
  iconName: string;
  description: string;
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'metamask',
    description: 'Injected web3 provider.',
  },
  INJECTED_IMTOKEN: {
    connector: injected,
    name: 'imToken',
    iconName: 'imToken',
    description: 'Injected imToken provider.',
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon',
    description: 'Use Coinbase Wallet app on mobile device',
  },
  FORTMATIC: {
    connector: fortmatic,
    name: 'Fortmatic',
    iconName: 'fortmaticIcon',
    description: 'Login using Fortmatic hosted wallet',
  },
  Portis: {
    connector: portis,
    name: 'Portis',
    iconName: 'portisIcon',
    description: 'Login using Portis hosted wallet',
  },
};

export const NetworkContextName = 'NETWORK';

export const HAKKA: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(
    1,
    '0x0E29e5AbbB5FD88e28b2d355774e73BD47dE3bcd',
    18,
    'HAKKA',
    'Hakka Finance',
  ),
  [ChainId.KOVAN]: new Token(
    42,
    '0xaFF4481D10270F50f203E0763e2597776068CBc5',
    18,
    'HAKKA',
    'Hakka Finance',
  ),
  [ChainId.BSC]: new Token(
    56,
    '0x1d1eb8e8293222e1a29d2c0e4ce6c0acfd89aaac',
    18,
    'HAKKA',
    'Hakka Finance',
  ),
  [ChainId.POLYGON]: new Token(
    137,
    '0x978338A9d2d0aa2fF388d3dc98b9bF25bfF5efB4',
    18,
    'HAKKA',
    'Hakka Finance',
  ),
};

export const STAKING_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xd9958826bce875a75cc1789d5929459e6ff15040',
  [ChainId.KOVAN]: '0xBf605Cb5f610C0aEDbf6e89af652892FF007B47c',
  [ChainId.BSC]: AddressZero,
  [ChainId.POLYGON]: AddressZero,
};

export const VESTING_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x51F12323820b3c0077864990d9E6aD9604238Ed6',
  [ChainId.KOVAN]: '0x3DEF87Be78024943E48183E9118D951C39a8197D',
  [ChainId.BSC]: '0x6dbff20CAFf68B99b1e67B50D14A9D7BBdfA94DC',
  [ChainId.POLYGON]: '0xeC4b77e7369325b52A1f9d1Ae080B59954B8001a',
};

export const BURNER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xde02313f8BF17f31380c63e41CDECeE98Bc2b16d',
  [ChainId.KOVAN]: '0x793f3a1427592f674113E97A1741D39c91904971',
  [ChainId.BSC]: AddressZero,
  [ChainId.POLYGON]: AddressZero,
};

export const GUILDBANK: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x83D0D842e6DB3B020f384a2af11bD14787BEC8E7',
  [ChainId.KOVAN]: '0xB062FE463548FCEf976C9BC5B93f29813e142DB8',
  [ChainId.BSC]: AddressZero,
  [ChainId.POLYGON]: AddressZero,
};

export const ETHADDRESS: string = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

const NAME: string = 'name';
const SYMBOL: string = 'symbol';
const DECIMALS: string = 'decimals';

export const VAULT_TOKENS: { [chainId in ChainId]: any } = {
  [ChainId.MAINNET]: {
    '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE': {
      [NAME]: 'Ether',
      [SYMBOL]: 'ETH',
      [DECIMALS]: 18,
    },
    '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2': {
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
  [ChainId.BSC]: {
  },
  [ChainId.POLYGON]: {
  },
};

export const DEFAULT_TOKENS_COIN_GECKO_ID_BOOK : { [address: string]: string } = {
  '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE': 'ethereum',
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': 'usd-coin',
  '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2': 'maker',
  '0x35101c731b1548B5e48bb23F99eDBc2f5c341935': 'blackholeswap-compound-dai-usdc',
};

export const BHS_USDC_DAI_HAKKA_BPT = '0x1B8874BaceAAfba9eA194a625d12E8b270D77016'
export const BHS_POOL = '0x6b1ecbbd69eeaf8d089bdce4daaa4165f8c3ff11'
export const BSC_BHS_POOL = '0x79EB6F02E9aC26a6fbc4e73DEE0b8991D0c55F4a'
export const BHS_USDC_DAI_HAKKA_POOL = '0x6EE6683Cb9b44810369C873679f8073bCBE52F27'
export const BHS_HAKKA_BPT = '0xaE95D3198d602acFB18F9188d733d710e14A27Dd'
export const BHS_HAKKA_POOL = '0x3792ee68E736b8214D4eDC91b1B3340B525e00BF'
export const MKR_HAKKA_POOL = '0x3BD145F66203B19CE7BeDaAC9A8147E08EA64645'
export const TFT_POOL = '0x0AA6C4Ff04e4E6512c5348f4B04685af2Cd11058'
export const SHAKKA_POOL = '0xF4D1F9674c8e9f29A69DC2E6f841292e675B7977'
export const IGAIN_TEST_POOL = '0xbEe4829ab37a5d1C4bEf6A86bBA479420748b61d' // example, should be delete after prod released
export const IGAIN_BNB_BUSD_POOL = '0x4E353C2CCc7DfB6a4d3Ea7802ddEBa226574702E' // started at 20211104
export const IGAIN_POLYGON_DAI_POOL_1 = '0xdA54678FD782A162a2BAE0EA9E250a325c4F6de9'
export const IGAIN_POLYGON_USDC_POOL_1 = '0x4D5054708982e96F284D02c7a46F31d6f7291C56'
export const IGAIN_POLYGON_USDT_POOL_1 = '0xF8B5351F4bCBF6321cAb7911D775Da3FaC3b5410'
export const IGAIN_POLYGON_DAI_POOL_2 = '0x5Dd2777c42C34Ed155FD3CC063A956D03f92448F'
export const IGAIN_POLYGON_USDC_POOL_2 = '0x25a1f8f0b666E5C17e91CF9F5322aad0780B588e'
export const IGAIN_POLYGON_USDT_POOL_2 = '0x9933AD4D38702cdC28C5DB2F421F1F02CF530780'

export const IGAIN_IG_POLYGON_ETH_USDC_POOL_1 = '0x459fB73f0B9bE0cAA85FCbDF151EaB2d1269823A'
export const DAI_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
export const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
export const BHS_ADDRESS = '0x35101c731b1548B5e48bb23F99eDBc2f5c341935'

export const TOKEN_PRICE_SLUGS: string[] = [
  'ethereum',
  'hakka-finance',
  'binancecoin',
  'binance-usd',
  'pancakeswap-token',
  'wbnb',
  'alpaca-finance',
  'maker',
  'blackholeswap-compound-dai-usdc',
  'dai',
  'usd-coin',
  'tether',
]
