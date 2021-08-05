import { JSBI, TokenAmount } from '@uniswap/sdk';
import { useMemo } from 'react';
import { useActiveWeb3React } from '../hooks';

import { getContract } from '../utils';
import { useSingleCallResult } from '../state/multicall/hooks';
import { BigNumber } from "ethers";
import STAKING_ABI from '../constants/abis/shakka.json';
import {
  ChainId,
  HAKKA,
  STAKING_ADDRESSES,
} from '../constants';

export function useStakingVaultData(index: number, wAmount: BigNumber): TokenAmount {
  const { chainId, library, account } = useActiveWeb3React();

  const contract = getContract(
    STAKING_ADDRESSES[(chainId as ChainId)],
    STAKING_ABI,
    library,
    account,
  );

  const unstake = useSingleCallResult(contract, 'unstake', [account, index, wAmount]);

  return useMemo(
    () =>
    chainId === 1 && unstake
        ? new TokenAmount(HAKKA[chainId as ChainId], JSBI.BigInt(unstake.result?.[0] ?? 0))
        : undefined,
    [chainId, unstake]
  );
}
