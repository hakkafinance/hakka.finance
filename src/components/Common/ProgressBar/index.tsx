/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useMemo } from 'react'
import styles from './styles';

interface ProgressBarProps {
  backgroundColor?: string;
  colorList?: string[];
  totalTaskAmount: number;
  finishedTaskAmount: number;
}

const ProgressBar = ({ 
  backgroundColor = '#ffffff', 
  colorList = ['#FF8E8E', '#EB99ED', '#C6A4FF', '#51BCDE', '#3EBD93'], 
  totalTaskAmount, 
  finishedTaskAmount  
}: ProgressBarProps) => {
  const [progressRate, progressColor, isFinishedTaskAmountLgThanZero, taskCounter] = useMemo(() => {
    const progressRate =  finishedTaskAmount / totalTaskAmount * 100
    const progressColor = progressRate === 100 
      ? colorList[colorList.length - 1]
      : colorList[Math.floor(progressRate / (100 / colorList?.length))]
    const isFinishedTaskAmountLgThanZero = finishedTaskAmount > 0
    const taskCounter = finishedTaskAmount + '/' + totalTaskAmount
    return [progressRate, progressColor, isFinishedTaskAmountLgThanZero, taskCounter]
  }, [finishedTaskAmount, totalTaskAmount, colorList])

  return (
    <div sx={styles.progressBarContainer} style={{ backgroundColor: backgroundColor }}>
      {!isFinishedTaskAmountLgThanZero && taskCounter}
      <div sx={styles.progressBar} style={{ backgroundColor: progressColor, width: progressRate + '%' }}>
        {isFinishedTaskAmountLgThanZero && (
          <span>{taskCounter}</span>
        )}
      </div>
    </div>
  )
}

export default ProgressBar