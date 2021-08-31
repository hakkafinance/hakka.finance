/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { useActiveWeb3React } from '../../hooks/web3Manager';
import { shortenAddress } from '../../utils';
import Copy from './Copy';

import { SUPPORTED_WALLETS } from '../../constants';
import images from '../../../src/images';
import CurrentNetwork from '../CurrentNetwork';
import {
  injected,
  walletlink,
} from '../../connectors';
import { MyButton } from '../Common';
import styles from './styles';

interface AccountDetailsProps {
  toggleWalletModal: () => void;
  pendingTransactions: string[];
  confirmedTransactions: string[];
  ENSName?: string;
  openOptions: () => void;
}

export default function AccountDetails({
  toggleWalletModal,
  ENSName,
  openOptions,
}: AccountDetailsProps) {
  const { chainId, account, connector } = useActiveWeb3React();

  function formatConnectorName() {
    const { ethereum } = window;
    const isMetaMask = !!(ethereum && ethereum.isMetaMask);
    const name = Object.keys(SUPPORTED_WALLETS)
      .filter(
        (k) => SUPPORTED_WALLETS[k].connector === connector
          && (connector !== injected || isMetaMask === (k === 'METAMASK')),
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0];
    return (
      <div sx={styles.walletName}>
        {'Connected with '}
        {connector === injected && isMetaMask ? 'MetaMask' : name}
      </div>
    );
  }

  return (
    <>
      <div sx={styles.upperSection}>
        <div sx={styles.illustration} />
        <div sx={styles.closeIcon} onClick={toggleWalletModal}>
          <img src={images.iconDeleteRound} />
        </div>
        <div sx={styles.headerRow}>Account</div>
        <div sx={styles.accountSection}>
          <div sx={styles.yourAccount}>
            <div sx={styles.infoCard}>
              <div sx={styles.accountGroupingRow}>
                {formatConnectorName()}
              </div>
              <div sx={styles.accountGroupingRow} id="web3-account-identifier-row">
                <div sx={styles.accountControl}>
                  <p>
                    {' '}
                    {ENSName || account && shortenAddress(account)}
                  </p>
                </div>
                {account && (
                <Copy toCopy={account}>
                  <span style={{ marginLeft: '4px' }}>
                    Copy
                  </span>
                </Copy>
                )}
              </div>
              <div sx={styles.accountGroupingRow}>
                <div sx={styles.network}>Network:</div>
                <CurrentNetwork />
              </div>
              <div sx={styles.buttonSection}>
                {connector !== injected && connector !== walletlink ? (
                  <MyButton
                    onClick={() => {
                      (connector as any).close();
                    }}
                  >
                    Disconnect
                  </MyButton>
                ) : (
                  <MyButton
                    onClick={() => {
                      openOptions();
                    }}
                  >
                    Change
                  </MyButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
