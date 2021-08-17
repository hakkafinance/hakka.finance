import { BigNumber } from '@ethersproject/bignumber';
import { WeiPerEther, Zero } from '@ethersproject/constants';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import REWARD_ABI from '../constants/abis/staking_rewards.json';
import BPT_ABI from '../constants/abis/bpt.json';
import LP_REWARD_VESTING_ABI from '../constants/abis/lp_reward_vesting.json';
import STAKING_ABI from '../constants/abis/shakka.json';
import { HAKKA, ChainId, REWARD_POOLS, BSC_REWARD_POOLS } from '../constants';
import {
  Contract as MulticallContract,
  Provider as MulticallProvider,
} from './stateless-multicall'

const DAI_ADDRESS = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const BHS_ADDRESS = '0x35101c731b1548B5e48bb23F99eDBc2f5c341935';

const SECONDS_IN_YEAR = BigNumber.from(
  (365.25 * 24 * 60 * 60).toString(),
);

const ethProvider = new JsonRpcProvider(process.env.REACT_APP_NETWORK_URL);
const ethMulticallProvider = new MulticallProvider(ethProvider, 1);
const bscProvider = new JsonRpcProvider(process.env.REACT_APP_BSC_NETWORK_URL);
const bscMulticallProvider = new MulticallProvider(bscProvider, 56);

export async function bhsApy(hakkaPrice: BigNumber): Promise<BigNumber> {
  return Promise.resolve(Zero);
}

export async function balancer4tokenApy(hakkaPrice: BigNumber): Promise<BigNumber> { // BHS/USDC/DAI/HAKKA
  const now = Math.round(Date.now() / 1000);
  const rewardsContract = new MulticallContract(REWARD_POOLS['0x6EE6683Cb9b44810369C873679f8073bCBE52F27'].rewardsAddress, REWARD_ABI);
  const poolContract = new MulticallContract(REWARD_POOLS['0x6EE6683Cb9b44810369C873679f8073bCBE52F27'].tokenAddress, BPT_ABI);
  const [
    bhsBalance,
    daiBalance,
    usdcBalance,
    hakkaBalance,
    poolTotalSupply,
    stakedTotalSupply,
    rewardRate,
    periodFinish,
  ] = await ethMulticallProvider.all([
    poolContract.getBalance(BHS_ADDRESS),
    poolContract.getBalance(DAI_ADDRESS),
    poolContract.getBalance(USDC_ADDRESS),
    poolContract.getBalance(HAKKA[ChainId.MAINNET].address),
    poolContract.totalSupply(),
    rewardsContract.totalSupply(),
    rewardsContract.rewardRate(),
    rewardsContract.periodFinish(),
  ])

  if (periodFinish.lt(now)) {
    return Zero;
  }

  const totalLiquidity = bhsBalance
    .add(daiBalance)
    .add(usdcBalance)
    .add(hakkaBalance.mul(hakkaPrice).div(WeiPerEther));

  const stakedLiquidity = totalLiquidity
    .mul(stakedTotalSupply)
    .div(poolTotalSupply);

  const yearlyRewards = rewardRate
    .mul(hakkaPrice)
    .mul(SECONDS_IN_YEAR)
    .div(WeiPerEther);

  return yearlyRewards.mul(WeiPerEther).div(stakedLiquidity);
}

export async function balancer2tokenApy(hakkaPrice: BigNumber): Promise<BigNumber> { // BHS/HAKKA
  const now = Math.round(Date.now() / 1000);
  const rewardsContract = new MulticallContract(REWARD_POOLS['0x3792ee68E736b8214D4eDC91b1B3340B525e00BF'].rewardsAddress, REWARD_ABI);
  const poolContract = new MulticallContract(REWARD_POOLS['0x3792ee68E736b8214D4eDC91b1B3340B525e00BF'].tokenAddress, BPT_ABI);

  const [
    bhsBalance,
    hakkaBalance,
    poolTotalSupply,
    stakedTotalSupply,
    rewardRate,
    periodFinish,
  ] = await ethMulticallProvider.all([
    poolContract.getBalance(BHS_ADDRESS),
    poolContract.getBalance(HAKKA[ChainId.MAINNET].address),
    poolContract.totalSupply(),
    rewardsContract.totalSupply(),
    rewardsContract.rewardRate(),
    rewardsContract.periodFinish(),
  ]);

  if (periodFinish.lt(now)) {
    return Zero;
  }

  const totalLiquidity = bhsBalance.add(
    hakkaBalance.mul(hakkaPrice).div(WeiPerEther),
  );

  const stakedLiquidity = totalLiquidity
    .mul(stakedTotalSupply)
    .div(poolTotalSupply);

  const yearlyRewards = rewardRate
    .mul(hakkaPrice)
    .mul(SECONDS_IN_YEAR)
    .div(WeiPerEther);

  return yearlyRewards.mul(WeiPerEther).div(stakedLiquidity);
}

export async function mkrHakkaApy(hakkaPrice: BigNumber): Promise<BigNumber> { // Uniswap MKR-HAKKA
  return Promise.resolve(Zero);
}

export async function tftApy(hakkaPrice: BigNumber): Promise<BigNumber> { // 3fmutual
  return Promise.resolve(Zero);
}

export async function sHakkaApy(hakkaPrice: BigNumber): Promise<BigNumber> {
  const now = Math.round(Date.now() / 1000);
  const rewardsContract = new MulticallContract(REWARD_POOLS['0xF4D1F9674c8e9f29A69DC2E6f841292e675B7977'].rewardsAddress, REWARD_ABI);
  const staking = new Contract(REWARD_POOLS['0xF4D1F9674c8e9f29A69DC2E6f841292e675B7977'].tokenAddress, STAKING_ABI, ethProvider);

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

export async function bscBhsApy(hakkaPrice: BigNumber): Promise<BigNumber> { 
  const now = Math.round(Date.now() / 1000);
  const rewardsContract = new MulticallContract(
    BSC_REWARD_POOLS['0x79EB6F02E9aC26a6fbc4e73DEE0b8991D0c55F4a'].rewardsAddress,
    LP_REWARD_VESTING_ABI,
  );

  const [stakedTotalSupply, rewardRate, periodFinish] = await bscMulticallProvider.all([
    rewardsContract.totalSupply(),
    rewardsContract.rewardRate(),
    rewardsContract.periodFinish(),
  ]);

  if (periodFinish.lt(now)) {
    return Zero;
  }

  const yearlyRewards = rewardRate
    .mul(hakkaPrice)
    .mul(SECONDS_IN_YEAR)
    .div(WeiPerEther);

  return yearlyRewards
    .mul(WeiPerEther)
    .div(stakedTotalSupply);
}
