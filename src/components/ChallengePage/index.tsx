/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useMemo, useState } from 'react'
import styles from './styles'
import Web3Status from '../Web3Status';
import IntroPage from './IntroPage';
import MissionSection from './MissionSection';
import CharacterStatus from './CharacterStatus';
import useProjectGalaxyCampaignsInfo from '../../hooks/useProjectGalaxyCampaignsInfo';
import { MissionStatusOptions, OAT_INFO, PriorityOptions } from '../../constants/challenge';

const Challenge = () => {
  const [isShowMissionPage, setIsShowMissionPage] = useState<boolean>(false)
  const mockAddress = '0x123...123'

  const campaignsInfo = useProjectGalaxyCampaignsInfo()
  console.log('campaignsInfo', campaignsInfo)

  // 
  const level1Task = ['GCTANUUJkf', 'GCuq6UU5zS']
  const LevelInfo = {
    1: {
      title: 'Newbie DeFi Farmer',
      introduction: 'Your DeFi journey across the Galaxy starts here, young farmer! Before taking off, prepare yourself by learning the basics DAOs and DeFi!',
      missionList: ['GCTANUUJkf', 'GCuq6UU5zS']
    },
    2: {
      title: '',
      introduction: '',
      missionList: ['aaa', 'bbb']
    },
  }
  // 

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
    level1Task.forEach((id) => { 
      if (
        campaignsInfo?.[id]?.status &&
        (campaignsInfo[id].status === MissionStatusOptions.FINISHED ||
          campaignsInfo[id].status === MissionStatusOptions.COMPLETED)) {
            completedTaskAmount += 1
      }
    })
    return completedTaskAmount
  }, [campaignsInfo])

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
              level={userLevel}
              totalTaskAmount={7}
              finishedTaskAmount={completedTaskAmount}
            />
            <MissionSection campaignsInfo={campaignsInfo} />
          </div>
        ) : (
          <IntroPage setIsShowMissionPage={setIsShowMissionPage} />
        )}
      </div>
    </div>
  )
}

export default Challenge