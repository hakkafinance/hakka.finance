/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import _omit from 'lodash/omit';
import { MyButton } from '../Common';
import styles from './styles';
import withConnectWalletCheckWrapper from '../../hoc/withConnectWalletCheckWrapper';
import { useWalletModalToggle } from '../../state/application/hooks';
import Web3Status from '../Web3Status';
import { navigate } from 'gatsby';
import withWrongNetworkCheckWrapper from '../../hoc/withWrongNetworkCheckWrapper';
import { ChainId, ChainNameWithIcon } from '../../constants';

const StartButton = withWrongNetworkCheckWrapper(withConnectWalletCheckWrapper(MyButton));

const ChallengeIntroPage = () => {
  const { account, chainId, error } = useWeb3React();
  const toggleWalletModal = useWalletModalToggle();
  const isConnected = !!account || error instanceof UnsupportedChainIdError;
  const supportedChain = Object.keys(_omit(ChainNameWithIcon, [ChainId.KOVAN, ChainId.RINKEBY])).map((ele) => parseInt(ele));
  const isCorrectNetwork = chainId ? supportedChain.includes(chainId) : false;

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
                isConnected={isConnected}
                connectWallet={toggleWalletModal}
                isCorrectNetwork={isCorrectNetwork}
                targetNetwork={ChainId.POLYGON}
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