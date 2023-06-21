/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react'
import Web3Status from '../Web3Status'
import styles from './styles';
import YearlyReviewIntroSection from './YearlyReviewIntroSection';
import YearlyReviewDetailSection from './YearlyReviewDetailSection';


const YearlyReviewPage = () => {
  const [isShowDetailPage, setIsShowDetailPage] = useState(false);

  return (
    <div sx={styles.container}>
      <div sx={styles.pageWrapper}>
        <div sx={styles.header}>
          <p>Year in Review</p>
          <Web3Status />
        </div>
        {isShowDetailPage ? (<YearlyReviewDetailSection />) : (<YearlyReviewIntroSection setIsShowDetailPage={setIsShowDetailPage} />)}
      </div>
    </div>
  )
}

export default YearlyReviewPage