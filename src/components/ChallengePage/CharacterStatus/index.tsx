/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react'
import { isMobile } from 'react-device-detect';
import styles from './styles';
import ProgressBar from '../../Common/ProgressBar';
import Skeleton from '../../Common/Skeleton';
import '../../Common/Skeleton/skeleton.css'

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
  level?: number;
  characterTitle?: string;
  description?: string;
  totalTaskAmount: number;
  completedTaskAmount: number;
  profileImg?: string;
  isLoaded: boolean
}

const CharacterStatus = ({ 
    address, 
    level, 
    characterTitle, 
    description, 
    totalTaskAmount, 
    completedTaskAmount, 
    profileImg, 
    isLoaded 
  }: CharacterStatusProps) => {
  return (
    <div sx={styles.container}>
      <div sx={styles.levelContainer}>
        <Skeleton isLoaded={isLoaded} className='skeleton skeleton-type-level-container skeleton-color-green'/>
        Level {level}
      </div>
      <div sx={styles.mainLayout}>
        <div sx={styles.profileImgWrapper}>
          {!isLoaded && <div className='skeleton skeleton-type-circle' />}
          <img src={profileImg} width="200" height="200" />
        </div>
        <div sx={styles.infoSection}>
          <SkeletonTextWrapper isLoaded={isLoaded} isMobile={isMobile}>
            <p sx={styles.address}>{address}</p>
          </SkeletonTextWrapper>
          <SkeletonTextWrapper isLoaded={isLoaded} isMobile={isMobile}>
            <h4>{characterTitle}</h4>
          </SkeletonTextWrapper>
          <SkeletonTextWrapper isLoaded={isLoaded} isMobile={isMobile}>
            <p sx={styles.descriptionSection}>{description}</p>
          </SkeletonTextWrapper>
          <div sx={styles.progressBarContainer}>
            <ProgressBar 
              totalTaskAmount={totalTaskAmount}
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