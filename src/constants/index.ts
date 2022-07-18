import { JsonRpcProvider } from '@ethersproject/providers';
import { Token } from '@uniswap/sdk';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { AddressZero } from '@ethersproject/constants';

import {
  walletconnect,
  walletlink,
  fortmatic,
  injected,
  portis,
  uauth,
} from '../connectors';

export enum ChainId {
  MAINNET = 1,
  RINKEBY = 4,
  KOVAN = 42,
  BSC = 56,
  POLYGON = 137,
  FANTOM = 250,
}

export enum ChainDataFetchingState {
  LOADING,
  SUCCESS,
}

export enum TransactionState {
  UNKNOWN,
  PENDING,
  SUCCESS,
  ERROR,
}

export const stakingMonth = [1, 3, 6, 12];

export const ChainName: { [chainId in ChainId]: string } = {
  1: 'Ethereum Mainnet',
  4: 'Rinkeby',
  42: 'Kovan Testnet',
  56: 'BNB Chain',
  137: 'Polygon Network',
  250: 'Fantom Network',
};

// 365.25 days per year
export const SEC_OF_FOUR_YEARS = 126230400;
export const SEC_OF_YEAR = 31557600;

export const ChainNameWithIcon: Record<ChainId, {iconName: string, name: string}> = {
  [ChainId.MAINNET]: {
    iconName: 'iconTabEthereum',
    name: 'Ethereum',
  },
  [ChainId.RINKEBY]: {
    iconName: 'iconTabRinkeby',
    name: 'Rinkeby',
  },
  [ChainId.KOVAN]: {
    iconName: 'iconTabKovan',
    name: 'Kovan',
  },
  [ChainId.BSC]: {
    iconName: 'iconTabBinance',
    name: 'BNB',
  },
  [ChainId.POLYGON]: {
    iconName: 'iconTabPolygon',
    name: 'Polygon',
  },
  [ChainId.FANTOM]: {
    iconName: 'iconTabFantom',
    name: 'Fantom',
  },
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
  UAuth: {
    connector: uauth,
    name: 'Unstoppable Domain',
    iconName: 'unstoppableIcon',
    description: 'Login using Unstoppable Domain',
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
  [ChainId.RINKEBY]: new Token(
    4,
    '0xaFF4481D10270F50f203E0763e2597776068CBc5',
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
  [ChainId.FANTOM]: new Token(
    250,
    '0xda803c6AD8078c51c5334B51aA4Cc3f440d56D5F',
    18,
    'HAKKA',
    'Hakka Finance',
  ),
};

export const STAKING_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xd9958826bce875a75cc1789d5929459e6ff15040',
  [ChainId.KOVAN]: '0xBf605Cb5f610C0aEDbf6e89af652892FF007B47c',
  [ChainId.BSC]: AddressZero,
  [ChainId.RINKEBY]: AddressZero,
  [ChainId.POLYGON]: AddressZero,
  [ChainId.FANTOM]: AddressZero,
};

export const VESTING_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x51F12323820b3c0077864990d9E6aD9604238Ed6',
  [ChainId.KOVAN]: '0x3DEF87Be78024943E48183E9118D951C39a8197D',
  [ChainId.BSC]: '0x6dbff20CAFf68B99b1e67B50D14A9D7BBdfA94DC',
  [ChainId.POLYGON]: '0xeC4b77e7369325b52A1f9d1Ae080B59954B8001a',
  [ChainId.RINKEBY]: AddressZero,
  [ChainId.FANTOM]: '0x3792ee68E736b8214D4eDC91b1B3340B525e00BF',
};

export const BURNER_ADDRESS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xde02313f8BF17f31380c63e41CDECeE98Bc2b16d',
  [ChainId.KOVAN]: '0x793f3a1427592f674113E97A1741D39c91904971',
  [ChainId.BSC]: AddressZero,
  [ChainId.POLYGON]: AddressZero,
  [ChainId.RINKEBY]: AddressZero,
  [ChainId.FANTOM]: AddressZero,
};

export const GUILDBANK: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x83D0D842e6DB3B020f384a2af11bD14787BEC8E7',
  [ChainId.KOVAN]: '0xB062FE463548FCEf976C9BC5B93f29813e142DB8',
  [ChainId.BSC]: AddressZero,
  [ChainId.POLYGON]: AddressZero,
  [ChainId.RINKEBY]: AddressZero,
  [ChainId.FANTOM]: AddressZero,
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
  [ChainId.RINKEBY]: {
  },
  [ChainId.FANTOM]: {
  },
};

// TODO: check this address
export const NEW_SHAKKA_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xb925863a15ebdeae1a638bf2b6fd00d4db897a62',
  [ChainId.KOVAN]: '0x9680498EE70fb6084869962F63cce7315FDA29F0',
  [ChainId.RINKEBY]: '0x0b6eAA40319113f5500a2bD1C2f434b42Ec3C1b9',
  [ChainId.BSC]: '0x51DE1EeF029b5cc1Ef359E62aA98101F56f29bE6',
  [ChainId.POLYGON]: '0x7F8093f5F49a9D7F0334f8017fF777F1893032d5',
  [ChainId.FANTOM]: AddressZero
};

export const STAKING_RATE_MODEL_RELEASE_TIME: { [address: typeof NEW_SHAKKA_ADDRESSES[ChainId]]: number } = {
  [NEW_SHAKKA_ADDRESSES[ChainId.MAINNET]]: 1655110318,
  [NEW_SHAKKA_ADDRESSES[ChainId.KOVAN]]: 1653042448,
  [NEW_SHAKKA_ADDRESSES[ChainId.BSC]]: 1655108868,
  [NEW_SHAKKA_ADDRESSES[ChainId.POLYGON]]: 1655455798,
  [NEW_SHAKKA_ADDRESSES[ChainId.RINKEBY]]: 1653630226,
};

