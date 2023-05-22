import { initializeConnector } from '@web3-react/core';
import { WalletConnect as WalletConnectV2Connector } from '@web3-react/walletconnect-v2';
import { chainUrlMap } from '../constants/chainDetail';

export const walletconnect = initializeConnector(
  (actions) =>
    new WalletConnectV2Connector({
      actions,
      options: {
        showQrModal: true,
        projectId: '',
        chains: [1, 56, 137, 250],
        rpcMap: chainUrlMap,
      },
    })
);
