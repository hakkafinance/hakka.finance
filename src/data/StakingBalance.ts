import { JSBI, TokenAmount } from '@uniswap/sdk';
import { useMemo } from 'react';
import { useActiveWeb3React } from '../hooks';

import { getContract } from '../utils';
import { useSingleCallResult } from '../state/multicall/hooks';
import STAKING_ABI from '../constants/abis/shakka.json';
import {
  ChainId,
  HAKKA,
  STAKING_ADDRESSES,
} from '../constants';

export function useStakingBalance(): TokenAmount | undefined {
  const { chainId, library, account } = useActiveWeb3React();

  if (chainId !== 1) {
    return new TokenAmount(HAKKA[chainId as ChainId], JSBI.BigInt(0));
  }

  const contract = getContract(
    STAKING_ADDRESSES[(chainId as ChainId)],
    STAKING_ABI,
    library,
    account,
  );

  const stakingBalance = useSingleCallResult(contract, 'stakedHakka', [account]);

  return useMemo(
    () =>
    chainId === 1 && stakingBalance
        ? new TokenAmount(HAKKA[chainId as ChainId], JSBI.BigInt(stakingBalance.result?.[0] ?? 0))
        : undefined,
    [chainId, stakingBalance]
  );
}
