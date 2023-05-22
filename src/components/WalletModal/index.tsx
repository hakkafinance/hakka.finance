/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useEffect } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { UAuthConnector } from '@uauth/web3-react';
import { AbstractConnector } from '@web3-react/types';
import usePrevious from '../../hooks/usePrevious';
import {
  useWalletModalOpen,
  useWalletModalToggle,
} from '../../state/application/hooks';

import { fortmatic } from '../../connectors';
import { OVERLAY_READY } from '../../connectors/Fortmatic';
import images from '../../images';
import Modal from '../Modal';
import AccountDetails from '../AccountDetails';
import Option from './Option';
import { SUPPORTED_WALLETS } from '../../constants';
import styles from './styles';

const WALLET_VIEWS = {
  OPTIONS: 'options',
  OPTIONS_SECONDARY: 'options_secondary',
  ACCOUNT: 'account',
  PENDING: 'pending',
};

export default function WalletModal({ ENSName }: { ENSName?: string }) {
  // important that these are destructed from the account-specific web3-react context
  const { active, account, connector, activate, error } = useWeb3React();

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT);

  const walletModalOpen = useWalletModalOpen();
  const toggleWalletModal = useWalletModalToggle();

  const previousAccount = usePrevious(account);

  useEffect(() => {
    fortmatic.on(OVERLAY_READY, () => {
      toggleWalletModal();
    });
  }, [toggleWalletModal]);

  // close on connection, when logged out before
  useEffect(() => {
    if (
      error instanceof UnsupportedChainIdError ||
      (account && !previousAccount && walletModalOpen)
    ) {
      toggleWalletModal();
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen, error]);

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [walletModalOpen]);

  // close modal when a connection is successful
  const activePrevious = usePrevious(active);
  const connectorPrevious = usePrevious(connector);
  useEffect(() => {
    if (
      walletModalOpen &&
      ((active && !activePrevious) ||
        (connector && connector !== connectorPrevious && !error))
    ) {
      setWalletView(WALLET_VIEWS.ACCOUNT);
    }
  }, [
    setWalletView,
    active,
    error,
    connector,
    walletModalOpen,
    activePrevious,
    connectorPrevious,
  ]);

  const tryActivation = async (connector: AbstractConnector | undefined) => {
    setWalletView(WALLET_VIEWS.PENDING);
    console.log(connector);

    // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
    if (
      connector instanceof WalletConnectConnector &&
      connector.walletConnectProvider?.wc?.uri
    ) {
      connector.walletConnectProvider = undefined;
    }

    if (connector instanceof UAuthConnector) {
      toggleWalletModal();
    }

    connector &&
      activate(connector, undefined, true).catch((error) => {
        console.log(error);
        if (error instanceof UnsupportedChainIdError) {
          activate(connector);
        }
      });
  };

  // get wallets user can switch too, depending on device/browser
  function getOptions() {
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key];
      return (
        <Option
          id={`connect-${key}`}
          onClick={() => {
            window.localStorage.removeItem('username');
            option.connector === connector
              ? setWalletView(WALLET_VIEWS.ACCOUNT)
              : tryActivation(option.connector);
          }}
          key={key}
          header={option.name}
          icon={option.iconName}
        />
      );
    });
  }

  function getModalContent() {
    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <AccountDetails
          toggleWalletModal={toggleWalletModal}
          ENSName={ENSName}
          openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
        />
      );
    }
    return (
      <div sx={styles.upperSection}>
        <div sx={styles.illustration} />
        <div sx={styles.closeIcon} onClick={toggleWalletModal}>
          <img src={images.iconDeleteRound} />
        </div>
        {walletView !== WALLET_VIEWS.ACCOUNT ? (
          <div sx={styles.headerRow}>
            <div
              sx={styles.hoverText}
              onClick={() => {
                setWalletView(WALLET_VIEWS.ACCOUNT);
              }}
            >
              Back
            </div>
          </div>
        ) : (
          <div sx={styles.headerRow}>
            <div sx={styles.hoverText}>Connect to a wallet</div>
          </div>
        )}
        <div sx={styles.contentWrapper}>
          <div sx={styles.optionGrid}>{getOptions()}</div>
        </div>
      </div>
    );
  }

  return (
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal}>
      <div sx={styles.wrapper}>{getModalContent()}</div>
    </Modal>
  );
}
