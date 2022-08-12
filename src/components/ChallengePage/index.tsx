/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react'
import styles from './styles'
import Web3Status from '../Web3Status';
import IntroPage from './IntroPage';
import MissionSection from './MissionSection';
import CharacterStatus from './CharacterStatus';
import images from '../../images';
import { LevelInfo } from '../../constants/challenge';
import { useWeb3React } from '@web3-react/core';
import { shortenAddress } from '../../utils';

const Challenge = () => {
  const [isShowMissionPage, setIsShowMissionPage] = useState<boolean>(false)
  const { account } = useWeb3React();
  const mockUserLevel = 1
  return (
    <div sx={styles.container}>
      <div sx={styles.challengePageWrapper}>
        <div sx={styles.header}>
          <p>Play To Earn</p>
          <Web3Status />
        </div>
        {isShowMissionPage ? (
          <div>
            <div sx={styles.subTitleWrapper}>
              <span>Explore the new Galaxy of Decentralized Finance to become a DeFi Master!Complete the missions below to level up, collect NFTs, 
                and learn how to make money on DeFi!&nbsp;
              </span>
              {/* TODO: this link is not ready */}
              <a 
                sx={styles.learnMoreLink} 
                target="_blank" 
                href="https://medium.com/hakkafinance/vesting-contract-9ab2ff24bf76" 
                rel="noreferrer"
              >
                <span>Click here to learn more </span>
                <img src={images.iconLinkSmallGreen} />
              </a>
            </div>
            <CharacterStatus 
              address={account ? shortenAddress(account) : '-'}
              characterTitle={LevelInfo[mockUserLevel].title}
              description={LevelInfo[mockUserLevel].introduction}
              level={mockUserLevel}
              totalTaskAmount={LevelInfo[mockUserLevel].missionList.length}
              // TODO: check this value
              completedTaskAmount={1}
            />
            <div sx={styles.missionSectionWrapper}>
              <MissionSection />
            </div>
          </div>
        ) : (
          <IntroPage setIsShowMissionPage={setIsShowMissionPage} />
        )}
      </div>
    </div>
  )
}

export default Challenge