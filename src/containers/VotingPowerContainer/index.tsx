import { formatUnits } from 'ethers/lib/utils';
import React, { useMemo } from 'react';
import VotingPowerArea from '../../components/StakingPage/VotingPower';
import { Zero } from '@ethersproject/constants';
import { ChainId } from '../../constants';
import { useStakingData } from '../../data/StakingData';
import useVotingPower from '../../hooks/useVotingPower';

const availableList = [ChainId.MAINNET, ChainId.BSC, ChainId.POLYGON];
if (process.env.NODE_ENV === 'development') {
  availableList.push(ChainId.KOVAN);
}
const VotingPowerContainer = () => {
  const { votingPower } = useStakingData(); // this is v1 sHakka voting power
  const { votingPowerInfo } = useVotingPower();
  const [
    totalVotingPower,
    v1Proportion,
    v2Proportion,
    v2EthProportion,
    v2BscProportion,
    v2PolygonProportion,
    // v2KovanProportion,
  ] = useMemo(() => {
    const v1VotingPower = parseFloat(votingPower.toExact()) * 0.8;
    const v2TotalPower = availableList.reduce((total, chainId) => {
      return (votingPowerInfo[chainId] || Zero).add(total);
    }, Zero);
    const v2VotingPower = parseFloat(formatUnits(v2TotalPower));
    const totalVotingPower = v1VotingPower + v2VotingPower;
    const v1Proportion = ((v1VotingPower / totalVotingPower) * 100).toFixed(2);
    const v2Proportion = ((v2VotingPower / totalVotingPower) * 100).toFixed(2);

    const v2ProportionList = availableList.map((chainId) => {
      if (!votingPowerInfo[chainId]) {
        return '-';
      }
      return parseFloat(formatUnits(votingPowerInfo[chainId])).toFixed(2);
    });
    return [
      totalVotingPower?.toFixed(2),
      v1Proportion,
      v2Proportion,
      ...v2ProportionList,
    ];
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
  );
};

export default VotingPowerContainer;
