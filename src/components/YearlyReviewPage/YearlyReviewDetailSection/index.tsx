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
import { useWalletModalToggle, useYearlyReviewScoreModalToggle } from '../../../state/application/hooks';
import ReviewItem from '../ReviewItem';
import ScoreModal from '../ScoreModal';
import EmptyState from './EmptyState';
import Spinner from '../../Common/Spinner';
import useYearlyReviewData, { ReviewResultType } from '../../../hooks/useYearlyReviewData';

interface YearlyReviewMainSectionProps {
  reviewResult: ReviewResultType[]
}

const YearlyReviewMainSection = ({ reviewResult }: YearlyReviewMainSectionProps) => {
  const { account, chainId, error } = useWeb3React();
  const toggleWalletModal = useWalletModalToggle();
  const isConnected = !!account || error instanceof UnsupportedChainIdError;
  const supportedChain = Object.keys(_omit(ChainNameWithIcon, [ChainId.KOVAN, ChainId.RINKEBY])).map((ele) => parseInt(ele));
  const isCorrectNetwork = chainId ? supportedChain.includes(chainId) : false;
  const CountScoreButton = withWrongNetworkCheckWrapper(withConnectWalletCheckWrapper(MyButton));
  const toggleScoreModal = useYearlyReviewScoreModalToggle();

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
    </div>
  )
}


const YearlyReviewDetailSection = () => {
  const { account } = useWeb3React();
  const { reviewResult, isLoading, p2eLv } = useYearlyReviewData(account)

  let displayContent
  if (isLoading) {
    displayContent = <Spinner />
  } else if (reviewResult.length === 0) {
    displayContent = <EmptyState /> 
  } else {
    displayContent = <YearlyReviewMainSection reviewResult={reviewResult} />
  }

  return (
    <div>
      {displayContent}
      <ScoreModal p2eLevel={p2eLv} performanceList={reviewResult} />
    </div>
  )
}

export default YearlyReviewDetailSection