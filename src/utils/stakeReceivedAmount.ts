import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits } from 'ethers/lib/utils';

const THIRTY_MINS_FRACTIONS_OF_YEAR = 30/60/24/365.25;
const stakeFormula = 
  (amount: number, time: string, stakingRate: BigNumber): number => 
    amount * Math.pow(2, parseFloat(time)) * parseFloat(formatUnits(stakingRate, 18)) / 16;

export function stakeReceivedAmount(
    amount: string, 
    time: string, // the unit is year
    stakingRate?: BigNumber,
  ): string | undefined {
  if (!stakingRate) { 
    return undefined;
  }
  const receivedSHakkaAmount = stakeFormula(parseFloat(amount), time, stakingRate);
  return receivedSHakkaAmount.toFixed(4);
};

export function restakeReceivedAmount(
  index: number,
  amount: string, 
  time: string, // the unit is year
  stakingRate?: BigNumber,
  vault?: any,
): string[] | undefined[] {
if (!stakingRate || !vault) { 
  return [];
}
if (parseFloat(time) >  4 || parseFloat(time) < THIRTY_MINS_FRACTIONS_OF_YEAR) {
  return [];
}
const totalStakedHakka = parseFloat(formatUnits(vault[index].hakkaAmount, 18)) + parseFloat(amount);
const receivedSHakkaAmount = stakeFormula(totalStakedHakka, time, stakingRate);
const additionalSHakkaAmount = receivedSHakkaAmount - parseFloat(formatUnits(vault[index].wAmount, 18));
return [receivedSHakkaAmount.toFixed(4), additionalSHakkaAmount.toFixed(4)];
};