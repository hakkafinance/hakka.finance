/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { NetworkContextName } from '../../constants';
import useENSName from '../../hooks/useENSName';
import { useWalletModalToggle, useInfoModalToggle } from '../../state/application/hooks';
import { shortenAddress } from '../../utils';
import { MyButton } from '../../components/Common';
import WalletModal from '../WalletModal';
import InfoModal from '../InfoModal';
import CurrentNetwork from '../CurrentNetwork';
import images from '../../images';
import styles from './styles';

const Web3Status = ({ unsupported }: { unsupported?: boolean }) => {
  const { active, account } = useWeb3React();
  const contextNetwork = useWeb3React(NetworkContextName);
  const { ENSName } = useENSName(account ?? undefined);
  const toggleWalletModal = useWalletModalToggle();
  const toggleInfoModal = useInfoModalToggle();

  if (!contextNetwork.active && !active) {
    return null;
  }

  return (
    <>
      <div sx={styles.container}>
        <CurrentNetwork unsupported={unsupported} />
        <div sx={styles.accountContainer}>
          <div sx={styles.loginButtonWrapper}>
            <MyButton
              id={account ? 'web3-status-connected' : 'connect-wallet'}
              onClick={toggleWalletModal}
            >
              {account ? ENSName || shortenAddress(account) : 'Connect'}
            </MyButton>
          </div>
          <img onClick={toggleInfoModal} sx={styles.accountIconWrapper} src={images.iconAccount} alt="Account Icon" />
        </div>
      </div>

      <WalletModal
        ENSName={ENSName ?? undefined}
      />

      <InfoModal />
    </>
  );
};

export default Web3Status;
