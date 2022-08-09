/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react'
import styles from './styles';
import images from '../../../images';
import ProgressBar from '../../Common/ProgressBar';

interface CharacterStatusProps {
  address?: string;
  level?: number;
  characterTitle?: string;
  description?: string;
  totalTaskAmount: number;
  finishedTaskAmount: number;
}

const CharacterStatus = ({ address, level, characterTitle, description, totalTaskAmount, finishedTaskAmount }: CharacterStatusProps) => {
  return (
    <div sx={styles.container}>
      <div sx={styles.levelContainer}>Level {level}</div>
      <div sx={styles.mainLayout}>
        <img src={images.iconMockProfile} />
        <div sx={styles.infoSection}>
          <p sx={styles.address}>{address}</p>
          <h4>{characterTitle}</h4>
          <p sx={styles.descriptionSection}>{description}</p>
          <div sx={styles.progressBarContainer}>
            <ProgressBar 
              totalTaskAmount={totalTaskAmount}
              finishedTaskAmount={finishedTaskAmount}
            />
            <span>Next Level</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterStatus