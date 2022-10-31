/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react'
import { isMobile } from 'react-device-detect';
import styles from './styles';
import ProgressBar from '../../Common/ProgressBar';
import Skeleton from '../../Common/Skeleton';
import '../../Common/Skeleton/skeleton.css';
import './profile.css';
import { LevelInfo } from '../../../constants/challenge';
import images from '../../../images';

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
  isLoaded: boolean;
  isUserLevelUp: boolean;
  isAnimationCanBePlayed: boolean;
}

const CharacterStatus = ({ 
    address, 
    level, 
    completedTaskAmount, 
    isLoaded,
    isUserLevelUp,
    isAnimationCanBePlayed
  }: CharacterStatusProps) => {
  return (
    <div sx={styles.container}>
      <div 
        sx={styles.mainLayout} 
        style={{ 
          backgroundColor: LevelInfo[level].levelColor, 
          borderColor: LevelInfo[level].characterPanelBorderColor 
        }}
      >
        <div sx={styles.profileImgWrapper} className= {isAnimationCanBePlayed ? 'profile-up-to-lv' + level : ''}>
          {!isLoaded && <div className='skeleton skeleton-type-circle' />}
          <img 
            src={isUserLevelUp && !isAnimationCanBePlayed 
              ? images[LevelInfo[level - 1].profile]
              : images[LevelInfo[level].profile]}
            style={{ display: isUserLevelUp && isAnimationCanBePlayed ? 'none' : 'inline'}} 
            width="200" 
            height="200" 
          />
          <div 
            sx={styles.levelContainer} 
            style={{ 
              backgroundColor: 
                isUserLevelUp && !isAnimationCanBePlayed 
                  ? LevelInfo[level - 1].levelContainerBgColor 
                  : LevelInfo[level].levelContainerBgColor,
            }}
            className= {isAnimationCanBePlayed ? 'level-container-up-to-lv' + level : ''}
          >
            <Skeleton isLoaded={isLoaded} className='skeleton skeleton-type-level-container skeleton-color-green'/>
            Level {isUserLevelUp && !isAnimationCanBePlayed ? level - 1 : level}
          </div>
        </div>
        <div sx={styles.infoSection}>
          <SkeletonTextWrapper isLoaded={isLoaded} isMobile={isMobile}>
            <p sx={styles.address}>{address}</p>
          </SkeletonTextWrapper>
          <SkeletonTextWrapper isLoaded={isLoaded} isMobile={isMobile}>
            <h4>{LevelInfo[level].title}</h4>
          </SkeletonTextWrapper>
          <SkeletonTextWrapper isLoaded={isLoaded} isMobile={isMobile}>
            <p sx={styles.descriptionSection}>{LevelInfo[level].introduction}</p>
          </SkeletonTextWrapper>
          <div sx={styles.progressBarContainer}>
            <ProgressBar 
              totalTaskAmount={LevelInfo[level].expectedMissionAmount}
              completedTaskAmount={completedTaskAmount}
              isLoaded={isLoaded}
              isUserLevelUp={isUserLevelUp}
              isAnimationCanBePlayed={isAnimationCanBePlayed}
            />
            <span style={{ display: !isLoaded ? 'none' : '' }}>Level Up!</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterStatus