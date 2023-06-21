import { MetaMask as InjectedConnector } from '@web3-react/metamask';
import { initializeConnector } from '@web3-react/core';
export const [injected, injectedHooks] = initializeConnector(
  (actions) => new InjectedConnector({ actions, options: {} })
);
