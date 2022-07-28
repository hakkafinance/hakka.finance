/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { ReactElement } from 'react'
import styles from './styles';

interface MissionCardProps {
  index?: number;
  rewardInfo?: ReactElement; 
  title?: string;
  content?: string;
  oatImg?: string;
  missionLink?: string;
  claimLink?: string;
}

const MissionCard = ({
  index, 
  rewardInfo, 
  title, 
  content, 
  oatImg,
  missionLink, 
  claimLink
}: MissionCardProps) => {
  return (
    <div sx={styles.container}>
      <div sx={styles.statusWrapper}>{rewardInfo}</div>
      <div sx={styles.contentWrapper}>
        <div>
          <p>Task {index}</p>
          <h4>{title}</h4>
          <p sx={{ maxWidth: '400px' }}>{content}</p>
          <a href={missionLink} target="_blank">
            <button sx={styles.linkBtn}>Mission Link</button>
          </a>
          <a href={claimLink} target="_blank">
            <button sx={styles.linkBtn}>Claim Link</button>
          </a>
        </div>
        <div sx={{ width: '200px', height: '200px', border: '1px solid red'}}>
          <img />
        </div>
      </div>
    </div>
  )
}

export default MissionCard