import { Network } from '@web3-react/network';
import { initializeConnector } from '@web3-react/core';
import { CHAIN_URL_DICT, NETWORK_CHAIN_ID } from '../constants/chainDetail';

export const [network, networkHooks] = initializeConnector(
  (actions) => new Network({ actions, urlMap: CHAIN_URL_DICT, defaultChainId: NETWORK_CHAIN_ID })
);
