import { formatUnits, parseUnits } from 'ethers/lib/utils';
import { ChainId, NEW_SHAKKA_ADDRESSES, SEC_OF_YEAR, STAKING_RATE_MODEL_RELEASE_TIME } from '../constants';

const THIRTY_MINS_FRACTIONS_OF_YEAR = 30 / 60 / 24 / 365.25;
const stakeFormula =
  (amount: number, time: string, stakingRate: number): number =>
    amount * getFinalStakingRate(time, stakingRate);

export const getFinalStakingRate = (time: string, startStakingRate: number): number => Math.pow(2, parseFloat(time)) * startStakingRate / 16;

export const getStartStakingRate = (contractReleaseDate: number) => {
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
  const stakingRate = getStartStakingRate(STAKING_RATE_MODEL_RELEASE_TIME[NEW_SHAKKA_ADDRESSES[chainId]]);
  const receivedSHakkaAmount = stakeFormula(parseFloat(amount), time, stakingRate);
  return receivedSHakkaAmount.toFixed(4);
};

export function restakeReceivedAmount(
  amount: string,
  time: string, // the unit is year
  vault?: any,
  chainId?: ChainId,
): string[] | undefined[] {
  if (!chainId || !vault) {
    return [];
  }
  if (parseFloat(time) > 4 || parseFloat(time) < THIRTY_MINS_FRACTIONS_OF_YEAR) {
    return [];
  }
  const stakingRate = getStartStakingRate(STAKING_RATE_MODEL_RELEASE_TIME[NEW_SHAKKA_ADDRESSES[chainId]]);
  const totalStakedHakka = parseFloat(formatUnits(vault.hakkaAmount, 18)) + parseFloat(amount);
  const receivedSHakkaAmount = stakeFormula(totalStakedHakka, time, stakingRate);
  const additionalSHakkaAmount = parseUnits(receivedSHakkaAmount.toString(), 18).sub(vault.wAmount);
  return [receivedSHakkaAmount.toFixed(4), (Math.floor(parseFloat(formatUnits(additionalSHakkaAmount, 18)) * 10000) / 10000).toString()];
};