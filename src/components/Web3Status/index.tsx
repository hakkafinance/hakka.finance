/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useWeb3React } from '@web3-react/core';
import React, { memo } from 'react';
import useENSName from '../../hooks/useENSName';
import useUnstoppableDomains from '../../hooks/useUnstoppableDomains';
import { useWalletModalToggle, useInfoModalToggle } from '../../state/application/hooks';
import { shortenAddress } from '../../utils';
import { MyButton } from '../../components/Common';
import WalletModal from '../WalletModal';
import InfoModal from '../InfoModal';
import CurrentNetwork from '../CurrentNetwork';
import images from '../../images';
import styles from './styles';
import PlayToEarnLevelUpModal from '../PlayToEarnLevelUpModal';
import { CHAIN_URL_MAP } from '../../constants/chainDetail';

const Web3Status = ({ unsupported }: { unsupported?: boolean }) => {
  const { isActive: active, account, chainId } = useWeb3React();
  const { ENSName } = useENSName(account ?? undefined);
  const { unstoppableDomain } = useUnstoppableDomains(account ?? undefined);
  const toggleWalletModal = useWalletModalToggle();
  const toggleInfoModal = useInfoModalToggle();

  const isUnsupportedChainError = !CHAIN_URL_MAP.has(chainId || -1);

  if (!active) {
    return null;
  }

  return (
    <div>
      <div sx={styles.container}>
        <CurrentNetwork unsupported={unsupported} />
        <div sx={styles.accountContainer}>
          <div sx={styles.loginButtonWrapper}>
            <MyButton
              id={account ? 'web3-status-connected' : 'connect-wallet'}
              onClick={toggleWalletModal}
              disabled={isUnsupportedChainError}
            >
              {account ? ENSName || unstoppableDomain || shortenAddress(account) : 'Connect'}
            </MyButton>
          </div>
          <img onClick={toggleInfoModal} sx={styles.accountIconWrapper} src={images.iconAccount} alt="Account Icon" />
        </div>
      </div>

      <WalletModal
        ENSName={ENSName || unstoppableDomain || undefined}
      />

      <InfoModal />
    </div>
  );
};

export default memo(Web3Status);
