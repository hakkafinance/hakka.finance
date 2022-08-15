/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react'
import styles from './styles';
import { MissionStatusOptions, MISSION_STATUS } from '../../../constants/challenge';

interface HintItemProps {
  bgColor: string;
  content: string;
}

const HintItem = ({ bgColor, content }: HintItemProps) => {
  return (
    <div sx={styles.hintItem}>
      <div sx={styles.dot} style={{ backgroundColor: bgColor }} />
      <p>{content}</p>
    </div>
  )
}

const MissionStatusHint = () => {
  return (
    <div sx={styles.container}>
      <HintItem content={MISSION_STATUS[MissionStatusOptions.UNFINISHED].content} bgColor={MISSION_STATUS[MissionStatusOptions.UNFINISHED].color} />
      <HintItem content={MISSION_STATUS[MissionStatusOptions.FINISHED].content} bgColor={MISSION_STATUS[MissionStatusOptions.FINISHED].color} />
      <HintItem content={MISSION_STATUS[MissionStatusOptions.COMPLETED].content} bgColor={MISSION_STATUS[MissionStatusOptions.COMPLETED].color} />
    </div>
  )
}

export default MissionStatusHint