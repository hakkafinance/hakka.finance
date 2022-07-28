/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react'
import styles from './styles'
import MissionCard from './MissionCard';

const Challenge = () => {
  return (
    <div sx={styles.container}>
      <div>
        <p>This is Challenge page</p>
        <MissionCard 
          index={1}
          rewardInfo={<span>Reward <br/> 500 HAKKA</span>}
          title='Title Title Title' 
          content='Content Content Content Content Content Content Content Content Content' 
          missionLink='' 
          claimLink='' 
        />
      </div>
    </div>
  )
}

export default Challenge