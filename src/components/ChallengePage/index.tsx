/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react'
import styles from './styles'
import Web3Status from '../Web3Status';
import IntroPage from './IntroPage';
import MissionSection from './MissionSection';

const Challenge = () => {
  const [isShowMissionPage, setIsShowMissionPage] = useState<boolean>(false)
  return (
    <div sx={styles.container}>
      <div sx={styles.challengePageWrapper}>
        <div sx={styles.header}>
          <p>Play To Earn</p>
          <Web3Status />
        </div>
        {isShowMissionPage ? (
          <div>
            <MissionSection />
          </div>
        ) : (
          <IntroPage setIsShowMissionPage={setIsShowMissionPage} />
        )}
      </div>
    </div>
  )
}

export default Challenge