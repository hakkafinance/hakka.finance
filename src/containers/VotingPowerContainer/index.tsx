import { formatUnits } from 'ethers/lib/utils';
import React, { useMemo } from 'react'
import VotingPowerArea from '../../components/StakingPage/VotingPower';
import { ChainId } from '../../constants';
import { useStakingData } from '../../data/StakingData';
import useVotingPower from '../../hooks/useVotingPower';

const VotingPowerContainer = () => {
  const { votingPower } = useStakingData(); // this is v1 sHakka voting power
  const { votingPowerInfo } = useVotingPower();
  const [totalVotingPower, v1Proportion, v2Proportion, v2EthProportion, v2BscProportion, v2PolygonProportion] = useMemo(() => {
    if (votingPowerInfo && votingPower){
      const v1VotingPower = parseFloat(votingPower.toExact()) * 0.8;
      const v2VotingPower = parseFloat(formatUnits(votingPowerInfo[ChainId.MAINNET].add(votingPowerInfo[ChainId.BSC]).add(votingPowerInfo[ChainId.POLYGON])));
      const totalVotingPower = v1VotingPower + v2VotingPower;
      const v1Proportion = (v1VotingPower / totalVotingPower * 100).toFixed(2);
      const v2Proportion = (v2VotingPower / totalVotingPower * 100).toFixed(2);
      const v2EthProportion = (parseFloat(formatUnits(votingPowerInfo[ChainId.MAINNET])) / v2VotingPower * 100).toFixed(2);
      const v2BscProportion = (parseFloat(formatUnits(votingPowerInfo[ChainId.BSC])) / v2VotingPower * 100).toFixed(2);
      const v2PolygonProportion = (parseFloat(formatUnits(votingPowerInfo[ChainId.POLYGON])) / v2VotingPower * 100).toFixed(2);
      return [totalVotingPower?.toFixed(2), v1Proportion, v2Proportion, v2EthProportion, v2BscProportion, v2PolygonProportion];
    }
    return [];
  }, [votingPowerInfo, votingPower]);

  return (
    <VotingPowerArea 
      totalVotingPower={totalVotingPower} 
      v1VotingPowerProportion={v1Proportion} 
      v2VotingPowerProportion={v2Proportion} 
      ethProportion={v2EthProportion} 
      bscProportion={v2BscProportion} 
      polygonProportion={v2PolygonProportion} 
    />
  )
}

export default VotingPowerContainer