import { JSON_RPC_PROVIDER } from './../../constants/index';
import {
  Contract as MulticallContract,
  Provider as MulticallProvider,
} from '@pelith/ethers-multicall';
import { useWeb3React } from '@web3-react/core';
import {
  ChainDataFetchingState,
  VESTING_ADDRESSES,
  ChainId,
} from '../../constants';
import throttle from 'lodash/throttle';
import { BigNumber } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';
import { useEffect, useMemo, useState } from 'react';
import { useBlockNumber } from '../../state/application/hooks';
import VESTING_ABI from '../../constants/abis/vesting.json';

export type VestingInfoType = {
  [chainId in ChainId]?: {vestingValue?: BigNumber, vestingProportion?: BigNumber, lastWithdrawalTime?: BigNumber};
};

export default function useVestingInfo(): {
  vestingInfo: VestingInfoType;
  fetchDataState: ChainDataFetchingState;
} {
  const { account } = useWeb3React();
  const latestBlockNumber = useBlockNumber();
  const [vestingInfo, setVestingInfo] = useState<
    VestingInfoType
  >();
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const fetchDataState: ChainDataFetchingState = useMemo(() => {
    return transactionSuccess
      ? ChainDataFetchingState.SUCCESS
      : ChainDataFetchingState.LOADING;
  }, [transactionSuccess]);

  const providers = JSON_RPC_PROVIDER;

  const getVestingInfo = async (chainId: ChainId, account: string) => {
    const multicallProvider = new MulticallProvider(
      providers[chainId],
      chainId
    );
    if (VESTING_ADDRESSES[chainId] === AddressZero)
      return [chainId, undefined];
    const vestingContract = new MulticallContract(
        VESTING_ADDRESSES[chainId],
        VESTING_ABI
    );
    const [vestingValue, vestingProportion, lastWithdrawalTime] = await multicallProvider.all([
        vestingContract.balanceOf(account),
        vestingContract.proportion(),
        vestingContract.lastWithdrawalTime(account),
    ]);
    return [chainId, {vestingValue, vestingProportion, lastWithdrawalTime}];
  };

  const fetchVestingInfo = async (account: string) => {
    setTransactionSuccess(false);
    try {
      const vestingInfoList = [
        getVestingInfo(ChainId.MAINNET, account),
        getVestingInfo(ChainId.BSC, account),
        getVestingInfo(ChainId.POLYGON, account),
        getVestingInfo(ChainId.FANTOM, account),
      ];
      if (process.env.GATSBY_ENV === 'development') {
        vestingInfoList.push(
          getVestingInfo(ChainId.KOVAN, account),
        );
      }

      const vestingInfoResults = await Promise.all(vestingInfoList);
      setVestingInfo(Object.fromEntries(vestingInfoResults));
      setTransactionSuccess(true);
    } catch (e) {
      console.log(e);
      console.log('fetch user vesting info error');
    }
  };

  const throttledFetchVestingInfo = useMemo(
    () => throttle(fetchVestingInfo, 2000),
    []
  );

  useEffect(() => {
    if (account === AddressZero || !account) return;
    throttledFetchVestingInfo(account);
  }, [latestBlockNumber, account]);

  return { vestingInfo, fetchDataState };
}
