import { useMemo } from 'react';
import { formatUnits } from '@ethersproject/units';
import { Interface } from '@ethersproject/abi';
import { useActiveWeb3React } from '../hooks';

import { tryParseAmount } from '../utils';
import { useMultipleContractSingleData } from '../state/multicall/hooks';
import STAKING_REWARDS_ABI from '../constants/abis/staking_rewards.json';

export function useRewardsData(addresses: string[]) {
  const { chainId, account } = useActiveWeb3React();
  const REWARDS_INTERFACE = new Interface(STAKING_REWARDS_ABI);

  const depositBalances = useMultipleContractSingleData(
    addresses,
    REWARDS_INTERFACE,
    'balanceOf',
    [account],
  );

  const earnedBalances = useMultipleContractSingleData(
    addresses,
    REWARDS_INTERFACE,
    'earned',
    [account],
  );

  return useMemo(
    () => {
      if (!account || !depositBalances || !earnedBalances) {
        return {
          depositBalances: undefined,
          earnedBalances: undefined,
        }
      }
      
      const balance = {}
      const earned = {}
      addresses.map((address) => {
        balance[address] = tryParseAmount(formatUnits(depositBalances[addresses.indexOf(address)].result?.[0] ?? 0))
        earned[address] = tryParseAmount(formatUnits(earnedBalances[addresses.indexOf(address)].result?.[0] ?? 0))
      })
      return {
        depositBalances: balance,
        earnedBalances: earned,
      }
    },
    [chainId, depositBalances, earnedBalances],
  );
}
