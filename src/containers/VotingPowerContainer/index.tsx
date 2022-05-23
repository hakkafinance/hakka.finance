import { formatUnits } from 'ethers/lib/utils';
import React, { useMemo } from 'react';
import VotingPowerArea from '../../components/StakingPage/VotingPower';
import { Zero } from '@ethersproject/constants';
import { ChainId } from '../../constants';
import { useStakingData } from '../../data/StakingData';
import useVotingPower from '../../hooks/useVotingPower';
import { v1PowerWeighting } from '../../utils/votingPowerCal';
const startDateSec = ~~(new Date('2022-05-16 17:00:00').getTime() / 1000);
const availableList = [ChainId.MAINNET, ChainId.BSC, ChainId.POLYGON];
if (process.env.NODE_ENV === 'development') {
  availableList.push(ChainId.KOVAN);
}
const VotingPowerContainer = () => {
  const { votingPower } = useStakingData(); // this is v1 sHakka voting power
  const { votingPowerInfo } = useVotingPower();
  const [
    totalVotingPower,
    v1Weight,
    v2Weight,
    v1Proportion,
    v2Proportion,
    v2EthProportion,
    v2BscProportion,
    v2PolygonProportion,
    // v2KovanProportion,
  ] = useMemo(() => {
    const v1Weight = v1PowerWeighting(
      (Date.now() / 1000 - startDateSec) / 3600
    );
    const v2Weight = v1Weight.sub(1).abs();
    const v1VotingPower = parseFloat(votingPower.toExact());
    const v2VotingPower = parseFloat(
      formatUnits(
        availableList.reduce((total, chainId) => {
          return (votingPowerInfo[chainId] || Zero).add(total);
        }, Zero)
      )
    );
    const totalVotingPower = v1VotingPower + v2VotingPower;
    const v1Proportion = v1Weight
      .mul((v1VotingPower / totalVotingPower) * 100)
      .toFixed(2);
    const v2Proportion = v2Weight
      .mul((v2VotingPower / totalVotingPower) * 100)
      .toFixed(2);

    const v2ProportionList = availableList.map((chainId) => {
      if (!votingPowerInfo[chainId]) {
        return '-';
      }
      return parseFloat(formatUnits(votingPowerInfo[chainId])).toFixed(2);
    });
    return [
      totalVotingPower?.toFixed(2),
      v1Weight.toFixed(4),
      v2Weight.toFixed(4),
      v1Proportion,
      v2Proportion,
      ...v2ProportionList,
    ];
  }, [votingPowerInfo, votingPower, ~~(Date.now() / 60000)]);

  return (
    <VotingPowerArea
      totalVotingPower={totalVotingPower}
      v1VotingPowerProportion={v1Proportion}
      v2VotingPowerProportion={v2Proportion}
      ethProportion={v2EthProportion}
      bscProportion={v2BscProportion}
      polygonProportion={v2PolygonProportion}
      v1VotingPowerWeight={v1Weight}
      v2VotingPowerWeight={v2Weight}
    />
  );
};

export default VotingPowerContainer;
