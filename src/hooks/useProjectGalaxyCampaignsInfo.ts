import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { AddressZero } from '@ethersproject/constants';
import { PROJECT_GALAXY_CAMPAIGNS_INFO } from "../apollo/queries";
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

  const campaignsData = useQuery(PROJECT_GALAXY_CAMPAIGNS_INFO, {
      variables: { account },
      ...querySetting
    })

  useEffect(() => {
    if (account === AddressZero || !account || !campaignsData?.data ) return;
    const queryResults = {}
    campaignsData.data.space.campaigns.list.forEach((campaignInfo) => {
      queryResults[campaignInfo.id] = { 
        maxCount: campaignInfo.whitelistInfo.maxCount, 
        usedCount: campaignInfo.whitelistInfo.usedCount,
        status: campaignInfo.whitelistInfo.usedCount > 0
          ? MissionStatusOptions.COMPLETED
          : campaignInfo.whitelistInfo.maxCount === 0
          ? MissionStatusOptions.UNFINISHED
          : MissionStatusOptions.FINISHED
      }
    })
    setCampaignsInfo(queryResults);
  }, [
    latestBlockNumber, 
    account, 
    campaignsData
  ]);

  return campaignsInfo
}

export default useProjectGalaxyCampaignsInfo