/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react'
import { isMobile } from 'react-device-detect';
import { MyButton } from '../../Common';
import styles from './styles';
import { MissionStatusOptions, MISSION_STATUS, OAT_INFO, PriorityInfo, PriorityOptions } from '../../../constants/challenge';
import { navigate } from 'gatsby';

interface MissionItemProps {
  oatAddress?: string;
  missionStatus: MissionStatusOptions;
}

const MissionItem = ({ oatAddress, missionStatus }: MissionItemProps) => {
  const isUpcoming = missionStatus === MissionStatusOptions.UPCOMING
  const missionIndex = oatAddress ? OAT_INFO[oatAddress].missionIndex : ''
  const priority = oatAddress ? OAT_INFO[oatAddress].priority : ''
  const missionTitle = oatAddress ? OAT_INFO[oatAddress].describeTitle : ''

  return (
    <div sx={styles.container}>
      <div sx={styles.mainLayout}>
        <div sx={styles.firstSectionWrapper}>
          <div 
            sx={styles.taskStatusWrapper} 
            style={{ background: MISSION_STATUS[missionStatus].color }}
          >
            {!isMobile && MISSION_STATUS[missionStatus].content}
          </div>
          <img></img>
          {isUpcoming ? <div sx={styles.upcomingImg} /> : <div sx={styles.mockImg} />}
        </div>
        <div>
          {!isUpcoming && priority && (
            <p 
              sx={styles.taskProperty} 
              style={{ color: PriorityInfo[priority].color }}
            >
              {PriorityInfo[priority].content}
            </p>
          )}
          <div sx={styles.titleWrapper} style={isUpcoming ? { color: '#D9D9D9' } : {}}>
            {!isUpcoming && <h4>Mission {missionIndex}</h4>}
            <p>{isUpcoming? 'Upcoming Mission' : missionTitle}</p>
          </div>
        </div>
      </div>
      <div sx={styles.btnWrapper}>
        <MyButton 
          onClick={missionStatus === MissionStatusOptions.FINISHED 
            ? () => window.open(OAT_INFO[oatAddress].claimLink, '_blank').focus() 
            : () => navigate(`/challenge/${oatAddress}`)} 
          disabled={isUpcoming}
        >
          {MISSION_STATUS[missionStatus].btnContent}
        </MyButton>
      </div>
    </div>
  )
}

export default MissionItem