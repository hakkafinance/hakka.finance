import { formatUnits } from 'ethers/lib/utils';
import React, { useMemo } from 'react';
import VotingPowerArea from '../../components/StakingPage/VotingPower';
import { Zero } from '@ethersproject/constants';
import { ChainId } from '../../constants';
import useVotingPower from '../../hooks/useVotingPower';
import { v1PowerWeighting } from '../../utils/votingPowerCal';
import useV1VotingPower from '../../hooks/useV1VotingPower';
const startDateSec = ~~(new Date('2022-06-30 18:00:00').getTime() / 1000);
const availableList = [ChainId.MAINNET, ChainId.BSC, ChainId.POLYGON];
if (process.env.GATSBY_ENV === 'development') {
  availableList.push(ChainId.KOVAN, ChainId.RINKEBY);
}

export enum StakingVersion {
  V1,
  V2,
};
interface VotingPowerContainerProps {
  stakingVersion?: StakingVersion
}

const VotingPowerContainer = ({ stakingVersion }: VotingPowerContainerProps) => {
  const { v1VotingPower } = useV1VotingPower();
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
    const weightedV1VotingPower = v1Weight.mul(parseFloat(formatUnits(v1VotingPower || Zero)));
    const weightedV2VotingPower = v2Weight.mul(parseFloat(
      formatUnits(
        availableList.reduce((total, chainId) => {
          return (votingPowerInfo[chainId] || Zero).add(total);
        }, Zero)
      )
    ));
    const totalVotingPower = weightedV1VotingPower.add(weightedV2VotingPower);
    const v1Proportion = totalVotingPower.gt(0) ? weightedV1VotingPower.div(totalVotingPower).mul(100) : 0;
    const v2Proportion = totalVotingPower.gt(0) ? weightedV2VotingPower.div(totalVotingPower).mul(100) : 0;

    const v2ProportionSum = availableList.reduce(
      (previousValue, currentChainId) => {
        if (!votingPowerInfo[currentChainId]) {
          return previousValue;
        }
        return previousValue + parseFloat(formatUnits(votingPowerInfo[currentChainId]));
      },
      0
    );

    const v2ProportionList = availableList.map((chainId) => {
      if (!votingPowerInfo[chainId]) {
        return '-';
      }
      return (parseFloat(formatUnits(votingPowerInfo[chainId])) / v2ProportionSum * 100).toFixed(2);
    });
    return [
      totalVotingPower?.toFixed(2),
      v1Weight.toFixed(2),
      v2Weight.toFixed(2),
      v1Proportion.toFixed(2),
      v2Proportion.toFixed(2),
      ...v2ProportionList,
    ];
  }, [votingPowerInfo, v1VotingPower, ~~(Date.now() / 60000)]);

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
      stakingVersion={stakingVersion}
    />
  );
};

export default VotingPowerContainer;
