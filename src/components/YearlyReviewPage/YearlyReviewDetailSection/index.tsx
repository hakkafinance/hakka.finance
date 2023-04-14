/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react'
import _omit from 'lodash/omit';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import styles from './styles';
import withWrongNetworkCheckWrapper from '../../../hoc/withWrongNetworkCheckWrapper';
import withConnectWalletCheckWrapper from '../../../hoc/withConnectWalletCheckWrapper';
import { MyButton } from '../../Common';
import { ChainId, ChainNameWithIcon } from '../../../constants';
import { useWalletModalToggle } from '../../../state/application/hooks';
import ReviewItem from '../ReviewItem';
import images from '../../../images';

// TODO: mock data
const MOCK_DATA = [
  {
    title: 'Your total transaction amount and products you have used on Hakka last year:',
    icon: images.iconReview1,
    performance: 'IRS, IG, Farming, Staking, total for 5000 USD',
    comment: 'What a productive farmer! You are in the top 1% users!'
  },
  {
    title: 'Gas you have burned for Hakka last year:',
    icon: images.iconReview2,
    performance: 'Ethereum: 1.2 ether, Polygon: 0.8 matic',
    comment: 'Such a hard worker! Your activity requires more gas than 90% of users.'
  },
  {
    title: 'OATs you have claimed from Hakka last year:',
    icon: images.iconReview3,
    performance: 'x of 33 OATs',
    comment: 'Our respects to you, loyal Hakkafam!'
  },
  {
    title: 'Your first Hakka product:',
    icon: images.iconReview4,
    performance: 'IRS, 2020/03/02',
    comment: 'Thanks for your loyalty and patience dear Hakka rancher!'
  },
]

const YearlyReviewDetailSection = () => {
  const { account, chainId, error } = useWeb3React();
  const toggleWalletModal = useWalletModalToggle();
  const isConnected = !!account || error instanceof UnsupportedChainIdError;
  const supportedChain = Object.keys(_omit(ChainNameWithIcon, [ChainId.KOVAN, ChainId.RINKEBY])).map((ele) => parseInt(ele));
  const isCorrectNetwork = chainId ? supportedChain.includes(chainId) : false;
  const CountScoreButton = withWrongNetworkCheckWrapper(withConnectWalletCheckWrapper(MyButton));

  return (
    <div>
      <p sx={styles.title}>Well done, Hakka Farmer!</p>
      <div sx={styles.reviewList}>
        {MOCK_DATA.map((ele, index) => (
          <div key={index}>
            <ReviewItem 
              title={ele.title} 
              icon={ele.icon} 
              performance={ele.performance} 
              comment={ele.comment} 
            />
          </div>
        ))}
      </div>
      <div sx={styles.countScoreButton}>
        <CountScoreButton
          onClick={() => {}} 
          styleKit='green'
          isConnected={isConnected}
          connectWallet={toggleWalletModal}
          isCorrectNetwork={isCorrectNetwork}
          targetNetwork={ChainId.MAINNET}
        >
          Count your score
        </CountScoreButton>
      </div>
    </div>
  )
}

export default YearlyReviewDetailSection