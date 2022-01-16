import {
  ChainId,
  BHS_POOL,
  BHS_USDC_DAI_HAKKA_POOL,
  BHS_HAKKA_POOL,
  MKR_HAKKA_POOL,
  TFT_POOL,
  SHAKKA_POOL,
  BSC_BHS_POOL,
  IGAIN_BNB_BUSD_POOL,
  IGAIN_POLYGON_DEV_POOL,
} from '../../constants';

export type Pool = {
  name: string;
  chain: ChainId;
  website: string;
  url: string;
  tokenAddress: string;
  tokenSymbol: string;
  decimal?: number;
  rewardsAddress: string;
  rewardsSymbol: string;
  archived: boolean;
}

export const REWARD_POOLS: { [key: string]: Pool } = {
  [BHS_POOL]: {
    name: 'BHS',
    chain: ChainId.MAINNET,
    website: 'BlackHoleSwap',
    url: 'https://blackholeswap.com/deposit',
    tokenAddress: '0x35101c731b1548B5e48bb23F99eDBc2f5c341935',
    tokenSymbol: 'BHSc$',
    rewardsAddress: BHS_POOL,
    rewardsSymbol: 'HAKKA',
    archived: true,
  },
  [BHS_USDC_DAI_HAKKA_POOL]: {
    name: 'BHS/USDC/DAI/HAKKA',
    chain: ChainId.MAINNET,
    website: 'Balancer LP token',
    url:
      'https://pools.balancer.exchange/#/pool/0x1b8874baceaafba9ea194a625d12e8b270d77016',
    tokenAddress: '0x1b8874baceaafba9ea194a625d12e8b270d77016',
    tokenSymbol: 'BPT',
    rewardsAddress: BHS_USDC_DAI_HAKKA_POOL,
    rewardsSymbol: 'HAKKA',
    archived: true,
  },
  [BHS_HAKKA_POOL]: {
    name: 'BHS/HAKKA',
    chain: ChainId.MAINNET,
    website: 'Balancer LP token',
    url:
      'https://pools.balancer.exchange/#/pool/0xae95d3198d602acfb18f9188d733d710e14a27dd',
    tokenAddress: '0xae95d3198d602acfb18f9188d733d710e14a27dd',
    tokenSymbol: 'BPT',
    rewardsAddress: BHS_HAKKA_POOL,
    rewardsSymbol: 'HAKKA',
    archived: true,
  },
  [MKR_HAKKA_POOL]: {
    name: 'MKR/HAKKA',
    chain: ChainId.MAINNET,
    website: 'Uniswap MKR-HAKKA',
    url:
      'https://app.uniswap.org/#/add/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/0x0E29e5AbbB5FD88e28b2d355774e73BD47dE3bcd',
    tokenAddress: '0xB8b84Ce0CAde916988BD129EaFd7934ADE5Fa6a9',
    tokenSymbol: 'UNI-V2',
    rewardsAddress: MKR_HAKKA_POOL,
    rewardsSymbol: 'HAKKA',
    archived: true,
  },
  [TFT_POOL]: {
    name: 'TFT',
    chain: ChainId.MAINNET,
    website: '3FMutual',
    url: 'http://3fmutual.com',
    tokenAddress: '0xBdDa9670Bc2a672c36ccE0102ce8C69B12E9deE3',
    tokenSymbol: 'TFT',
    rewardsAddress: TFT_POOL,
    rewardsSymbol: 'HAKKA',
    archived: true,
  },
  [SHAKKA_POOL]: {
    name: 'sHAKKA',
    chain: ChainId.MAINNET,
    website: 'sHAKKA',
    url: 'https://hakka.finance/staking',
    tokenAddress: '0xd9958826Bce875A75cc1789D5929459E6ff15040',
    tokenSymbol: 'sHAKKA',
    rewardsAddress: SHAKKA_POOL,
    rewardsSymbol: 'HAKKA',
    archived: false,
  },
  [BSC_BHS_POOL]: {
    name: 'BHS',
    chain: ChainId.BSC,
    website: 'USDT-BUSD BHS',
    url: 'https://bsc.blackholeswap.com/deposit',
    tokenAddress: '0x75192D6f3d51554CC2eE7B40C3aAc5f97934ce7E',
    tokenSymbol: 'BHSc$',
    rewardsAddress: BSC_BHS_POOL,
    rewardsSymbol: 'HAKKA',
    archived: true,
  },
  [IGAIN_BNB_BUSD_POOL]: { // example, should be delete after prod released
    name: 'iGain',
    chain: ChainId.BSC,
    website: 'BNB - BUSD pair on iGain',
    url: 'https://igain.finance/markets/bnb-busd/0xc9d710CdE965521944BCB4D4eF73ADA6113FAE27',
    tokenAddress: '0xc9d710CdE965521944BCB4D4eF73ADA6113FAE27',
    tokenSymbol: 'LP',
    rewardsAddress: IGAIN_BNB_BUSD_POOL,
    rewardsSymbol: 'HAKKA',
    archived: true,
  },
  [IGAIN_POLYGON_DEV_POOL]: {
    name: 'iGain Dev',
    chain: ChainId.POLYGON,
    website: 'Polygon Dev iGain',
    url: '',
    tokenAddress: '0x069C46A7CA72Ea31aB3E7d1858754390a23593f9',
    tokenSymbol: 'LP',
    decimal: 6,
    rewardsAddress: IGAIN_POLYGON_DEV_POOL,
    rewardsSymbol: 'HAKKA',
    archived: false,
  },
}
