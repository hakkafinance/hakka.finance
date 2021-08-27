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
  bscBhsApr,
} from '../../utils/rewardsApr';
import {
  balancer4tokenTvl,
  balancer2tokenTvl,
} from '../../utils/rewardsTvl';

export type PoolAssets = {
  icon: any;
  getApr: (...args: any[]) => Promise<BigNumber>;
  getTvl: (...args: any[]) => Promise<BigNumber>;
}

export const POOL_ASSETES: { [key: string]: PoolAssets } = {
  '0x6b1ecbbd69eeaf8d089bdce4daaa4165f8c3ff11': {
    icon: images.iconBHS,
    getApr: bhsApr,
    getTvl: (tokenPrice: any) => Promise.resolve(Zero),
  },
  '0x6EE6683Cb9b44810369C873679f8073bCBE52F27': {
    icon: images.icon4Tokens,
    getApr: balancer4tokenApr,
    getTvl: balancer4tokenTvl,
  },
  '0x3792ee68E736b8214D4eDC91b1B3340B525e00BF': {
    icon: images.icon2TokensCompHakka,
    getApr: balancer2tokenApr,
    getTvl: balancer2tokenTvl,
  },
  '0x3BD145F66203B19CE7BeDaAC9A8147E08EA64645': {
    icon: images.icon2TokensMkrHakka,
    getApr: mkrHakkaApr,
    getTvl: (tokenPrice: any) => Promise.resolve(Zero),
  },
  '0x0AA6C4Ff04e4E6512c5348f4B04685af2Cd11058': {
    icon: images.iconTFT,
    getApr: tftApr,
    getTvl: (tokenPrice: any) => Promise.resolve(Zero),
  },
  '0xF4D1F9674c8e9f29A69DC2E6f841292e675B7977': {
    icon: images.iconSealedHakka,
    getApr: sHakkaApr,
    getTvl: (tokenPrice: any) => Promise.resolve(Zero),
  },
  '0x79EB6F02E9aC26a6fbc4e73DEE0b8991D0c55F4a': {
    icon: images.iconBSC_BHS,
    getApr: bscBhsApr,
    getTvl: (tokenPrice: any) => Promise.resolve(Zero),
  },
}