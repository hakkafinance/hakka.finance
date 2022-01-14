import { BigNumber } from '@ethersproject/bignumber';
import { WeiPerEther, Zero } from '@ethersproject/constants';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import REWARD_ABI from '../constants/abis/staking_rewards.json';
import STAKING_ABI from '../constants/abis/shakka.json';
import IGAIN_ABI from '../constants/abis/iGainV1.json';
import { SHAKKA_POOL, ChainId } from '../constants';
import { REWARD_POOLS } from '../constants/rewards';
import {
  Contract as MulticallContract,
  Provider as MulticallProvider,
} from './stateless-multicall'

const SECONDS_IN_YEAR = BigNumber.from(
  (365.25 * 24 * 60 * 60).toString(),
);

const ethProvider = new JsonRpcProvider(process.env.REACT_APP_NETWORK_URL);
const ethMulticallProvider = new MulticallProvider(ethProvider, 1);

const getKovanMulticallProvider = () => {
  if(process.env.NODE_ENV !== 'development'){
    return null;
  }
  const kovanProvider = new JsonRpcProvider(process.env.REACT_APP_KOVAN_NETWORK_URL);
  return new MulticallProvider(kovanProvider, ChainId.KOVAN);
}
const kovanMulticallProvider = getKovanMulticallProvider();
const bscProvider = new JsonRpcProvider(process.env.REACT_APP_BSC_NETWORK_URL);
const polygonProvider = new JsonRpcProvider(process.env.REACT_APP_POLYGON_NETWORK_URL)
const bscMulticallProvider = new MulticallProvider(bscProvider, ChainId.BSC);
const polygonMulticallProvider = new MulticallProvider(polygonProvider, ChainId.POLYGON);

export async function bhsApr(hakkaPrice: BigNumber): Promise<BigNumber> {
  return Promise.resolve(Zero);
}

export async function balancer4tokenApr(hakkaPrice: BigNumber): Promise<BigNumber> { // BHS/USDC/DAI/HAKKA
  return Promise.resolve(Zero);
}

export async function balancer2tokenApr(hakkaPrice: BigNumber): Promise<BigNumber> { // BHS/HAKKA
  return Promise.resolve(Zero);
}

export async function mkrHakkaApr(hakkaPrice: BigNumber): Promise<BigNumber> { // Uniswap MKR-HAKKA
  return Promise.resolve(Zero);
}

export async function tftApr(hakkaPrice: BigNumber): Promise<BigNumber> { // 3fmutual
  return Promise.resolve(Zero);
}

export async function sHakkaApr(hakkaPrice: BigNumber): Promise<BigNumber> {
  const now = Math.round(Date.now() / 1000);
  const rewardsContract = new MulticallContract(REWARD_POOLS[SHAKKA_POOL].rewardsAddress, REWARD_ABI);
  const staking = new Contract(REWARD_POOLS[SHAKKA_POOL].tokenAddress, STAKING_ABI, ethProvider);

  const stakingRate = await staking.callStatic.getStakingRate(12 * 60 * 60 * 24 * 30);
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

export function getGainAprFunc(iGainAddress: string): (hakkaPrice: BigNumber) => Promise<BigNumber> {
  const now = Math.round(Date.now() / 1000);
  return async function (hakkaPrice: BigNumber): Promise<BigNumber> {
    const rewardsContract = new MulticallContract(REWARD_POOLS[iGainAddress].rewardsAddress, REWARD_ABI); // farm address
    const igainContract = new MulticallContract(REWARD_POOLS[iGainAddress].tokenAddress, IGAIN_ABI); // igain lp address

    const [stakedTotalSupply, rewardRate, periodFinish, poolA, poolB, totalSupply] = await bscMulticallProvider.all([
      rewardsContract.totalSupply(),
      rewardsContract.rewardRate(),
      rewardsContract.periodFinish(),
      igainContract.poolA(),
      igainContract.poolB(),
      igainContract.totalSupply(),
    ]);
    const perLpPrice = poolA.mul(poolB).mul(BigNumber.from(2)).div(poolA.add(poolB)).mul(WeiPerEther).div(totalSupply);

    const stakedTotalValue = perLpPrice.mul(stakedTotalSupply).div(WeiPerEther);
    if (periodFinish.lt(now)) {
      return Zero;
    }

    const yearlyUsdRewards = rewardRate.mul(SECONDS_IN_YEAR).mul(hakkaPrice);
    return yearlyUsdRewards
      .div(stakedTotalValue)
  }
}

export async function bscBhsApr(hakkaPrice: BigNumber): Promise<BigNumber> {
  return Promise.resolve(Zero);
}
