import MULTICALL_ABI from './abi.json';
import { ChainId } from '../index';

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.KOVAN]: '0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A',
  [ChainId.BSC]: '0x1ee38d535d541c55c9dae27b12edf090c608e6fb',
  [ChainId.POLYGON]: '0xc4f1501f337079077842343Ce02665D8960150B0',
};

export { MULTICALL_ABI, MULTICALL_NETWORKS };
