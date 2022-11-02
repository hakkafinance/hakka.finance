import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import throttle from "lodash/throttle";
import { AddressZero } from '@ethersproject/constants';
import { PROJECT_GALAXY_CAMPAIGN_INFO } from "../apollo/queries";
import projectGalaxyClient from "../gatsby-plugin-apollo/client";
import { useBlockNumber } from "../state/application/hooks";
import { useWeb3React } from "@web3-react/core";
import { MissionStatusOptions } from "../constants/challenge";

export interface CampaignsInfoType {[key: string]: {maxCount: number, usedCount: number, status: MissionStatusOptions}}

const useProjectGalaxyCampaignsInfo = () => {
  const [campaignsInfo, setCampaignsInfo] = useState<CampaignsInfoType>()
  const latestBlockNumber = useBlockNumber();
  const { account } = useWeb3React();

  const querySetting = useMemo(() => {
    return {
      client: projectGalaxyClient,
      skip: !account,
    }}, [projectGalaxyClient, account])

  const campaignInfo_GCGnZUtqDE = useQuery(PROJECT_GALAXY_CAMPAIGN_INFO, {
    variables: { account, campaignId: 'GCGnZUtqDE'},
    ...querySetting
  })

  const campaignInfo_GCr8yUtQN5 = useQuery(PROJECT_GALAXY_CAMPAIGN_INFO, {
    variables: { account, campaignId: 'GCr8yUtQN5'},
    ...querySetting
  })

  const campaignInfo_GCBryUtyo7 = useQuery(PROJECT_GALAXY_CAMPAIGN_INFO, {
    variables: { account, campaignId: 'GCBryUtyo7'},
    ...querySetting
  })

  const campaignInfo_GCBCyUtZRy = useQuery(PROJECT_GALAXY_CAMPAIGN_INFO, {
    variables: { account, campaignId: 'GCBCyUtZRy'},
    ...querySetting
  })

  const campaignInfo_GCdueUtHjz = useQuery(PROJECT_GALAXY_CAMPAIGN_INFO, {
    variables: { account, campaignId: 'GCdueUtHjz'},
    ...querySetting
  })

  const campaignInfo_GCD5yUt73A = useQuery(PROJECT_GALAXY_CAMPAIGN_INFO, {
    variables: { account, campaignId: 'GCD5yUt73A'},
    ...querySetting
  })
  const campaignInfo_GCxTdUwieL = useQuery(PROJECT_GALAXY_CAMPAIGN_INFO, {
    variables: { account, campaignId: 'GCxTdUwieL'},
    ...querySetting
  })

  const campaignInfo_GCv7dUwr2V = useQuery(PROJECT_GALAXY_CAMPAIGN_INFO, {
    variables: { account, campaignId: 'GCv7dUwr2V'},
    ...querySetting
  })

  const throttleSetCampaignsInfo = useMemo(
    () => throttle(setCampaignsInfo, 2000),
    []
  );

  useEffect(() => {
    if (account === AddressZero || !account) return;
    const campaignInfos = [
      campaignInfo_GCGnZUtqDE,
      campaignInfo_GCr8yUtQN5,
      campaignInfo_GCBryUtyo7,
      campaignInfo_GCBCyUtZRy,
      campaignInfo_GCdueUtHjz,
      campaignInfo_GCD5yUt73A,
      campaignInfo_GCxTdUwieL,
      campaignInfo_GCv7dUwr2V,
    ];
    const queryResults = {}
    campaignInfos.forEach((campaignInfo) => {
      if(campaignInfo.data && campaignInfo.variables?.campaignId) {
        queryResults[campaignInfo.variables.campaignId] = { 
          maxCount: campaignInfo.data.campaign.whitelistInfo.maxCount, 
          usedCount: campaignInfo.data.campaign.whitelistInfo.usedCount,
          status: campaignInfo.data.campaign.whitelistInfo.maxCount === 0 
            ? MissionStatusOptions.UNFINISHED
            : campaignInfo.data.campaign.whitelistInfo.usedCount > 0
            ? MissionStatusOptions.COMPLETED
            : MissionStatusOptions.FINISHED
        }
      }
    })
    throttleSetCampaignsInfo(queryResults);
  }, [
    latestBlockNumber, 
    account, 
    campaignInfo_GCGnZUtqDE,
    campaignInfo_GCr8yUtQN5,
    campaignInfo_GCBryUtyo7,
    campaignInfo_GCBCyUtZRy,
    campaignInfo_GCdueUtHjz,
    campaignInfo_GCD5yUt73A,
    campaignInfo_GCxTdUwieL,
    campaignInfo_GCv7dUwr2V,
  ]);

  return campaignsInfo
}

export default useProjectGalaxyCampaignsInfo