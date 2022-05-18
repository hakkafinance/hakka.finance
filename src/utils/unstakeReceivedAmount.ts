import { formatUnits } from "ethers/lib/utils";

export function unstakeReceivedAmount(index: number, withdrawAmount: string, vault?: any): string | undefined {
  if(!(vault && vault.wAmount && vault.hakkaAmount)) {
    return undefined;
  }

  const totalSHakkaAmount = parseFloat(formatUnits(vault.wAmount, 18));
  const burnSHakkaAmount = parseFloat(withdrawAmount);
  if (burnSHakkaAmount > totalSHakkaAmount) {
    return undefined;
  }
  const receivedHakkaAmount = burnSHakkaAmount / totalSHakkaAmount * parseFloat(formatUnits(vault.hakkaAmount, 18))
  return receivedHakkaAmount.toFixed(4);
};




