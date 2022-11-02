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
  setIsLevelUpAnimationCompleted: (boolean) => void;
}

const CharacterStatus = ({ 
    address, 
    level, 
    completedTaskAmount, 
    isLoaded,
    isUserLevelUp,
    isAnimationCanBePlayed,
    setIsLevelUpAnimationCompleted
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
        <div sx={styles.profileImgWrapper}>
          {!isLoaded && <div className='skeleton skeleton-type-circle' />}
          {isUserLevelUp && (
            <div 
              className={isAnimationCanBePlayed ? 'flip-action' : ''} 
              onTransitionEnd={() => setIsLevelUpAnimationCompleted(true)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img src={images[LevelInfo[level - 1].profile]} style={{ width: '200px', height: '200px' }} />
                </div>
                <div className="flip-card-back">
                  <img src={images[LevelInfo[level].profile]} style={{ width: '200px', height: '200px' }} />
                </div>
              </div>
            </div>
          )}
          <img 
            src={images[LevelInfo[level].profile]} 
            style={{ 
              visibility: isUserLevelUp ? 'hidden' : 'visible', 
              width: '200px', 
              height: '200px',
            }} 
          />
          <div sx={styles.levelContainer}>
            {isUserLevelUp ? (
              <div className={isAnimationCanBePlayed ? 'flip-action' : ''}>
                <div className="flip-card-inner">
                  <div
                    className="level-item flip-level-container-front"
                    style={{ backgroundColor: LevelInfo[level - 1].levelContainerBgColor }}
                  >
                    Level {level - 1}
                  </div>
                  <div 
                    className="level-item flip-level-container-back"
                    style={{ backgroundColor: LevelInfo[level].levelContainerBgColor }}
                  >
                    Level {level}
                  </div>
                </div>
              </div>
            ) : (
              <div 
                className='level-item'
                style={{ backgroundColor: LevelInfo[level].levelContainerBgColor }}
              >
                <Skeleton 
                  isLoaded={isLoaded} 
                  className='skeleton skeleton-type-level-container skeleton-color-green'
                />
                Level {level}
              </div>
            )}
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