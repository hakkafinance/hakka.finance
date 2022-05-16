import { formatUnits } from "ethers/lib/utils";

export function unstakeReceivedAmount(index: number, withdrawAmount: string, vault?: any): string | undefined {
  if(!vault) {
    return undefined;
  }
  const totalSHakkaAmount = parseFloat(formatUnits(vault[index].wAmount, 18));
  const burnSHakkaAmount = parseFloat(withdrawAmount);
  if (burnSHakkaAmount > totalSHakkaAmount) {
    return undefined;
  }
  const receivedHakkaAmount = burnSHakkaAmount / totalSHakkaAmount * parseFloat(formatUnits(vault[index].hakkaAmount, 18))
  return receivedHakkaAmount.toFixed(4);
};




