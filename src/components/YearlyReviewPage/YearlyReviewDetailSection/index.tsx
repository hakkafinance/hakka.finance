/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useEffect, useState } from 'react'
import _omit from 'lodash/omit';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import styles from './styles';
import withWrongNetworkCheckWrapper from '../../../hoc/withWrongNetworkCheckWrapper';
import withConnectWalletCheckWrapper from '../../../hoc/withConnectWalletCheckWrapper';
import { MyButton } from '../../Common';
import { ChainId, ChainNameWithIcon } from '../../../constants';
import { useWalletModalToggle, useYearlyReviewScoreModalToggle } from '../../../state/application/hooks';
import ReviewItem from '../ReviewItem';
import images from '../../../images';
import ScoreModal from '../ScoreModal';

const YearlyReviewDetailSection = () => {
  const { account, chainId, error } = useWeb3React();
  const toggleWalletModal = useWalletModalToggle();
  const isConnected = !!account || error instanceof UnsupportedChainIdError;
  const supportedChain = Object.keys(_omit(ChainNameWithIcon, [ChainId.KOVAN, ChainId.RINKEBY])).map((ele) => parseInt(ele));
  const isCorrectNetwork = chainId ? supportedChain.includes(chainId) : false;
  const CountScoreButton = withWrongNetworkCheckWrapper(withConnectWalletCheckWrapper(MyButton));
  const toggleScoreModal = useYearlyReviewScoreModalToggle();

  interface ReviewDataType {
    first_met_hakka: number
    gas: { eth: number, bsc: number, polygon: number, ftm: number }
    oats: number
    usedDApp: string[]
  }

  const [reviewData, setReviewData] = useState<ReviewDataType | null>(null);
  const [reviewResult, setReviewResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
   fetch(`https://achievement.hakka.finance/${account}`)
   .then((response) => {
    if (!response.ok) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
    }
    return response.json()
   })
   .then((actualData) => setReviewData(actualData))
   .catch((err) => {
    console.log(err.message);
    setReviewData(null);
   })
   .finally(() => {
    setLoading(false);
  });
  }, []);

  interface ReviewResultType {
    title: string
    icon: string
    comment: string
    performance: string
    shortContent: string
  }

  useEffect(() => {
    if (!reviewData) {
      return
    }

    let reviewResult: { transactionAmount?: ReviewResultType, gas?: ReviewResultType, oats?: ReviewResultType, firstProduct?: ReviewResultType } = {}

    if (reviewData.usedDApp) {
      const transactionAmountInfo = {
        transactionAmount: {
          title: 'Your total transaction amount and products you have used on Hakka last year:',
          icon: images.iconReview1,
          // TODO: data is not ready
          performance: '',
          shortContent: `Used ${reviewData.usedDApp.join(', ')}`,
          comment: '',
      },}
      Object.assign(reviewResult, transactionAmountInfo);
    }

    if (reviewData.gas) {
      let gasPerformance = ''
      let gasShortContent = ''
      Object.keys(reviewData.gas).map((ele) => {
        if (reviewData.gas[ele] > 0) {
          // TODO: check token info
          // example: 'Ethereum: 1.2 ether, Polygon: 0.8 matic',
          gasPerformance += `${ele}: ${parseFloat(reviewData.gas[ele]).toFixed(4)} Matic`
          gasShortContent += `Used ${parseFloat(reviewData.gas[ele]).toFixed(4)} Matic as gas`
        }
      })

      const gasInfo = {
        gas: {
          title: 'Gas you have burned for Hakka last year:',
          icon: images.iconReview2,
          performance: gasPerformance,
          shortContent: gasShortContent,
          comment: '',
      },}
      Object.assign(reviewResult, gasInfo);
    }

    if (reviewData.oats) {
      const oatsInfo = {
        oats: {
          title: 'OATs you have claimed from Hakka last year:',
          icon: images.iconReview3,
          performance: `${reviewData.oats} of 33 OATs`,
          shortContent: `Got ${reviewData.oats} OATs`,
          comment: 'Our respects to you, loyal Hakkafan!',
      },}
      Object.assign(reviewResult, oatsInfo);
    }

    if (reviewData.first_met_hakka) {
      const date = new Date(reviewData.first_met_hakka * 1000);
      const formattedDate = date.getFullYear() + '/' + date.getMonth() + '/' + date.getDay()

      const firstProductInfo = {
        firstProduct: {
          title: 'Your first Hakka product:',
          icon: images.iconReview4,
          // TODO: first dapp is not ready
          performance: `Project A, ${formattedDate}`,
          shortContent: `${formattedDate} was my first day meeting Hakka`,
          comment: 'Thanks for your loyalty and patience dear Hakka rancher!',
      },}
      Object.assign(reviewResult, firstProductInfo);
    }
    setReviewResult(Object.values(reviewResult))
  }, [reviewData])

  console.log('reviewData', reviewData)

  return (
    <div>
      <p sx={styles.title}>Well done, Hakka Farmer!</p>
      <div sx={styles.reviewList}>
        {reviewResult.map((ele, index) => (
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
          onClick={toggleScoreModal} 
          styleKit='green'
          isConnected={isConnected}
          connectWallet={toggleWalletModal}
          isCorrectNetwork={isCorrectNetwork}
          targetNetwork={ChainId.MAINNET}
        >
          Count your score
        </CountScoreButton>
      </div>
      <ScoreModal p2eLevel='1' performanceList={reviewResult} />
    </div>
  )
}

export default YearlyReviewDetailSection