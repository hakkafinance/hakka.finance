import { Zero } from '@ethersproject/constants';
import images from '../../images';
import { BigNumber } from '@ethersproject/bignumber';
import {
  bhsApr,
  balancer4tokenApr,
  balancer2tokenApr,
  mkrHakkaApr,
  tftApr,
  sHakkaApr,
  sHakkaV2Apr,
  bscBhsApr,
  getGainAprFunc,
} from '../../utils/rewardsApr';
import {
  balancer4tokenTvl,
  balancer2tokenTvl,
  getGainTvlFunc,
} from '../../utils/rewardsTvl';
import {
  ChainId,
  IGAIN_BNB_BUSD_POOL,
  IGAIN_IG_POLYGON_ETH_USDC_POOL_1,
  IGAIN_POLYGON_DAI_POOL_1,
  IGAIN_POLYGON_USDC_POOL_1,
  IGAIN_POLYGON_USDT_POOL_1,
  IGAIN_POLYGON_DAI_POOL_2,
  IGAIN_POLYGON_USDC_POOL_2,
  IGAIN_POLYGON_USDT_POOL_2,
  IGAIN_POLYGON_USDC_POOL_3,
  IGAIN_FANTOM_DAI_POOL_1,
  IGAIN_FANTOM_USDT_POOL_1,
  IGAIN_FANTOM_ETH_POOL_1,
  ETH_SHAKKA_POOL,
  BSC_SHAKKA_POOL,
  POLYGON_SHAKKA_POOL,
} from '..';

export type PoolAssets = {
  icon: any;
  decimal: number;
  getApr: (...args: any[]) => Promise<BigNumber>;
  getTvl: (...args: any[]) => Promise<BigNumber>;
  tokenPriceKey?: string;
}

