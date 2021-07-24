import { useMemo } from 'react';

import { JSBI, TokenAmount, Token } from '@uniswap/sdk';
import { Interface } from '@ethersproject/abi';
import { useActiveWeb3React } from '../hooks';
import ERC20_ABI from '../../constants/abis/erc20.json';
import { useMultipleContractSingleData } from '../state/multicall/hooks';

export enum TokenInfoState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

interface TokenInfo {
  balanceAmount: TokenAmount;
  totalSupplyAmount: TokenAmount;
}

export function useTokensInfo(
  tokens: (Token | undefined)[]
): [TokenInfoState, TokenInfo | null][] {
  const { chainId, account } = useActiveWeb3React();
  const tokenAddresses = useMemo(
    () => tokens.map((token) => (token ? token!.address : undefined)),
    [tokens]
  );

  const accountArg = useMemo(() => [account ?? undefined], [account]);
  const ERC20_INTERFACE = new Interface(ERC20_ABI);

  // get all the info from the token contracts
  const balances = useMultipleContractSingleData(
    tokenAddresses,
    ERC20_INTERFACE,
    'balanceOf',
    accountArg
  );
  const totalSupplies = useMultipleContractSingleData(
    tokenAddresses,
    ERC20_INTERFACE,
    'totalSupply'
  );

  return useMemo(() => {
    if (!chainId) return [];

    return tokens.reduce<[TokenInfoState, TokenInfo | null][]>(
      (memo, token, index) => {
        // these three are dependent on account
        const balanceState = balances[index];

        // these get fetched regardless of account
        const totalSupplyState = totalSupplies[index];

        if (
          // these three are dependent on account
          balanceState?.loading ||
          (totalSupplyState && totalSupplyState.loading)
        ) {
          memo.push([TokenInfoState.LOADING, null]);
          return memo;
        }

        if (!token || balanceState?.error || totalSupplyState.error) {
          memo.push([TokenInfoState.INVALID, null]);
          return memo;
        }

        if (!totalSupplyState.result) {
          memo.push([TokenInfoState.NOT_EXISTS, null]);
          return memo;
        }

        // check for account, if no account set to 0
        const balanceAmount = new TokenAmount(
          token,
          JSBI.BigInt(balanceState?.result?.[0] ?? 0)
        );

        const totalSupplyAmount = new TokenAmount(
          token,
          JSBI.BigInt(totalSupplyState.result[0])
        );

        memo.push([
          TokenInfoState.EXISTS,
          {
            balanceAmount: balanceAmount,
            totalSupplyAmount: totalSupplyAmount,
          },
        ]);
        return memo;
      },
      []
    );
  }, [balances, chainId, tokens, totalSupplies]);
}

export function useTokenInfo(
  token: Token | undefined
): [TokenInfoState, TokenInfo | null] {
  return useTokensInfo([token])[0];
}
