import { BigNumber } from '@ethersproject/bignumber';
import { WeiPerEther, Zero } from '@ethersproject/constants';
import { parseUnits } from '@ethersproject/units';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import REWARD_ABI from '../constants/abis/staking_rewards.json';
import STAKING_V1_ABI from '../constants/abis/shakka_v1.json';
import IGAIN_ABI from '../constants/abis/iGainV1.json';
import { SHAKKA_POOL, ChainId, NEW_SHAKKA_ADDRESSES, STAKING_RATE_MODEL_RELEASE_TIME, SHAKKA_POOLS } from '../constants';
import { REWARD_POOLS } from '../constants/rewards';
import {
  Contract as MulticallContract,
  Provider as MulticallProvider,
} from '@pelith/ethers-multicall';
import { getFinalStakingRate, getStartStakingRate } from './stakeReceivedAmount';
import { transferToYear } from '.';

const SECONDS_IN_YEAR = BigNumber.from(
  (365.25 * 24 * 60 * 60).toString(),
);

const ethProvider = new JsonRpcProvider(process.env.GATSBY_NETWORK_URL);
const ethMulticallProvider = new MulticallProvider(ethProvider, 1);

const getKovanMulticallProvider = () => {
  if (process.env.GATSBY_ENV !== 'development') {
    return null;
  }
  const kovanProvider = new JsonRpcProvider(process.env.GATSBY_KOVAN_NETWORK_URL);
  return new MulticallProvider(kovanProvider, ChainId.KOVAN);
};
const kovanMulticallProvider = getKovanMulticallProvider();
const bscProvider = new JsonRpcProvider(process.env.GATSBY_BSC_NETWORK_URL);
const polygonProvider = new JsonRpcProvider(process.env.GATSBY_POLYGON_NETWORK_URL);
const fantomProvider = new JsonRpcProvider(process.env.GATSBY_FANTOM_NETWORK_URL);
const bscMulticallProvider = new MulticallProvider(bscProvider, ChainId.BSC);
const polygonMulticallProvider = new MulticallProvider(polygonProvider, ChainId.POLYGON);
const fantomMulticallProvider = new MulticallProvider(fantomProvider, ChainId.FANTOM);

export async function bhsApr (hakkaPrice: BigNumber): Promise<BigNumber> {
  return Promise.resolve(Zero);
}

export async function balancer4tokenApr (hakkaPrice: BigNumber): Promise<BigNumber> { // BHS/USDC/DAI/HAKKA
  return Promise.resolve(Zero);
}

export async function balancer2tokenApr (hakkaPrice: BigNumber): Promise<BigNumber> { // BHS/HAKKA
  return Promise.resolve(Zero);
}

export async function mkrHakkaApr (hakkaPrice: BigNumber): Promise<BigNumber> { // Uniswap MKR-HAKKA
  return Promise.resolve(Zero);
}

export async function tftApr (hakkaPrice: BigNumber): Promise<BigNumber> { // 3fmutual
  return Promise.resolve(Zero);
}

export async function sHakkaApr (hakkaPrice: BigNumber): Promise<BigNumber> {
  const now = Math.round(Date.now() / 1000);
  const rewardsContract = new MulticallContract(REWARD_POOLS[SHAKKA_POOL].rewardsAddress, REWARD_ABI);

  const stakingRate = BigNumber.from('2218000000000000000')
  const [stakedTotalSupply, rewardRate, periodFinish] = await ethMulticallProvider.all([
    rewardsContract.totalSupply(),
    rewardsContract.rewardRate(),
    rewardsContract.periodFinish(),
  ]);

  if (periodFinish.lt(now)) {
    return Zero;
  }

  const yearlyRewards = rewardRate.mul(SECONDS_IN_YEAR);
  return yearlyRewards
    .mul(WeiPerEther)
    .div(stakedTotalSupply)
    .mul(stakingRate)
    .div(WeiPerEther);
}

