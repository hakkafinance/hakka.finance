/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useEffect, useMemo } from 'react'
import { navigate } from 'gatsby';
import Web3Status from '../../Web3Status';
import styles from './styles';
import images from '../../../images';
import { MissionStatusOptions, MISSION_STATUS, OAT_INFO } from '../../../constants/challenge';
import { MyButton } from '../../Common';
import useProjectGalaxyCampaignsInfo from '../../../hooks/useProjectGalaxyCampaignsInfo';

interface ChallengeDetailPageProps {
  oatAddress: string;
}

const ChallengeDetailPage = ({ oatAddress }: ChallengeDetailPageProps) => {
  const campaignsInfo = useProjectGalaxyCampaignsInfo()
  const missionStatus = campaignsInfo?.[oatAddress]?.status || MissionStatusOptions.UNFINISHED
  const isMissionUnfinished = useMemo(() =>  missionStatus === MissionStatusOptions.UNFINISHED, [missionStatus])
  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    if (!isBrowser) {
      return
    }
    const localStorageViewedPages = window.localStorage.getItem('viewed-pages') 
    const viewedPages: string[] = localStorageViewedPages ? JSON.parse(localStorageViewedPages) : []

    if (viewedPages.findIndex((address) => address === oatAddress) === -1) {
      viewedPages.push(oatAddress)
      window.localStorage.setItem('viewed-pages', JSON.stringify(viewedPages))
    }
  }, [])

  return (
    <div sx={styles.container}>
      <div sx={styles.detailPageWrapper}>
        <div sx={styles.header}>
          <p>Play To Earn</p>
          <Web3Status />
        </div>
        <div sx={{ display: 'inline-block', marginBottom: '35px', textDecoration: 'none', }} onClick={() => navigate('/play2earn')}>
          <div sx={styles.btnBack}>
            <img src={images.iconBack} />
            <span>Back to mission list</span>
          </div>
        </div>
        <div sx={styles.mainLayout}>
          <div sx={styles.oatWrapper}>
            <img sx={styles.oat} src={images[OAT_INFO[oatAddress].img]} />
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
                onClick={() => window.open(OAT_INFO[oatAddress].missionLink, '_blank', 'noopener, noreferrer')} 
                styleKit={isMissionUnfinished ? 'green' : ''}
                disabled={!isMissionUnfinished}
              >
                Start Here
              </MyButton>
              <MyButton 
                onClick={() => window.open(OAT_INFO[oatAddress].claimLink, '_blank', 'noopener, noreferrer')} 
                styleKit={isMissionUnfinished ? '' : 'green'}
              >
                {missionStatus === MissionStatusOptions.FINISHED ? 'Claim NFT' : 'View NFT'}
              </MyButton>
            </div>
            <p sx={styles.describeContent}>{OAT_INFO[oatAddress].describeContent}</p>
            <p sx={styles.hintTitle}>How to complete the mission: </p>
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