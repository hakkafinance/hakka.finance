/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react'
import { isMobile } from 'react-device-detect';
import { MyButton } from '../../Common';
import styles from './styles';
import { MissionStatusOptions, MISSION_STATUS, OAT_INFO, PriorityInfo, PriorityOptions } from '../../../constants/challenge';
import { navigate } from 'gatsby';
import images from '../../../images';
import Skeleton from '../../Common/Skeleton';

interface MissionItemProps {
  oatAddress?: string;
  missionStatus: MissionStatusOptions;
  isCampaignsInfoLoaded?: boolean
}

const MissionItem = ({ oatAddress, missionStatus, isCampaignsInfoLoaded }: MissionItemProps) => {
  const isUpcoming = missionStatus === MissionStatusOptions.UPCOMING
  const missionIndex = oatAddress ? OAT_INFO[oatAddress].missionIndex : ''
  const priority = oatAddress ? OAT_INFO[oatAddress].priority : ''
  const missionTitle = oatAddress ? OAT_INFO[oatAddress].describeTitle : ''
  const oatImg = oatAddress ? images[OAT_INFO[oatAddress].img] : ''

  const [isImgLoading, setIsImgLoading] = useState(true);

  return (
    <div sx={styles.container}>
      <div sx={styles.mainLayout}>
        <div sx={styles.firstSectionWrapper}>
          <div 
            sx={styles.taskStatusWrapper} 
            style={{ background: MISSION_STATUS[missionStatus].color }}
          >
            {!isUpcoming && <Skeleton isLoaded={isCampaignsInfoLoaded} className="skeleton skeleton-type-button" />}
            {!isMobile && MISSION_STATUS[missionStatus].content}
          </div>
          <div sx={styles.oatImgWrapper}>
            {!isUpcoming && <Skeleton isLoaded={!isImgLoading} className="skeleton" />}
            {oatAddress && (
              <img src={oatImg} onLoad={() => setIsImgLoading(false)} width="60px" height="72px" loading="lazy" />
            )}
            {isUpcoming && <div sx={styles.upcomingImg} />}
          </div>
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
        {!isUpcoming && <Skeleton isLoaded={isCampaignsInfoLoaded} className="skeleton skeleton-type-button" />}
        <MyButton 
          onClick={() => navigate(`/play2earn/${oatAddress}`)} 
          disabled={isUpcoming}
        >
          {MISSION_STATUS[missionStatus].btnContent}
        </MyButton>
      </div>
    </div>
  )
}

export default MissionItem