export function sHakkaV2Apr(chainId: ChainId): () => Promise<BigNumber> {
  const now = Math.round(Date.now() / 1000);
  return async function (): Promise<BigNumber> {
    const rewardsContract = new MulticallContract(REWARD_POOLS[SHAKKA_POOLS[chainId]!].rewardsAddress, REWARD_ABI);
    const initStakingRate = getStartStakingRate(STAKING_RATE_MODEL_RELEASE_TIME[NEW_SHAKKA_ADDRESSES[chainId]]);
    const finalStakingRate = getFinalStakingRate(transferToYear(126230400), initStakingRate) // 126230400 = 365.25 * 60 * 60 * 24 * 4
    const finalStakingBN = parseUnits(finalStakingRate.toString(), 18)
    const multicallProvider = chainId === ChainId.BSC
      ? bscMulticallProvider
      : chainId === ChainId.POLYGON
        ? polygonMulticallProvider
        : chainId === ChainId.FANTOM ? fantomMulticallProvider : ethMulticallProvider;

    const [stakedTotalSupply, rewardRate, periodFinish] = await multicallProvider.all([
      rewardsContract.totalSupply(),
      rewardsContract.rewardRate(),
      rewardsContract.periodFinish(),
    ]);

    if (periodFinish.lt(now)) {
      return Zero;
    }

    const yearlyRewards = rewardRate.mul(SECONDS_IN_YEAR);
    return yearlyRewards
      .mul(WeiPerEther)
      .div(stakedTotalSupply)
      .mul(finalStakingBN)
      .div(WeiPerEther);
  }
}

export function getGainAprFunc (iGainAddress: string, chainId: ChainId): (hakkaPrice: BigNumber, tokenPrice: number) => Promise<BigNumber> {
  const now = Math.round(Date.now() / 1000);
  return async function (hakkaPrice: BigNumber, tokenPrice: number): Promise<BigNumber> {
    const rewardsContract = new MulticallContract(REWARD_POOLS[iGainAddress].rewardsAddress, REWARD_ABI); // farm address
    const igainContract = new MulticallContract(REWARD_POOLS[iGainAddress].tokenAddress, IGAIN_ABI); // igain lp address
    const multicallProvider = chainId === ChainId.BSC
      ? bscMulticallProvider
      : chainId === ChainId.POLYGON
        ? polygonMulticallProvider
        : chainId === ChainId.FANTOM ? fantomMulticallProvider : ethMulticallProvider;

    const [stakedTotalSupply, rewardRate, periodFinish, poolA, poolB, totalSupply, decimals] = await multicallProvider.all([
      rewardsContract.totalSupply(),
      rewardsContract.rewardRate(),
      rewardsContract.periodFinish(),
      igainContract.poolA(),
      igainContract.poolB(),
      igainContract.totalSupply(),
      igainContract.decimals(),
    ]);
    const decimalBNUnit = parseUnits('1', decimals);
    const perLpPrice = poolA.mul(poolB).mul(BigNumber.from(2)).div(poolA.add(poolB)).mul(decimalBNUnit).div(totalSupply);

    const stakedTotalValue = perLpPrice.mul(stakedTotalSupply.isZero() ? perLpPrice : stakedTotalSupply).div(decimalBNUnit);
    if (periodFinish.lt(now)) {
      return Zero;
    }
    const tokenPriceMultiplier = parseUnits(tokenPrice.toFixed(4), decimals);
    const yearlyUsdRewards = rewardRate.mul(SECONDS_IN_YEAR).mul(hakkaPrice).div(WeiPerEther);
    return yearlyUsdRewards.mul(decimalBNUnit).div(stakedTotalValue.mul(tokenPriceMultiplier).div(decimalBNUnit));
  };
}

export async function bscBhsApr (hakkaPrice: BigNumber): Promise<BigNumber> {
  return Promise.resolve(Zero);
}
