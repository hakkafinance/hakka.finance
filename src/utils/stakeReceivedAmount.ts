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
  account: string,
  stakingRate?: BigNumber,
  vaults?: any,
): string[] | undefined[] {
if (!stakingRate || !vaults) { 
  return [];
}
if (parseFloat(time) >  4 || parseFloat(time) < 30/60/24/360) {
  return [];
}
const vault = vaults[account][index];
const receivedSHakkaAmount = 
  (parseFloat(formatUnits(vault.hakkaAmount, 18)) + parseFloat(amount)) * Math.pow(2, parseFloat(time)) * parseFloat(formatUnits(stakingRate, 18)) / 16;
const additionalSHakkaAmount = receivedSHakkaAmount - parseFloat(formatUnits(vault.wAmount, 18));
return [receivedSHakkaAmount.toFixed(4), additionalSHakkaAmount.toFixed(4)];
};