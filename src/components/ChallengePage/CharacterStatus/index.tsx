/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react'
import { isMobile } from 'react-device-detect';
import styles from './styles';
import ProgressBar from '../../Common/ProgressBar';
import Skeleton from '../../Common/Skeleton';
import '../../Common/Skeleton/skeleton.css'
import { LevelInfoType } from '../../../constants/challenge';

interface SkeletonTextWrapperProps {
  isLoaded?: boolean
  children?: React.ReactNode
  isMobile?: boolean
}

export const SkeletonTextWrapper = ({isLoaded, children, isMobile}: SkeletonTextWrapperProps) => {
  return (
    <div style={{ position: 'relative' }}>
      {!isLoaded && <div className={'skeleton skeleton-color-green' + (!isMobile ? ' skeleton-width-90' : '')} />}
      {children}
    </div>
  )
}
interface CharacterStatusProps {
  address?: string;
  level: number;
  completedTaskAmount: number;
  profileImg?: string;
  isLoaded: boolean;
  levelInfo: LevelInfoType;
}

const CharacterStatus = ({ 
    address, 
    level, 
    completedTaskAmount, 
    profileImg, 
    isLoaded,
    levelInfo
  }: CharacterStatusProps) => {
  return (
    <div sx={styles.container}>
      <div sx={styles.mainLayout}>
        <div sx={styles.profileImgWrapper}>
          {!isLoaded && <div className='skeleton skeleton-type-circle' />}
          <img src={profileImg} width="200" height="200" />
          <div sx={styles.levelContainer}>
            <Skeleton isLoaded={isLoaded} className='skeleton skeleton-type-level-container skeleton-color-green'/>
            Level {level}
          </div>
        </div>
        <div sx={styles.infoSection}>
          <SkeletonTextWrapper isLoaded={isLoaded} isMobile={isMobile}>
            <p sx={styles.address}>{address}</p>
          </SkeletonTextWrapper>
          <SkeletonTextWrapper isLoaded={isLoaded} isMobile={isMobile}>
            <h4>{levelInfo.title}</h4>
          </SkeletonTextWrapper>
          <SkeletonTextWrapper isLoaded={isLoaded} isMobile={isMobile}>
            <p sx={styles.descriptionSection}>{levelInfo.introduction}</p>
          </SkeletonTextWrapper>
          <div sx={styles.progressBarContainer}>
            <ProgressBar 
              totalTaskAmount={levelInfo.expectedMissionAmount}
              completedTaskAmount={completedTaskAmount}
              isLoaded={isLoaded}
            />
            <span style={{ display: !isLoaded ? 'none' : '' }}>Level Up!</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterStatus