import { useEffect, useState } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { ChainId } from '../../constants';
import useFetchVestingInfo from './useFetchVestingInfo';

export type VestingInfoType = {
  [chainId in ChainId]?: {vestingValue?: BigNumber, vestingProportion?: BigNumber, lastWithdrawalTime?: BigNumber};
};

export default function useVestingInfo(): {
  vestingInfo: VestingInfoType;
} {
  const [vestingInfo, setVestingInfo] = useState<VestingInfoType>();

  const { fetchVestingInfoResult: mainnetVestingInfo } = useFetchVestingInfo(ChainId.MAINNET);
  const { fetchVestingInfoResult: bscVestingInfo } = useFetchVestingInfo(ChainId.BSC);
  const { fetchVestingInfoResult: fantomVestingInfo } = useFetchVestingInfo(ChainId.FANTOM);
  const { fetchVestingInfoResult: polygonVestingInfo } = useFetchVestingInfo(ChainId.POLYGON);
  const { fetchVestingInfoResult: kovanVestingInfo } = useFetchVestingInfo(ChainId.KOVAN);

  useEffect(() => {
    setVestingInfo(Object.fromEntries([
      mainnetVestingInfo || [[ChainId.MAINNET], undefined], 
      bscVestingInfo || [[ChainId.BSC], undefined], 
      fantomVestingInfo || [[ChainId.FANTOM], undefined], 
      polygonVestingInfo || [[ChainId.POLYGON], undefined], 
      kovanVestingInfo || [[ChainId.KOVAN], undefined]
    ]));
  }, [mainnetVestingInfo, bscVestingInfo, fantomVestingInfo, polygonVestingInfo, kovanVestingInfo]);

  return { vestingInfo };
}
