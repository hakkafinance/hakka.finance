import MULTICALL_ABI from './abi.json';
import { ChainId } from '../index';

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441',
  [ChainId.KOVAN]: '0x2cc8688C5f75E365aaEEb4ea8D6a480405A48D2A',
};

export { MULTICALL_ABI, MULTICALL_NETWORKS };
