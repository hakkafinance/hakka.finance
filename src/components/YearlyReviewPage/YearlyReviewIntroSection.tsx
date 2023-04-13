/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react'
import _omit from 'lodash/omit';
import styles from './styles';
import withWrongNetworkCheckWrapper from '../../hoc/withWrongNetworkCheckWrapper';
import withConnectWalletCheckWrapper from '../../hoc/withConnectWalletCheckWrapper';
import { MyButton } from '../Common';
import { ChainId, ChainNameWithIcon } from '../../constants';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { useWalletModalToggle } from '../../state/application/hooks';
import images from '../../images';

const StartButton = withWrongNetworkCheckWrapper(withConnectWalletCheckWrapper(MyButton));

type Props = {
  setIsShowDetailPage: (boolean) => void
}

const YearlyReviewIntroSection = ({ setIsShowDetailPage }: Props) => {
  const { account, chainId, error } = useWeb3React();
  const toggleWalletModal = useWalletModalToggle();
  const isConnected = !!account || error instanceof UnsupportedChainIdError;
  const supportedChain = Object.keys(_omit(ChainNameWithIcon, [ChainId.KOVAN, ChainId.RINKEBY])).map((ele) => parseInt(ele));
  const isCorrectNetwork = chainId ? supportedChain.includes(chainId) : false;
  
  return (
    <div sx={styles.mainContentWrapper}>
      <img src={images.imageHowHakka} sx={styles.howHakkaIcon} />
      <div>
        <p sx={styles.title}>Track your performance and engagement level on Hakka Finance!</p>
        <p sx={styles.content}>
          The Hakka Finance Year in Review is a personalized report that provides 
          insights about your activity, earned rewards, and achieved milestones on the Hakka platform.
        </p>
        <div sx={styles.startBtn}>
          <StartButton
            onClick={() => setIsShowDetailPage(true)} 
            styleKit='green'
            isConnected={isConnected}
            connectWallet={toggleWalletModal}
            isCorrectNetwork={isCorrectNetwork}
            targetNetwork={ChainId.MAINNET}
          >
            Check
          </StartButton>
        </div>
      </div>
    </div>
  )
}

export default YearlyReviewIntroSection