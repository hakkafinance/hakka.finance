/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useMemo } from 'react'
import { Box } from 'rebass';
import { navigate } from 'gatsby';
import Web3Status from '../../Web3Status';
import styles from './styles';
import images from '../../../images';
import { MissionStatusOptions, MISSION_STATUS, OAT_INFO } from '../../../constants/challenge';
import { MyButton } from '../../Common';

interface ChallengeDetailPageProps {
  oatAddress: string;
}

const ChallengeDetailPage = ({ oatAddress }: ChallengeDetailPageProps) => {
  // TODO: get this status
  const missionStatus = MissionStatusOptions.FINISHED
  const isMissionUnfinished = useMemo(() =>  missionStatus === MissionStatusOptions.UNFINISHED, [missionStatus])

  return (
    <div sx={styles.container}>
      <div sx={styles.detailPageWrapper}>
        <div sx={styles.header}>
          <p>Play To Earn</p>
          <Web3Status />
        </div>
        <div sx={{ display: 'inline-block', marginBottom: '35px', textDecoration: 'none', }} onClick={() => navigate('/challenge')}>
          <div sx={styles.btnBack}>
            <img src={images.iconBack} />
            <span>Back to mission lists</span>
          </div>
        </div>
        <div sx={styles.mainLayout}>
          <div sx={styles.oatWrapper}>
            <div sx={styles.fakeImg} />
            {/* TODO: img is not ready */}
            {/* <img src={OAT_INFO[oatAddress].img} /> */}
            <img src={images.iconOat} />
          </div>
          <div>
            <div sx={styles.infoHeader}>
              <p sx={styles.missionIndex}>Mission {OAT_INFO[oatAddress].missionIndex}</p>
              <div 
                sx={styles.statusItem} 
                style={{ background: MISSION_STATUS[missionStatus].color }}
              >
                {MISSION_STATUS[missionStatus].content}
              </div>
            </div>
            <h4 sx={styles.missionTitle}>{OAT_INFO[oatAddress].describeTitle}</h4>
            <div sx={styles.buttonWrapper}>
              <MyButton 
                onClick={() => navigate(OAT_INFO[oatAddress].missionLink || '/')}
                styleKit={isMissionUnfinished ? 'green' : ''}
                disabled={!isMissionUnfinished}
              >
                Start Here
              </MyButton>
              <Box sx={{ marginRight: '24px' }}/>
              <MyButton 
                onClick={() => window.open(OAT_INFO[oatAddress].claimLink, '_blank').focus()} 
                styleKit={isMissionUnfinished ? '' : 'green'}
              >
                {missionStatus === MissionStatusOptions.FINISHED ? 'Claim NFT' : 'View NFT'}
              </MyButton>
            </div>
            <p sx={styles.describeContent}>{OAT_INFO[oatAddress].describeContent}</p>
            <p sx={styles.hintTitle}>How to complete the challenge: </p>
            <ul sx={styles.ul}>
              {OAT_INFO[oatAddress].hint?.map(hint => (<li>{hint}</li>))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChallengeDetailPage