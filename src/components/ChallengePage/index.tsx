/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useEffect, useMemo, useState } from 'react'
import styles from './styles'
import Web3Status from '../Web3Status';
import MissionSection from './MissionSection';
import CharacterStatus from './CharacterStatus';
import images from '../../images';
import { LevelInfo } from '../../constants/challenge';
import { useWeb3React } from '@web3-react/core';
import { shortenAddress } from '../../utils';
import useProjectGalaxyCampaignsInfo from '../../hooks/useProjectGalaxyCampaignsInfo';
import { MissionStatusOptions, OAT_INFO, PriorityOptions } from '../../constants/challenge';
import { usePlayToEarnLevelUpModalOpen, usePlayToEarnLevelUpModalToggle } from '../../state/application/hooks';
import PlayToEarnLevelUpModal from '../PlayToEarnLevelUpModal';

const Challenge = () => {
  const [isUserLevelUp, setIsUserLevelUp] = useState<boolean>(false)
  const [isAnimationCanBePlayed, setIsAnimationCanBePlayed] = useState<boolean>(false)
  const [isLevelUpAnimationCompleted, setIsLevelUpAnimationCompleted] = useState<boolean>(false)
  const { account } = useWeb3React();
  const campaignsInfo = useProjectGalaxyCampaignsInfo()
  const togglePlayToEarnLevelUpModal = usePlayToEarnLevelUpModalToggle();
  const isPlayToEarnModalOpen = usePlayToEarnLevelUpModalOpen();

  const isCampaignsInfoLoaded = useMemo(() => {
    return !!campaignsInfo && Object.keys(campaignsInfo).length > 0
  }, [campaignsInfo])

  const userLevel = useMemo(() => {
    const levelList = Object.keys(LevelInfo).map((level) => LevelInfo[level].missionList)
    if (!campaignsInfo || Object.keys(campaignsInfo).length === 0 || levelList.length <= 1) {
      return 1
    }
    for (let i = 0; i < levelList.length; i++) {
      for (let j = 0; j < levelList[i].length; j++) {
        const id = levelList[i][j]
        if (
          OAT_INFO[id]?.priority === PriorityOptions.REQUIRED && 
          campaignsInfo[id]?.status === MissionStatusOptions.UNFINISHED || 
          campaignsInfo[id]?.status === MissionStatusOptions.FINISHED
          ) {
            const userLevel = i + 1
            return userLevel
        }
      }
    }
    return levelList.length
  }, [campaignsInfo])

  useEffect(() => {
    if(!account) { 
      return 
    }
    const localStorageLevelInfo = window.localStorage.getItem('user-level')
    let levelInfo = localStorageLevelInfo ? JSON.parse(localStorageLevelInfo) : {}
    if (!levelInfo[account]) {
      levelInfo[account] = 1
      window.localStorage.setItem('user-level', JSON.stringify(levelInfo))
    }
  }, [account])

  useEffect(() => {
    const isBrowser = typeof window !== 'undefined';
    const localStorageLevelInfo = window.localStorage.getItem('user-level')
    if (
      !isBrowser || 
      !isCampaignsInfoLoaded || 
      !account || 
      !localStorageLevelInfo
    ) {
      return
    }

    const levelInfo = JSON.parse(localStorageLevelInfo)
    if (levelInfo[account] < userLevel) {
      if (!isPlayToEarnModalOpen) {
        togglePlayToEarnLevelUpModal()
      }
      setIsUserLevelUp(true)
    }
  }, [userLevel, isCampaignsInfoLoaded])

  useEffect(() => {
    if(isUserLevelUp && !isPlayToEarnModalOpen) {
      setIsAnimationCanBePlayed(true)
    }
  }, [isUserLevelUp, isPlayToEarnModalOpen])

  useEffect(() => {
    const localStorageLevelInfo = window.localStorage.getItem('user-level')
    if (isLevelUpAnimationCompleted && account && localStorageLevelInfo) {
      setIsAnimationCanBePlayed(false)
      setIsUserLevelUp(false)
      const levelInfo = JSON.parse(localStorageLevelInfo)
      levelInfo[account] = userLevel
      window.localStorage.setItem('user-level', JSON.stringify(levelInfo))
    }
  }, [isLevelUpAnimationCompleted, userLevel])

  const completedTaskAmount = useMemo(() => {
    let completedTaskAmount = 0;
    LevelInfo[userLevel].missionList.forEach((id) => { 
      if (
        campaignsInfo?.[id]?.status &&
        campaignsInfo[id].status === MissionStatusOptions.COMPLETED) {
          completedTaskAmount += 1
      }
    })
    return completedTaskAmount
  }, [campaignsInfo])

  console.log('test1-----------------------------------------------------------------------', )
  console.log('test1-account', account)
  console.log('test1-campaignsInfo', campaignsInfo)
  console.log('test1-userLevel', userLevel)
  console.log('test1-isCampaignsInfoLoaded', isCampaignsInfoLoaded)
  console.log('test1-isUserLevelUp', isUserLevelUp)
  console.log('test1-isAnimationCanBePlayed', isAnimationCanBePlayed)
  console.log('test1-isLevelUpAnimationCompleted', isLevelUpAnimationCompleted)
  console.log('test1-isPlayToEarnModalOpen', isPlayToEarnModalOpen)
  console.log('test1-localStorage',  JSON.parse(window.localStorage.getItem('user-level') || ''))
  console.log('test1----------------------------------------------------------------------', )

  return (
    <div sx={styles.container}>
      <div sx={styles.challengePageWrapper}>
        <div sx={styles.header}>
          <p>Play To Earn</p>
          <Web3Status />
        </div>
        <div>
          <div sx={styles.subTitleWrapper}>
            <span>Explore the new Galaxy of Decentralized Finance to become a DeFi Master! Complete the missions below to level up, collect NFTs,
              and learn how to make money on DeFi!&nbsp;
            </span>
            <a
              sx={styles.learnMoreLink}
              target="_blank"
              href="https://hakkafinance.medium.com/play-to-earn-with-hakka-finance-a3b3cf50cfb5"
              rel="noreferrer"
            >
              <span>Read more  </span>
              <img src={images.iconLinkSmallGreen} />
            </a>
          </div>
          <CharacterStatus
            address={account ? shortenAddress(account) : '-'}
            level={userLevel}
            completedTaskAmount={completedTaskAmount}
            isLoaded={isCampaignsInfoLoaded}
            isUserLevelUp={isUserLevelUp}
            isAnimationCanBePlayed={isAnimationCanBePlayed}
            setIsLevelUpAnimationCompleted={setIsLevelUpAnimationCompleted}
          />
          <div sx={styles.missionSectionWrapper}>
            <MissionSection
              campaignsInfo={campaignsInfo}
              isLoaded={isCampaignsInfoLoaded}
              userLevel={userLevel}
            />
          </div>
        </div>
      </div>
      <PlayToEarnLevelUpModal />
    </div>
  )
}

export default Challenge