export const DEFAULT_TOKENS_COIN_GECKO_ID_BOOK : { [address: string]: string } = {
  '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE': 'ethereum',
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': 'usd-coin',
  '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2': 'maker',
  '0x35101c731b1548B5e48bb23F99eDBc2f5c341935': 'blackholeswap-compound-dai-usdc',
};

export const BHS_USDC_DAI_HAKKA_BPT = '0x1B8874BaceAAfba9eA194a625d12E8b270D77016';
export const BHS_POOL = '0x6b1ecbbd69eeaf8d089bdce4daaa4165f8c3ff11';
export const BSC_BHS_POOL = '0x79EB6F02E9aC26a6fbc4e73DEE0b8991D0c55F4a';
export const BHS_USDC_DAI_HAKKA_POOL = '0x6EE6683Cb9b44810369C873679f8073bCBE52F27';
export const BHS_HAKKA_BPT = '0xaE95D3198d602acFB18F9188d733d710e14A27Dd';
export const BHS_HAKKA_POOL = '0x3792ee68E736b8214D4eDC91b1B3340B525e00BF';
export const MKR_HAKKA_POOL = '0x3BD145F66203B19CE7BeDaAC9A8147E08EA64645';
export const TFT_POOL = '0x0AA6C4Ff04e4E6512c5348f4B04685af2Cd11058';
export const SHAKKA_POOL = '0xF4D1F9674c8e9f29A69DC2E6f841292e675B7977';
// TODO: new sHakka pool is not ready
export const ETH_SHAKKA_POOL = '0x735A80510536a9A18c8824f40DBc92824640c95a';
export const BSC_SHAKKA_POOL = '0x64A7B6F1A014156415b214e14Eb7477c3A3AceAE';
export const POLYGON_SHAKKA_POOL = '0xf55eAbB6B9460baDb569b5bfF0AD0efdf2264d5a';
export const KOVAN_SHAKKA_POOL = '';
export const RINKEBY_SHAKKA_POOL = '';
export const IGAIN_TEST_POOL = '0xbEe4829ab37a5d1C4bEf6A86bBA479420748b61d'; // example, should be delete after prod released
export const IGAIN_BNB_BUSD_POOL = '0x4E353C2CCc7DfB6a4d3Ea7802ddEBa226574702E'; // started at 20211104

export const IGAIN_POLYGON_DAI_POOL_1 = '0xdA54678FD782A162a2BAE0EA9E250a325c4F6de9'; // started at 23820161
export const IGAIN_POLYGON_USDC_POOL_1 = '0x4D5054708982e96F284D02c7a46F31d6f7291C56'; // started at 23819245
export const IGAIN_POLYGON_USDT_POOL_1 = '0xF8B5351F4bCBF6321cAb7911D775Da3FaC3b5410'; // started at 24085140
export const IGAIN_POLYGON_DAI_POOL_2 = '0x5Dd2777c42C34Ed155FD3CC063A956D03f92448F'; // started at 25059512
export const IGAIN_POLYGON_USDC_POOL_2 = '0x25a1f8f0b666E5C17e91CF9F5322aad0780B588e'; // started at 25059502
export const IGAIN_POLYGON_USDC_POOL_3 = '0x87c2829CcD44d2a96E76E1D3bF56d504d5cB1536'; // started at 26867817
export const IGAIN_POLYGON_USDT_POOL_2 = '0x9933AD4D38702cdC28C5DB2F421F1F02CF530780'; // started at 25059529

export const IGAIN_FANTOM_DAI_POOL_1 = '0xdDcd120e3aA3eD45e85786E4543fAbD78aB94F12'; // started at
export const IGAIN_FANTOM_ETH_POOL_1 = '0xdaFf37c6397F1916Af8352fae36749D88E0b298E'; // started at
export const IGAIN_FANTOM_USDT_POOL_1 = '0xC2FeebD3F4af177AA30F43f5aa4A0033E77E1102'; // started at

export const IGAIN_IG_POLYGON_ETH_USDC_POOL_1 = '0x459fB73f0B9bE0cAA85FCbDF151EaB2d1269823A'; // started at 24809030
export const DAI_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
export const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
export const BHS_ADDRESS = '0x35101c731b1548B5e48bb23F99eDBc2f5c341935';

export const SHAKKA_POOLS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: ETH_SHAKKA_POOL,
  [ChainId.KOVAN]: KOVAN_SHAKKA_POOL,
  [ChainId.BSC]: BSC_SHAKKA_POOL,
  [ChainId.POLYGON]: POLYGON_SHAKKA_POOL,
  [ChainId.RINKEBY]: RINKEBY_SHAKKA_POOL,
};

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
];

export const JSON_RPC_PROVIDER: {[chainId in ChainId]: JsonRpcProvider} = {
  [ChainId.MAINNET]: new JsonRpcProvider(process.env.GATSBY_NETWORK_URL),
  [ChainId.KOVAN]: new JsonRpcProvider(process.env.GATSBY_KOVAN_NETWORK_URL),
  [ChainId.BSC]: new JsonRpcProvider(process.env.GATSBY_BSC_NETWORK_URL),
  [ChainId.POLYGON]: new JsonRpcProvider(process.env.GATSBY_POLYGON_NETWORK_URL),
  [ChainId.RINKEBY]: new JsonRpcProvider(process.env.GATSBY_RINKEBY_NETWORK_URL),
  [ChainId.FANTOM]: new JsonRpcProvider(process.env.GATSBY_FANTOM_NETWORK_URL),
};
