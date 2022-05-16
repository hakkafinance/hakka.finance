import { formatUnits } from "ethers/lib/utils";

export function unstakeReceivedAmount(index: number, account: string, withdrawAmount: string, vaults?: any): string | undefined {
  if(!vaults) {
    return undefined;
  }
  const vault = vaults[account][index];
  const totalSHakkaAmount = parseFloat(formatUnits(vault.wAmount, 18));
  const burnSHakkaAmount = parseFloat(withdrawAmount);
  if (burnSHakkaAmount > totalSHakkaAmount) {
    return undefined;
  }
  const receivedHakkaAmount = burnSHakkaAmount / totalSHakkaAmount * parseFloat(formatUnits(vault.hakkaAmount, 18))
  return receivedHakkaAmount.toFixed(4);
};




