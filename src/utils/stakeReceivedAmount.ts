import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits } from "ethers/lib/utils";

export function stakeReceivedAmount(
    amount: string, 
    time: string, // the unit is year
    stakingRate?: BigNumber,
  ): string | undefined {
  if (!stakingRate) { 
    return undefined;
  }
  const receivedSHakkaAmount = parseFloat(amount) * Math.pow(2, parseFloat(time)) * parseFloat(formatUnits(stakingRate, 18)) / 16;
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
if (parseFloat(time) >  4 || parseFloat(time) < 30/60/24/360) {
  return [];
}
const receivedSHakkaAmount = 
  (parseFloat(formatUnits(vault[index].hakkaAmount, 18)) + parseFloat(amount)) * Math.pow(2, parseFloat(time)) * parseFloat(formatUnits(stakingRate, 18)) / 16;
const additionalSHakkaAmount = receivedSHakkaAmount - parseFloat(formatUnits(vault[index].wAmount, 18));
return [receivedSHakkaAmount.toFixed(4), additionalSHakkaAmount.toFixed(4)];
};