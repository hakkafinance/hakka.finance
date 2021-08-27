import { BigNumber } from '@ethersproject/bignumber';
import { WeiPerEther, Zero } from '@ethersproject/constants';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import REWARD_ABI from '../constants/abis/staking_rewards.json';
import STAKING_ABI from '../constants/abis/shakka.json';
import { SHAKKA_POOL } from '../constants';
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
const bscProvider = new JsonRpcProvider(process.env.REACT_APP_BSC_NETWORK_URL);
// const bscMulticallProvider = new MulticallProvider(bscProvider, 56);

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
    .mul(WeiPerEther)
    .div(stakingRate);
}

export async function bscBhsApr(hakkaPrice: BigNumber): Promise<BigNumber> {
  return Promise.resolve(Zero);
}
