import { JSBI, TokenAmount } from '@uniswap/sdk';
import { useMemo } from 'react';
import { useActiveWeb3React } from '../hooks';

import { getContract } from '../utils';
import { useSingleCallResult, useSingleContractMultipleData } from '../state/multicall/hooks';
import STAKING_ABI from '../constants/abis/shakka.json';
import {
  ChainId,
  HAKKA,
  STAKING_ADDRESSES,
  stakingMonth,
} from '../constants';

export function useStakingData(): { stakingBalance: TokenAmount, sHakkaBalance: TokenAmount, votingPower: TokenAmount, stakingRate: string[], vaults: any[] } {
  const { chainId, library, account } = useActiveWeb3React();

  const contract = getContract(
    STAKING_ADDRESSES[(chainId as ChainId)],
    STAKING_ABI,
    library,
    account,
  );

  const stakingBalance = useSingleCallResult(contract, 'stakedHakka', [account]);
  const sHakkaBalance = useSingleCallResult(contract, 'balanceOf', [account]);
  const votingPower = useSingleCallResult(contract, 'votingPower', [account]);
  const stakingRate = useSingleContractMultipleData(
    contract,
    'getStakingRate',
    stakingMonth.map((lockMonth) => [lockMonth * 60 * 60 * 24 * 30])
  );
  const vaultCount = useSingleCallResult(contract, 'vaultCount', [account]);
  const vaults = useSingleContractMultipleData(
    contract,
    'vaults',
    Array.from(Array(vaultCount.result?.[0].toNumber() || 0).keys()).map((vaultNum) => [account, vaultNum])
  );

  return useMemo(
    () =>
    chainId === 1 && stakingBalance && sHakkaBalance && votingPower && stakingRate
        ? {
          stakingBalance: new TokenAmount(HAKKA[chainId as ChainId], JSBI.BigInt(stakingBalance.result?.[0] ?? 0)),
          sHakkaBalance: new TokenAmount(HAKKA[chainId as ChainId], JSBI.BigInt(sHakkaBalance.result?.[0] ?? 0)),
          votingPower: new TokenAmount(HAKKA[chainId as ChainId], JSBI.BigInt(votingPower.result?.[0] ?? 0)),
          stakingRate: stakingRate.map((rate) => JSBI.BigInt(rate.result?.[0] ?? 0).toString()),
          vaults: vaults,
        }
        : {
          stakingBalance: undefined,
          sHakkaBalance: undefined,
          votingPower: undefined,
          stakingRate: undefined,
          vaults: [],
        },
    [chainId, stakingBalance, votingPower, stakingRate, vaults]
  );
}
