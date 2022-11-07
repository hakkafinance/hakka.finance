/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react'
import { useWeb3React } from '@web3-react/core';
import { MyButton } from '../Common';
import styles from './styles';
import withConnectWalletCheckWrapper from '../../hoc/withConnectWalletCheckWrapper';
import { useWalletModalToggle } from '../../state/application/hooks';
import Web3Status from '../Web3Status';
import { navigate } from 'gatsby';

const StartButton = withConnectWalletCheckWrapper(MyButton);

const ChallengeIntroPage = () => {
  const { account } = useWeb3React();
  const toggleWalletModal = useWalletModalToggle();
  return (
    <div sx={styles.container}>
      <div sx={styles.challengePageWrapper}>
        <div sx={styles.header}>
          <p>Play To Earn</p>
          <Web3Status />
        </div>
        <div>
          <div sx={styles.introGraphWrapper}>
            <h4>Let's Play To Earn!</h4>
            <p>A fantastic journey to become the best DeFi Master of the Galaxy is awaiting you, young Hakka Farmer!
              Level up and learn how to make money in DeFi & win NFTs by completing simple missions with Hakka Finance!</p>
          </div>
          <div sx={styles.startBtnWrapper}>
            <div sx={styles.startBtn}>
              <StartButton
                onClick={() => navigate(`/play2earn`)} 
                styleKit='green'
                isConnected={!!account}
                connectWallet={toggleWalletModal}
              >
                START NOW
              </StartButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChallengeIntroPage