/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useEffect, useMemo, useState } from 'react'
import styles from './styles'
import Web3Status from '../Web3Status';
import IntroPage from './IntroPage';
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
  const [isShowMissionPage, setIsShowMissionPage] = useState<boolean>(true)
  const [isUserLevelUp, setIsUserLevelUp] = useState<boolean>(false)
  const [isAnimationCanBePlayed, setIsAnimationCanBePlayed] = useState<boolean>(false)
  const [isLevelUpAnimationCompleted, setIsLevelUpAnimationCompleted] = useState<boolean>(false)
  const { account } = useWeb3React();
  const campaignsInfo = useProjectGalaxyCampaignsInfo()
  const togglePlayToEarnLevelUpModal = usePlayToEarnLevelUpModalToggle();
  const isPlayToEarnModalOpen = usePlayToEarnLevelUpModalOpen();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const isIntroPageDisabled = urlParams.get('isIntroPageDisabled')
    setIsShowMissionPage(!!isIntroPageDisabled)
  }, [])

  const userLevel = useMemo(() => {
    let userLevel = 1
    let isBreak = false
    const levelList = Object.keys(LevelInfo).map((level) => LevelInfo[level].missionList)
    for (let i = 0; i < levelList.length; i++) {
      for (let z = 0; z < levelList[i].length; z++) {
        const id = levelList[i][z]
        if (
          campaignsInfo &&
          OAT_INFO[id]?.priority === PriorityOptions.REQUIRED && 
          campaignsInfo[id]?.status === MissionStatusOptions.UNFINISHED
          ) {
            userLevel = i + 1
            isBreak = true
            break
        }
      }
      if (isBreak) break
    }
    return userLevel
  }, [campaignsInfo])

  const completedTaskAmount = useMemo(() => {
    let completedTaskAmount = 0;
    LevelInfo[userLevel].missionList.forEach((id) => { 
      if (
        campaignsInfo?.[id]?.status &&
        (campaignsInfo[id].status === MissionStatusOptions.FINISHED ||
          campaignsInfo[id].status === MissionStatusOptions.COMPLETED)) {
            completedTaskAmount += 1
      }
    })
    return completedTaskAmount
  }, [campaignsInfo])

  const isCampaignsInfoLoaded = useMemo(() => {
    return !!campaignsInfo && Object.keys(campaignsInfo).length > 0
  }, [campaignsInfo])

  const isBrowser = typeof window !== 'undefined';
  useEffect(() => {
    if (!isBrowser || !isCampaignsInfoLoaded || !account) {
      return
    }
    const localStorageLevelInfo = window.localStorage.getItem('user-level')

    if (!localStorageLevelInfo) {
      let levelInfo = {}
      levelInfo[account] = userLevel
      window.localStorage.setItem('user-level', JSON.stringify(levelInfo))
      return
    }

    const levelInfo = JSON.parse(localStorageLevelInfo)

    if (!levelInfo[account]) {
      levelInfo[account] = userLevel
      window.localStorage.setItem('user-level', JSON.stringify(levelInfo))
      return
    }

    if (levelInfo[account] < userLevel) {
      togglePlayToEarnLevelUpModal()
      setIsUserLevelUp(true)
    }
  }, [isBrowser, account, userLevel, isCampaignsInfoLoaded])

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
  }, [isLevelUpAnimationCompleted, userLevel, account])

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
        ) : (
          <IntroPage setIsShowMissionPage={setIsShowMissionPage} />
        )}
      </div>
      <PlayToEarnLevelUpModal />
    </div>
  )
}

export default Challenge