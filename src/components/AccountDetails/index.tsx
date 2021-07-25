/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react';
import { useActiveWeb3React } from '../../hooks';
import { shortenAddress } from '../../utils';
import Copy from './Copy';

import { SUPPORTED_WALLETS } from '../../constants';
import images from '../../../src/images';
import { getEtherscanLink } from '../../utils';
import {
  injected,
  walletlink,
} from '../../connectors';
import MyButton from '..//Common/MyButton'
import { ExternalLink as LinkIcon } from 'react-feather';
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
        (k) =>
          SUPPORTED_WALLETS[k].connector === connector &&
          (connector !== injected || isMetaMask === (k === 'METAMASK'))
      )
      .map((k) => SUPPORTED_WALLETS[k].name)[0];
    return <div sx={styles.walletName}>Connected with {connector === injected && isMetaMask ? 'MetaMask' : name}</div>;
  }

  return (
    <>
      <div sx={styles.upperSection}>
        <div sx={styles.closeIcon} onClick={toggleWalletModal}>
          <img src={images.iconDeleteRound} />
        </div>
        <div sx={styles.headerRow}>Account</div>
        <div sx={styles.accountSection}>
          <div sx={styles.yourAccount}>
            <div sx={styles.infoCard}>
              <div sx={styles.accountGroupingRow}>
                {formatConnectorName()}
                <div>
                  {connector !== injected && connector !== walletlink ? (
                    <MyButton
                      style={{
                        fontSize: '.825rem',
                        fontWeight: 400,
                        marginRight: '8px',
                      }}
                      click={() => {
                        (connector as any).close();
                      }}
                    >
                      Disconnect
                    </MyButton>
                  ) : (
                  <MyButton
                    style={{ fontSize: '.825rem', fontWeight: 400 }}
                    click={() => {
                      openOptions();
                    }}
                  >
                    Change
                  </MyButton>
                  )}
                </div>
              </div>
              <div sx={styles.accountGroupingRow} id="web3-account-identifier-row">
                <div sx={styles.accountControl}>
                  <p> {ENSName || account && shortenAddress(account)}</p>
                </div>
              </div>
              <div sx={styles.accountGroupingRow}>
                <div sx={styles.accountControl}>
                  <div>
                    {account && (
                      <Copy toCopy={account}>
                        <span style={{ marginLeft: '4px' }}>
                          Copy Address
                        </span>
                      </Copy>
                    )}
                    {chainId && account && (
                      <a
                        sx={styles.addressLink}
                        target='_blank'
                        href={getEtherscanLink(chainId, account, 'address')}
                      >
                        <LinkIcon size={16} />
                        <span style={{ marginLeft: '4px' }}>
                          View on Etherscan
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
