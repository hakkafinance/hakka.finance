/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react'
import { useWeb3React } from '@web3-react/core';
import { MyButton } from '../../Common';
import styles from './styles';
import withWrongNetworkCheckWrapper from '../../../hoc/withWrongNetworkCheckWrapper';
import withConnectWalletCheckWrapper from '../../../hoc/withConnectWalletCheckWrapper';
import { useWalletModalToggle } from '../../../state/application/hooks';
import { ChainId } from '../../../constants';

type IntroPageProps = {
  setIsShowMissionPage: (value: boolean) => void;
}

const StartButton = withWrongNetworkCheckWrapper(
  withConnectWalletCheckWrapper(MyButton)
);

const IntroPage = ({ setIsShowMissionPage }: IntroPageProps) => {
  const { account, chainId } = useWeb3React();
  const toggleWalletModal = useWalletModalToggle();
  return (
    <div>
      <div sx={styles.introGraphWrapper}>
        <h4>Let's Play To Earn!</h4>
        <p>A fantastic journey to become the best DeFi Master of the Galaxy is awaiting you, young Hakka Farmer!
          Level up and learn how to make money in DeFi & win NFTs by completing simple missions with Hakka Finance!</p>
      </div>
      <div sx={styles.startBtnWrapper}>
        <div sx={styles.startBtn}>
          <StartButton
            onClick={() => setIsShowMissionPage(true)} 
            styleKit='green'
            isConnected={!!account}
            connectWallet={toggleWalletModal}
            isCorrectNetwork={chainId === ChainId.POLYGON}
            targetNetwork={ChainId.POLYGON}
          >
            START NOW
          </StartButton>
        </div>
      </div>
    </div>
  )
}

export default IntroPage