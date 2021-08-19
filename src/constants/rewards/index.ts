import { ChainId } from '../../constants';

export type Pool = {
  name: string;
  chain: ChainId;
  website: string;
  url: string;
  tokenAddress: string;
  tokenSymbol: string;
  rewardsAddress: string;
  rewardsSymbol: string;
  archived: boolean;
}

export const REWARD_POOLS: { [key: string]: Pool } = {
  '0x6b1ecbbd69eeaf8d089bdce4daaa4165f8c3ff11': {
    name: 'BHS',
    chain: ChainId.MAINNET,
    website: 'BlackHoleSwap',
    url: 'https://blackholeswap.com/deposit',
    tokenAddress: '0x35101c731b1548B5e48bb23F99eDBc2f5c341935',
    tokenSymbol: 'BHSc$',
    rewardsAddress: '0x6b1ecbbd69eeaf8d089bdce4daaa4165f8c3ff11',
    rewardsSymbol: 'HAKKA',
    archived: true,
  },
  '0x6EE6683Cb9b44810369C873679f8073bCBE52F27': {
    name: 'BHS/USDC/DAI/HAKKA',
    chain: ChainId.MAINNET,
    website: 'Balancer LP token',
    url:
      'https://pools.balancer.exchange/#/pool/0x1b8874baceaafba9ea194a625d12e8b270d77016',
    tokenAddress: '0x1b8874baceaafba9ea194a625d12e8b270d77016',
    tokenSymbol: 'BPT',
    rewardsAddress: '0x6EE6683Cb9b44810369C873679f8073bCBE52F27',
    rewardsSymbol: 'HAKKA',
    archived: false,
  },
  '0x3792ee68E736b8214D4eDC91b1B3340B525e00BF': {
    name: 'BHS/HAKKA',
    chain: ChainId.MAINNET,
    website: 'Balancer LP token',
    url:
      'https://pools.balancer.exchange/#/pool/0xae95d3198d602acfb18f9188d733d710e14a27dd',
    tokenAddress: '0xae95d3198d602acfb18f9188d733d710e14a27dd',
    tokenSymbol: 'BPT',
    rewardsAddress: '0x3792ee68E736b8214D4eDC91b1B3340B525e00BF',
    rewardsSymbol: 'HAKKA',
    archived: false,
  },
  '0x3BD145F66203B19CE7BeDaAC9A8147E08EA64645': {
    name: 'MKR/HAKKA',
    chain: ChainId.MAINNET,
    website: 'Uniswap MKR-HAKKA',
    url:
      'https://app.uniswap.org/#/add/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/0x0E29e5AbbB5FD88e28b2d355774e73BD47dE3bcd',
    tokenAddress: '0xB8b84Ce0CAde916988BD129EaFd7934ADE5Fa6a9',
    tokenSymbol: 'UNI-V2',
    rewardsAddress: '0x3BD145F66203B19CE7BeDaAC9A8147E08EA64645',
    rewardsSymbol: 'HAKKA',
    archived: true,
  },
  '0x0AA6C4Ff04e4E6512c5348f4B04685af2Cd11058': {
    name: 'TFT',
    chain: ChainId.MAINNET,
    website: '3FMutual',
    url: 'http://3fmutual.com',
    tokenAddress: '0xBdDa9670Bc2a672c36ccE0102ce8C69B12E9deE3',
    tokenSymbol: 'TFT',
    rewardsAddress: '0x0AA6C4Ff04e4E6512c5348f4B04685af2Cd11058',
    rewardsSymbol: 'HAKKA',
    archived: true,
  },
  '0xF4D1F9674c8e9f29A69DC2E6f841292e675B7977': {
    name: 'sHAKKA',
    chain: ChainId.MAINNET,
    website: 'sHAKKA',
    url: 'https://hakka.finance/staking',
    tokenAddress: '0xd9958826Bce875A75cc1789D5929459E6ff15040',
    tokenSymbol: 'sHAKKA',
    rewardsAddress: '0xF4D1F9674c8e9f29A69DC2E6f841292e675B7977',
    rewardsSymbol: 'HAKKA',
    archived: false,
  },
  '0x79EB6F02E9aC26a6fbc4e73DEE0b8991D0c55F4a': {
    name: 'BHS',
    chain: ChainId.BSC,
    website: 'USDT-BUSD BHS',
    url: 'https://bsc.blackholeswap.com/deposit',
    tokenAddress: '0x75192D6f3d51554CC2eE7B40C3aAc5f97934ce7E',
    tokenSymbol: 'BHSc$',
    rewardsAddress: '0x79EB6F02E9aC26a6fbc4e73DEE0b8991D0c55F4a',
    rewardsSymbol: 'HAKKA',
    archived: false,
  },
}
