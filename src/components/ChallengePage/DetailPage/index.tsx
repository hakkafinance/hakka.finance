/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react'
import { Box } from 'rebass';
import { navigate } from 'gatsby';
import Web3Status from '../../Web3Status';
import styles from './styles';
import images from '../../../images';
import { OAT_INFO } from '../../../constants/challenge';
import { MyButton } from '../../Common';

interface ChallengeDetailPageProps {
  oatAddress: string;
}

const ChallengeDetailPage = ({ oatAddress }: ChallengeDetailPageProps) => {
  return (
    <div sx={styles.container}>
      <div sx={styles.detailPageWrapper}>
        <div sx={styles.header}>
          <p>Play To Earn</p>
          <Web3Status />
        </div>
        <a sx={{ display: 'inline-block', textDecoration: 'none', }} href='/challenge'>
          <div sx={styles.btnBack}>
            <img src={images.iconBack} />
            <span>Back to mission lists</span>
          </div>
        </a>
        <div sx={styles.mainLayout}>
          <div sx={styles.oatWrapper}>
            <div sx={styles.fakeImg} />
            {/* TODO: img is not ready */}
            {/* <img src={OAT_INFO[oatAddress].img} /> */}
            <div sx={styles.smallFakeImg} />
            {/* <img /> */}
          </div>
          <div>
            <p>Mission {OAT_INFO[oatAddress].missionIndex}</p>
            <h4>{OAT_INFO[oatAddress].describeTitle}</h4>
            <div sx={styles.buttonWrapper}>
              <MyButton onClick={() => navigate(OAT_INFO[oatAddress].missionLink || '/')}>
                Start Here
              </MyButton>
              <Box sx={{ marginRight: '10px' }}/>
              <MyButton 
                onClick={() => window.open(OAT_INFO[oatAddress].claimLink, '_blank').focus()} 
                styleKit='green'
              >
                Claim NFT
              </MyButton>
            </div>
            <p>{OAT_INFO[oatAddress].describeContent}</p>
            <p>How to complete the challenge: </p>
            <ul>
              {OAT_INFO[oatAddress].hint?.map(hint => (<li>{hint}</li>))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChallengeDetailPage