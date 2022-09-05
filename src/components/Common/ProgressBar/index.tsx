/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useMemo } from 'react'
import styles from './styles';
import Skeleton from '../Skeleton';

interface ProgressBarProps {
  backgroundColor?: string;
  colorList?: string[];
  totalTaskAmount: number;
  completedTaskAmount: number;
  isLoaded: boolean;
}

const ProgressBar = ({ 
  backgroundColor = '#ffffff', 
  colorList = ['#FF8E8E', '#EB99ED', '#C6A4FF', '#51BCDE', '#3EBD93'], 
  totalTaskAmount, 
  completedTaskAmount,
  isLoaded,
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

  return (
    <div sx={styles.progressBarContainer} style={{ backgroundColor: backgroundColor }}>
      <Skeleton isLoaded={isLoaded} className='skeleton skeleton-type-progress-bar' />
      {!isCompletedTaskAmountLgThanZero && <div sx={styles.progressBarZeroStatus}>0</div>}
      <div sx={styles.progressBar} style={{ backgroundColor: progressColor, width: progressRate + '%' }}>
        {isCompletedTaskAmountLgThanZero && (
          <span>{taskCounter}</span>
        )}
      </div>
    </div>
  )
}

export default ProgressBar