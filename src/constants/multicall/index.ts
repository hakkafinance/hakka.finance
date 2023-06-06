import MULTICALL_ABI from './abi.json';
import { ChainId } from '../index';

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.BSC]: '0x1ee38d535d541c55c9dae27b12edf090c608e6fb',
  [ChainId.POLYGON]: '0xc4f1501f337079077842343Ce02665D8960150B0',
  [ChainId.FANTOM]: '0x0118EF741097D0d3cc88e46233Da1e407d9ac139',
};

export { MULTICALL_ABI, MULTICALL_NETWORKS };
