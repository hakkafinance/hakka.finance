import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits } from 'ethers/lib/utils';
import { ChainId, NEW_SHAKKA_ADDRESSES, SEC_OF_YEAR, STAKING_RATE_MODEL_RELEASE_TIME } from '../constants';

const THIRTY_MINS_FRACTIONS_OF_YEAR = 30/60/24/365.25;
const stakeFormula = 
  (amount: number, time: string, stakingRate: number): number => 
    amount * Math.pow(2, parseFloat(time)) * stakingRate / 16;

const getStakingRate = (contractReleaseDate: number) => {
  const timeElapsed = (Date.now() / 1000 - contractReleaseDate) / SEC_OF_YEAR;
  const rate = Math.pow(2, timeElapsed);
  return rate;
};

export function stakeReceivedAmount(
    amount: string, 
    time: string, // the unit is year
    chainId?: ChainId,
  ): string | undefined {
  if (!chainId) { 
    return undefined;
  }
  const stakingRate = getStakingRate(STAKING_RATE_MODEL_RELEASE_TIME[NEW_SHAKKA_ADDRESSES[chainId]]);
  const receivedSHakkaAmount = stakeFormula(parseFloat(amount), time, stakingRate);
  return receivedSHakkaAmount.toFixed(4);
};

export function restakeReceivedAmount(
  amount: string, 
  year: string, // the unit is year
  vault?: any,
  chainId?: ChainId,
): string[] | undefined[] {
if (!chainId || !vault) { 
  return [];
}
if (parseFloat(year) >  4 || parseFloat(year) < THIRTY_MINS_FRACTIONS_OF_YEAR) {
  return [];
}
const stakingRate = getStakingRate(STAKING_RATE_MODEL_RELEASE_TIME[NEW_SHAKKA_ADDRESSES[chainId]]);
const totalStakedHakka = parseFloat(formatUnits(vault.hakkaAmount, 18)) + parseFloat(amount);
const receivedSHakkaAmount = stakeFormula(totalStakedHakka, year, stakingRate);
const additionalSHakkaAmount = receivedSHakkaAmount - parseFloat(formatUnits(vault.wAmount, 18));
return [receivedSHakkaAmount.toFixed(4), additionalSHakkaAmount.toFixed(4)];
};