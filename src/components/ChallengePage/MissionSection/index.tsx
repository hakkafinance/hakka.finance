/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react'
import { isMobile } from 'react-device-detect';
import { MyButton } from '../../Common';
import Accordion from '../../Common/Accordion';
import MissionStatusHint from '../MissionStatusHint';
import MissionItem from '../MissionItem';
import styles from './styles';
import { LevelInfo, MissionStatusOptions, OAT_INFO } from '../../../constants/challenge';

import { CampaignsInfoType } from '../../../hooks/useProjectGalaxyCampaignsInfo';


interface MissionSectionProps {
  campaignsInfo: CampaignsInfoType | undefined
  isLoaded: boolean
  userLevel: number
}

const MissionSection = ({ campaignsInfo, isLoaded, userLevel }: MissionSectionProps) => {
  return (
    <div>
      <div sx={styles.missionHeader}>
        <h4>Missions</h4>
        {!isMobile && (
          <div sx={{ width: '160px' }}>
            <MyButton onClick={() => window.open('https://galaxy.eco/galaxyid', '_blank').focus()} >
              View my NFTs
            </MyButton>
          </div>
        )}
      </div>
      {isMobile && <MissionStatusHint />}
      {Object.keys(LevelInfo).reverse().map((levelValue, index) => {
        if (userLevel >= parseInt(levelValue)) {
          return (
            <div sx={styles.missionItemWrapper}>
              <Accordion 
                headerContent={`level ${levelValue}`} 
                headerBgColor={LevelInfo[levelValue].levelColor} 
                isDefaultOpen={userLevel === parseInt(levelValue)}
                key={index}
              >
                {LevelInfo[levelValue].missionList.map((oatAddress, index) => (
                  <div key={index}>
                    <MissionItem
                      oatAddress={oatAddress}
                      missionStatus={campaignsInfo?.[oatAddress]?.status || MissionStatusOptions.UNFINISHED}
                      isLoaded={isLoaded}
                    />
                    <hr sx={styles.hr} />
                  </div>
                ))}
                <MissionItem
                  missionStatus={MissionStatusOptions.UPCOMING} 
                />
              </Accordion>
            </div>
          )
        }
      }
      )}
    </div>
  )
}

export default MissionSection