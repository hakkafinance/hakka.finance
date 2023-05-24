import { initializeConnector } from '@web3-react/core';
import { WalletConnect as WalletConnectV2Connector } from '@web3-react/walletconnect-v2';
import { CHAIN_URL_DICT } from '../constants/chainDetail';

export const [walletconnect, walletconnectHooks] = initializeConnector(
  (actions) =>
    new WalletConnectV2Connector({
      actions,
      options: {
        showQrModal: true,
        projectId: 'c82527cbd9ee2f437a0c8e237cb5f9ce',
        chains: [1, 56, 137, 250],
        rpcMap: CHAIN_URL_DICT,
      },
    })
);
