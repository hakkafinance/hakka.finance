/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useMemo } from 'react'
import styles from './styles';

interface ProgressBarProps {
  backgroundColor?: string;
  colorList?: string[];
  totalTaskAmount: number;
  completedTaskAmount: number;
  isLoaded: boolean;
  isUserLevelUp: boolean;
  isAnimationCanBePlayed: boolean;
}

const ProgressBar = ({ 
  backgroundColor = '#ffffff', 
  colorList = ['#FF8E8E', '#EB99ED', '#C6A4FF', '#51BCDE', '#3EBD93'], 
  totalTaskAmount, 
  completedTaskAmount,
  isLoaded,
  isUserLevelUp,
  isAnimationCanBePlayed,
}: ProgressBarProps) => {
  const [progressRate, progressColor, isCompletedTaskAmountLgThanZero, taskCounter] = useMemo(() => {
    const progressRate =  completedTaskAmount / totalTaskAmount * 100
    const progressColor = progressRate === 100 
      ? colorList[colorList.length - 1]
      : colorList[Math.floor(progressRate / (100 / colorList?.length))]
    const isCompletedTaskAmountLgThanZero = completedTaskAmount > 0
    const taskCounter = completedTaskAmount + '/' + totalTaskAmount
    return [progressRate, progressColor, isCompletedTaskAmountLgThanZero, taskCounter]
  }, [completedTaskAmount, totalTaskAmount, colorList])

  const progressBarWidth = useMemo(() => {
    if (isUserLevelUp) {
      const width = isAnimationCanBePlayed ? 100 : ((totalTaskAmount - 1) / totalTaskAmount) * 100
      return width + '%'
    } else {
      return isCompletedTaskAmountLgThanZero ? progressRate + '%' : '20px'
    }
  }, [isAnimationCanBePlayed, progressRate, isUserLevelUp, isCompletedTaskAmountLgThanZero])

  return (
    <div sx={styles.progressBarContainer} style={{ backgroundColor: backgroundColor, display: !isLoaded ? 'none' : '' }}>
      <div 
        sx={styles.progressBar} 
        style={{ 
          backgroundColor: progressColor, 
          width: progressBarWidth, 
          transition: isCompletedTaskAmountLgThanZero || isUserLevelUp
            ? 'width 1s ease'
            : 'none'
        }}>
        {!isUserLevelUp && (
          <span>{isCompletedTaskAmountLgThanZero ? taskCounter : 0}</span>
        )}
      </div>
    </div>
  )
}

export default ProgressBar