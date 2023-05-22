import { Network } from '@web3-react/network';
import invariant from 'tiny-invariant';
import { initializeConnector } from '@web3-react/core';
import { chainUrlMap } from '../constants/chainDetail';

export const [network, hook] = initializeConnector(
  (actions) => new Network({ actions, urlMap: chainUrlMap })
);
