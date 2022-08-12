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
}

const MissionSection = ({ campaignsInfo }: MissionSectionProps) => {
  return (
    <div>
      <div sx={styles.missionHeader}>
        <h4>Missions</h4>
        {/* TODO: link is not ready */}
        {!isMobile && (
          <div sx={{ width: '160px' }}>
            <MyButton onClick={() => {}}>View my NFTs</MyButton>
          </div>
        )}
      </div>
      {isMobile && <MissionStatusHint />}
      {Object.keys(LevelInfo).map((levelValue, index) =>
        <div sx={styles.missionItemWrapper}>
          <Accordion headerContent={`level ${levelValue}`} key={index}>
            {LevelInfo[levelValue].missionList.map((oatAddress, index) => (
              <div key={index}>
                <MissionItem
                  oatAddress={oatAddress}
                  // TODO: check status
                  missionStatus={campaignsInfo?.[oatAddress]?.status || MissionStatusOptions.UNFINISHED}
                />
                <hr sx={styles.hr} />
              </div>
            ))}
            <MissionItem
              missionStatus={MissionStatusOptions.UPCOMING} 
            />
          </Accordion>
        </div>
      )}
    </div>
  )
}

export default MissionSection