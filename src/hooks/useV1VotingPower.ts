import { AddressZero } from '@ethersproject/constants';
import {
  Contract as MulticallContract,
  Provider as MulticallProvider,
} from '@pelith/ethers-multicall';
import { useWeb3React } from '@web3-react/core';
import {
  JSON_RPC_PROVIDER,
  STAKING_ADDRESSES,
} from '../constants';
import throttle from 'lodash/throttle';
import { BigNumber } from '@ethersproject/bignumber';
import { ChainId } from '../constants';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBlockNumber } from '../state/application/hooks';
import STAKING_V1_ABI from '../constants/abis/shakka_v1.json';

export default function useV1VotingPower(): {
  v1VotingPower: BigNumber;
} {
  const { account } = useWeb3React();
  const latestBlockNumber = useBlockNumber();
  const [v1VotingPower, setV1VotingPower] = useState<BigNumber>();

  const getV1VotingPower = useCallback(
    async (
      account: string
    ): Promise<BigNumber> => {
      if (account === AddressZero || !account) return undefined;
      const multicallProvider = new MulticallProvider(
        JSON_RPC_PROVIDER[ChainId.MAINNET],
        ChainId.MAINNET
      );
      const sHakkaContract = new MulticallContract(
        STAKING_ADDRESSES[ChainId.MAINNET],
        STAKING_V1_ABI
      );
      const [votingPower] = await multicallProvider.all([
        sHakkaContract.votingPower(account),
      ]);
      return votingPower as BigNumber;
    },
    []
  );

  const fetchV1VotingPower = useCallback(async (account: string) => {
    try {
      const [v1VotingPower] = await Promise.all([
        getV1VotingPower(account),
      ]);

      setV1VotingPower(v1VotingPower);
    } catch (e) {
      console.error(e);
      console.log('fetch user v1 voting power error');
    }
  }, []);

  const throttledFetchV1VotingPower = useMemo(
    () => throttle(fetchV1VotingPower, 2000),
    []
  );

  useEffect(() => {
    throttledFetchV1VotingPower(account);
  }, [latestBlockNumber, account]);

  return { v1VotingPower };
}