export const POOL_ASSETES: { [key: string]: PoolAssets } = {
  '0x6b1ecbbd69eeaf8d089bdce4daaa4165f8c3ff11': {
    icon: images.iconBHS,
    decimal: 18,
    getApr: bhsApr,
    getTvl: (tokenPrice: any) => Promise.resolve(Zero),
  },
  '0x6EE6683Cb9b44810369C873679f8073bCBE52F27': {
    icon: images.icon4Tokens,
    decimal: 18,
    getApr: balancer4tokenApr,
    getTvl: balancer4tokenTvl,
  },
  '0x3792ee68E736b8214D4eDC91b1B3340B525e00BF': {
    icon: images.icon2TokensCompHakka,
    decimal: 18,
    getApr: balancer2tokenApr,
    getTvl: balancer2tokenTvl,
  },
  '0x3BD145F66203B19CE7BeDaAC9A8147E08EA64645': {
    icon: images.icon2TokensMkrHakka,
    decimal: 18,
    getApr: mkrHakkaApr,
    getTvl: (tokenPrice: any) => Promise.resolve(Zero),
  },
  '0x0AA6C4Ff04e4E6512c5348f4B04685af2Cd11058': {
    icon: images.iconTFT,
    decimal: 18,
    getApr: tftApr,
    getTvl: (tokenPrice: any) => Promise.resolve(Zero),
  },
  '0xF4D1F9674c8e9f29A69DC2E6f841292e675B7977': {
    icon: images.iconSealedHakka,
    decimal: 18,
    getApr: sHakkaApr,
    getTvl: (tokenPrice: any) => Promise.resolve(Zero),
  },
  [ETH_SHAKKA_POOL]: {
    icon: images.iconSealedHakka,
    decimal: 18,
    getApr: sHakkaV2Apr(ChainId.MAINNET),
    getTvl: (tokenPrice: any) => Promise.resolve(Zero),
  },
  [BSC_SHAKKA_POOL]: {
    icon: images.iconSealedHakka,
    decimal: 18,
    getApr: sHakkaV2Apr(ChainId.BSC),
    getTvl: (tokenPrice: any) => Promise.resolve(Zero),
  },
  [POLYGON_SHAKKA_POOL]: {
    icon: images.iconSealedHakka,
    decimal: 18,
    getApr: sHakkaV2Apr(ChainId.POLYGON),
    getTvl: (tokenPrice: any) => Promise.resolve(Zero),
  },
  '0x79EB6F02E9aC26a6fbc4e73DEE0b8991D0c55F4a': {
    icon: images.iconBSC_BHS,
    decimal: 18,
    getApr: bscBhsApr,
    getTvl: (tokenPrice: any) => Promise.resolve(Zero),
  },
  [IGAIN_BNB_BUSD_POOL]: {
    icon: images.iconIgainLp,
    decimal: 18,
    getApr: getGainAprFunc(IGAIN_BNB_BUSD_POOL, ChainId.BSC),
    getTvl: getGainTvlFunc(IGAIN_BNB_BUSD_POOL, ChainId.BSC),
  },
  [IGAIN_IG_POLYGON_ETH_USDC_POOL_1]: {
    icon: images.iconIgainLp,
    decimal: 6,
    getApr: getGainAprFunc(IGAIN_IG_POLYGON_ETH_USDC_POOL_1, ChainId.POLYGON),
    getTvl: getGainTvlFunc(IGAIN_IG_POLYGON_ETH_USDC_POOL_1, ChainId.POLYGON),
  },
  [IGAIN_POLYGON_DAI_POOL_1]: {
    icon: images.iconIgainLp,
    decimal: 18,
    getApr: getGainAprFunc(IGAIN_POLYGON_DAI_POOL_1, ChainId.POLYGON),
    getTvl: getGainTvlFunc(IGAIN_POLYGON_DAI_POOL_1, ChainId.POLYGON),
  },
  [IGAIN_POLYGON_USDC_POOL_1]: {
    icon: images.iconIgainLp,
    decimal: 6,
    getApr: getGainAprFunc(IGAIN_POLYGON_USDC_POOL_1, ChainId.POLYGON),
    getTvl: getGainTvlFunc(IGAIN_POLYGON_USDC_POOL_1, ChainId.POLYGON),
  },
  [IGAIN_POLYGON_USDT_POOL_1]: {
    icon: images.iconIgainLp,
    decimal: 6,
    getApr: getGainAprFunc(IGAIN_POLYGON_USDT_POOL_1, ChainId.POLYGON),
    getTvl: getGainTvlFunc(IGAIN_POLYGON_USDT_POOL_1, ChainId.POLYGON),
  },
  [IGAIN_POLYGON_DAI_POOL_2]: {
    icon: images.iconIgainLp,
    decimal: 18,
    getApr: getGainAprFunc(IGAIN_POLYGON_DAI_POOL_2, ChainId.POLYGON),
    getTvl: getGainTvlFunc(IGAIN_POLYGON_DAI_POOL_2, ChainId.POLYGON),
  },
  [IGAIN_POLYGON_USDC_POOL_2]: {
    icon: images.iconIgainLp,
    decimal: 6,
    getApr: getGainAprFunc(IGAIN_POLYGON_USDC_POOL_2, ChainId.POLYGON),
    getTvl: getGainTvlFunc(IGAIN_POLYGON_USDC_POOL_2, ChainId.POLYGON),
  },
  [IGAIN_POLYGON_USDC_POOL_3]: {
    icon: images.iconIgainLp,
    decimal: 6,
    getApr: getGainAprFunc(IGAIN_POLYGON_USDC_POOL_3, ChainId.POLYGON),
    getTvl: getGainTvlFunc(IGAIN_POLYGON_USDC_POOL_3, ChainId.POLYGON),
  },
  [IGAIN_POLYGON_USDT_POOL_2]: {
    icon: images.iconIgainLp,
    decimal: 6,
    getApr: getGainAprFunc(IGAIN_POLYGON_USDT_POOL_2, ChainId.POLYGON),
    getTvl: getGainTvlFunc(IGAIN_POLYGON_USDT_POOL_2, ChainId.POLYGON),
  },
  [IGAIN_FANTOM_DAI_POOL_1]: {
    icon: images.iconIgainLp,
    decimal: 18,
    getApr: getGainAprFunc(IGAIN_FANTOM_DAI_POOL_1, ChainId.FANTOM),
    getTvl: getGainTvlFunc(IGAIN_FANTOM_DAI_POOL_1, ChainId.FANTOM),
  },
  [IGAIN_FANTOM_USDT_POOL_1]: {
    icon: images.iconIgainLp,
    decimal: 6,
    getApr: getGainAprFunc(IGAIN_FANTOM_USDT_POOL_1, ChainId.FANTOM),
    getTvl: getGainTvlFunc(IGAIN_FANTOM_USDT_POOL_1, ChainId.FANTOM),
  },
  [IGAIN_FANTOM_ETH_POOL_1]: {
    icon: images.iconIgainLp,
    decimal: 18,
    getApr: getGainAprFunc(IGAIN_FANTOM_ETH_POOL_1, ChainId.FANTOM),
    getTvl: getGainTvlFunc(IGAIN_FANTOM_ETH_POOL_1, ChainId.FANTOM, 'ethereum'),
    tokenPriceKey: 'ethereum'
  },
}
