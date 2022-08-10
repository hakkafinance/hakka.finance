/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react'
import styles from './styles'
import Web3Status from '../Web3Status';
import IntroPage from './IntroPage';
import CharacterStatus from './CharacterStatus';

const Challenge = () => {
  const [isShowMissionPage, setIsShowMissionPage] = useState<boolean>(false)
  const mockAddress = '0x123...123'
  return (
    <div sx={styles.container}>
      <div sx={styles.challengePageWrapper}>
        <div sx={styles.header}>
          <p>Play To Earn</p>
          <Web3Status />
        </div>
        {isShowMissionPage ? (
          <div>
            <CharacterStatus 
              address={mockAddress}
              characterTitle='Newbie DeFi Farmer' 
              description='Your journey across the DeFi Galaxy starts here, young farmer! Learn the basics of how a DAO works, and how to make money with it!' 
              level={0}
              totalTaskAmount={7}
              finishedTaskAmount={1}
            />
          </div>
        ) : (
          <IntroPage setIsShowMissionPage={setIsShowMissionPage} />
        )}
      </div>
    </div>
  )
}

export default Challenge