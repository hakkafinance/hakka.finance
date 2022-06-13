import { AddressZero, Zero } from '@ethersproject/constants';
import {
  Contract as MulticallContract,
  Provider as MulticallProvider,
} from '@pelith/ethers-multicall';
import { useWeb3React } from '@web3-react/core';
import {
  ChainDataFetchingState,
  NEW_SHAKKA_ADDRESSES,
  JSON_RPC_PROVIDER,
} from '../constants';
import throttle from 'lodash/throttle';
import { BigNumber } from '@ethersproject/bignumber';
import { ChainId } from '../constants';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBlockNumber } from '../state/application/hooks';
import STAKING_ABI from '../constants/abis/shakka.json';

export type VotingPowerType = {
  [chainId in ChainId]: BigNumber;
};

export default function useVotingPower(): {
  votingPowerInfo: VotingPowerType;
  fetchVotingPowerState: ChainDataFetchingState;
} {
  const { account } = useWeb3React();
  const latestBlockNumber = useBlockNumber();
  const [votingPowerInfo, setVotingPowerInfo] = useState<VotingPowerType>({});
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  const fetchDataState: ChainDataFetchingState = useMemo(() => {
    return transactionSuccess
      ? ChainDataFetchingState.SUCCESS
      : ChainDataFetchingState.LOADING;
  }, [transactionSuccess]);

  const providers = JSON_RPC_PROVIDER;
  const getVotingPower = useCallback(
    async (
      chainId: ChainId,
      account: string
    ): Promise<[ChainId, BigNumber]> => {
      if (NEW_SHAKKA_ADDRESSES[chainId] === AddressZero) return [chainId, undefined];
      if (account === AddressZero || !account) return [chainId, undefined];
      const multicallProvider = new MulticallProvider(
        providers[chainId],
        chainId
      );
      const sHakkaContract = new MulticallContract(
        NEW_SHAKKA_ADDRESSES[chainId],
        STAKING_ABI
      );
      const [votingPower] = await multicallProvider.all([
        sHakkaContract.votingPower(account),
      ]);
      return [chainId, votingPower as BigNumber];
    },
    []
  );

  const fetchVotingPower = useCallback(async (account: string) => {
    setTransactionSuccess(false);
    try {
      const votingPowerList = await Promise.all([
        getVotingPower(ChainId.MAINNET, account),
        [ChainId.BSC, Zero],
        [ChainId.POLYGON, Zero],
        getVotingPower(ChainId.KOVAN, account),
        getVotingPower(ChainId.RINKEBY, account),
      ]);

      setVotingPowerInfo(
        Object.fromEntries(votingPowerList) as typeof votingPowerInfo
      );
      setTransactionSuccess(true);
    } catch (e) {
      console.log(e);
      console.log('fetch user voting power error');
    }
  }, []);

  const throttledFetchVotingPower = useMemo(
    () => throttle(fetchVotingPower, 2000),
    []
  );

  useEffect(() => {
    throttledFetchVotingPower(account);
  }, [latestBlockNumber, account]);

  return { votingPowerInfo, fetchVotingPowerState: fetchDataState };
}
