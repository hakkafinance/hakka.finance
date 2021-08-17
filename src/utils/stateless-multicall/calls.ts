import MULTICALL_ABI from '../../constants/multicall/abi.json';
import { Contract } from './contract';

export function getEthBalance(address: string, multicallAddress: string) {
  const multicall = new Contract(multicallAddress, MULTICALL_ABI);
  return multicall.getEthBalance(address);
}
