import { AddressZero, Zero } from '@ethersproject/constants';
import {
  Contract as MulticallContract,
  Provider as MulticallProvider,
} from '@pelith/ethers-multicall';
import { useWeb3React } from '@web3-react/core';
import { ChainDataFetchingState, NEW_SHAKKA_ADDRESSES } from '../constants';
import debounce from 'lodash.debounce';
import { BigNumber } from '@ethersproject/bignumber';
import { ChainId } from '../constants';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
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

  const providers = useMemo(() => {
    const ethProvider = new JsonRpcProvider(process.env.REACT_APP_NETWORK_URL);
    const bscProvider = new JsonRpcProvider(
      process.env.REACT_APP_BSC_NETWORK_URL
    );
    const polygonProvider = new JsonRpcProvider(
      process.env.REACT_APP_POLYGON_NETWORK_URL
    );
    const kovanProvider = new JsonRpcProvider(
      process.env.REACT_APP_KOVAN_NETWORK_URL
    );
    return {
      [ChainId.MAINNET]: ethProvider,
      [ChainId.BSC]: bscProvider,
      [ChainId.POLYGON]: polygonProvider,
      [ChainId.KOVAN]: kovanProvider,
    };
  }, []);

  const getVotingPower = useCallback(async (chainId: ChainId, account: string) => {
    if (NEW_SHAKKA_ADDRESSES[chainId] === AddressZero) return undefined;
    if (account === AddressZero || !account) return undefined;
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
    return votingPower;
  }, []);

  const fetchVotingPower = useCallback(async (account: string) => {
    setTransactionSuccess(false);
    try {
      const [
        ethVotingPower,
        bscVotingPower,
        polygonVotingPower,
        kovanVotingPower,
      ] = await Promise.all([
        getVotingPower(ChainId.MAINNET, account),
        getVotingPower(ChainId.BSC, account),
        getVotingPower(ChainId.POLYGON, account),
        getVotingPower(ChainId.KOVAN, account),
      ]);

      setVotingPowerInfo({
        [ChainId.MAINNET]: ethVotingPower,
        [ChainId.BSC]: bscVotingPower,
        [ChainId.POLYGON]: polygonVotingPower,
        [ChainId.KOVAN]: kovanVotingPower,
      });
      setTransactionSuccess(true);
    } catch (e) {
      console.log(e);
      console.log('fetch user voting power error');
    }
  }, []);

  const debouncedFetchVotingPower = useMemo(
    () => debounce(fetchVotingPower, 200, { leading: true, trailing: true }),
    []
  );

  useEffect(() => {
    debouncedFetchVotingPower(account);
  }, [latestBlockNumber, account]);

  return { votingPowerInfo, fetchVotingPowerState: fetchDataState };
}
