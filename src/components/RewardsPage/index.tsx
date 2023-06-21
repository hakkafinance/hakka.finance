/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BigNumber } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Zero } from '@ethersproject/constants';
import { isMobile } from 'react-device-detect';
import useTokenPrice from '../../hooks/useTokenPrice';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import images from '../../images';
import styles from './styles';
import RewardsPoolCard from './RewardsPoolCard';
import Web3Status from '../Web3Status';
import { ChainId } from '../../constants';
import { REWARD_POOLS } from '../../constants/rewards';
import { POOL_ASSETES } from '../../constants/rewards/assets';
import { tryParseAmount } from '../../utils';
import { useRewardsData } from '../../data/RewardsData';
import useTokensPrice from '../../hooks/useTokensPrice';
import { CHAIN_SWITCH_TAB_INFO } from '../../constants/farm';

enum SortOptions {
  LATEST = 'latest',
  APR = 'apr',
}
interface RewardsPoolsContainerProps {
  pools: string[];
  active?: boolean;
  renderPool: (pool: any, currentChain: ChainId, active?: any) => jsx.JSX.Element
}

const RewardsPage = () => {
  const { account, chainId } = useWeb3React();
  const [currentChain, setCurrentChain] = useState<ChainId>(ChainId.MAINNET);
  const [isShowArchived, setIsShowArchived] = useState<boolean>(true);

  const [sortBy, setSortBy] = useState(SortOptions.LATEST);
  const SORT_OPTIONS = [
    {
      label: "Latest",
      value: SortOptions.LATEST,
    },
    {
      label: "APR",
      value: SortOptions.APR,
    },
  ];

  const currentPoolAddresses = useMemo(() => Object.keys(REWARD_POOLS).filter((poolAddress) => REWARD_POOLS[poolAddress].chain === currentChain), [currentChain]);
  const activePools = useMemo(() => currentPoolAddresses.filter((poolAddress) => !REWARD_POOLS[poolAddress].archived), [currentPoolAddresses]);
  const archivedPools = useMemo(() => currentPoolAddresses.filter((poolAddress) => REWARD_POOLS[poolAddress].archived), [currentPoolAddresses]);
  const decimals = useMemo(() => currentPoolAddresses.map((pool) => POOL_ASSETES[pool]?.decimal || 18), [currentPoolAddresses])

  const tokenPrice = useTokensPrice();
  const hakkaPrice = useTokenPrice('hakka-finance');
  const rewardData = useRewardsData(currentPoolAddresses, decimals);
  const [apr, setApr] = useState({});
  const [isShowStakedOnly, setIsShowStakedOnly] = useState(false);

  const stakedPoolAddresses = useMemo(() => Object.keys(REWARD_POOLS).filter((poolAddress) => !!rewardData.depositBalances && rewardData.depositBalances[poolAddress]?.toSignificant() > 0), [rewardData]);
  const stakedActivePools = useMemo(() => activePools.filter((poolAddress) => stakedPoolAddresses.indexOf(poolAddress) > -1), [activePools, stakedPoolAddresses]);
  const stakedArchivedPools = useMemo(() => archivedPools.filter((poolAddress) => stakedPoolAddresses.indexOf(poolAddress) > -1), [archivedPools, stakedPoolAddresses]);

  const sortedByAprActivePools = useMemo(()=>{
    const copyActivePools = [...activePools];
    if (Object.keys(apr).length > 0) {
      return copyActivePools.sort((a, b)=> {
        return apr[b].sub(apr[a])
      })
    } else {
      return activePools;
    }
  }, [activePools, apr]);

  const sortedByAprStakedActivePools = useMemo(()=>{
    const copyStakedActivePools = [...stakedActivePools];
    if (Object.keys(apr).length > 0) {
      return copyStakedActivePools.sort((a, b)=> {
        return apr[b].sub(apr[a])
      })
    } else {
      return stakedActivePools;
    }
  }, [stakedActivePools, apr]);

  const sortedActivePools = useMemo(() => {
    let sortedActivePools:string[] = [];
    switch (sortBy) {
      case SortOptions.LATEST : {
        sortedActivePools = activePools
        break;
      }
      case SortOptions.APR: {
        sortedActivePools = sortedByAprActivePools;
        break;
      }
    }
    return sortedActivePools;
  } ,[activePools, sortedByAprActivePools, sortBy]);

  const sortedStakedActivePools = useMemo(() => {
    let sortedStakedActivePools: string[] = [];
    switch (sortBy) {
      case SortOptions.LATEST : {
        sortedStakedActivePools = stakedActivePools;
        break;
      }
      case SortOptions.APR: {
        sortedStakedActivePools = sortedByAprStakedActivePools
        break;
      }
    }
    return sortedStakedActivePools;
  } ,[stakedActivePools, sortedByAprStakedActivePools, sortBy]);

  useEffect(() => {
    if (chainId === ChainId.MAINNET || chainId === ChainId.BSC || chainId === ChainId.POLYGON || chainId === ChainId.FANTOM) {
      setCurrentChain(chainId);
    }
  }, [chainId]);

  useEffect(() => {
    let active = true;
    if (hakkaPrice && tokenPrice) {
      loadApr(Object.keys(REWARD_POOLS));
    }

    async function loadApr(poolAddresses: string[], prevResult: any = {}) {
      let newApr = {...prevResult}
      const failAddress: string[] = []
      try {
        setApr(newApr);
        newApr = {...newApr};
        const apyPromiseList = await Promise.all(poolAddresses.map((address) => {
          if(!POOL_ASSETES[address]){
            return Zero;
          }
          return POOL_ASSETES[address].getApr(
            parseUnits(hakkaPrice.toString(), 18),
            POOL_ASSETES[address].tokenPriceKey ? (tokenPrice?.[POOL_ASSETES[address].tokenPriceKey]?.usd || 1) : 1
          )
        }));

        const settledApyList = await Promise.allSettled(apyPromiseList);
        const reasonList: string[] = []
        settledApyList.map((aprResult, index) => {
          if (aprResult.status === "fulfilled") {
            newApr[REWARD_POOLS[poolAddresses[index]].rewardsAddress] = (aprResult as PromiseFulfilledResult<BigNumber>).value
          } else {
            reasonList.push((aprResult as PromiseRejectedResult).reason)
            failAddress.push(REWARD_POOLS[poolAddresses[index]].rewardsAddress);
            newApr[REWARD_POOLS[poolAddresses[index]].rewardsAddress] = undefined;
          }
        });

        if (!active) { return }
        setApr(newApr);
        if (reasonList.length > 0) {
          throw reasonList;
        }
      } catch (e) {
        console.error(e);
        setTimeout(() => {
          loadApr(failAddress, newApr);
        }, 3000);
      }
    }

    return () => { active = false }
  }, [hakkaPrice, tokenPrice]);

  const rewardsPoolRenderer = useCallback((pool,  currentChain, active = false) => {
    if (!pool?.rewardsAddress) {
      return <></>
    }
    return <RewardsPoolCard
      key={pool.rewardsAddress}
      tokenImage={POOL_ASSETES[pool.rewardsAddress].icon}
      title={pool.name}
      subtitle={pool.subtitle}
      url={pool.url}
      linkContent={pool.website}
      btnContent={active ? 'Deposit / Withdraw' : 'Withdraw'}
      depositedTokenSymbol={pool.tokenSymbol}
      rewardsAddress={pool.rewardsAddress}
      apr={apr[pool.rewardsAddress] ? tryParseAmount(formatUnits(apr[pool.rewardsAddress]?.mul(100), 18)).toFixed(2) : '-'}
      depositedBalance={account ? rewardData.depositBalances[pool.rewardsAddress]?.toFixed(2) : '-'}
      earnedBalance={account ? rewardData.earnedBalances[pool.rewardsAddress]?.toFixed(2) : '-'}
      currentChain={currentChain}
    />
  }, [account, apr, rewardData]);


  const RewardsPoolsContainer = ({ pools, active, renderPool}: RewardsPoolsContainerProps) => {
    return(
      <>
        {pools.filter((poolAddress) => REWARD_POOLS[poolAddress].chain === currentChain)
        .map((poolAddress) => renderPool(REWARD_POOLS[poolAddress], currentChain, active))}
      </>
    )
  }

  const ChainSwitchButton = ({ chainId }: { chainId: ChainId }) => {
    return (
      <div onClick={() => setCurrentChain(chainId)} sx={currentChain === chainId ? styles.chainActive : ''}>
        {isMobile 
          ? <img src={currentChain === chainId ? CHAIN_SWITCH_TAB_INFO[chainId].img : CHAIN_SWITCH_TAB_INFO[chainId].imgGray } />
          : CHAIN_SWITCH_TAB_INFO[chainId].displayName}
      </div>
    )
  };

  return (
    <div sx={styles.container}>
      <div sx={styles.rewardsPageWrapper}>
        <div sx={styles.header}>
          <p>Farms</p>
          <Web3Status />
        </div>
        <div sx={styles.displayOption}>
          <div sx={styles.chainSwitch}>
            <ChainSwitchButton chainId={ChainId.MAINNET} />
            <ChainSwitchButton chainId={ChainId.BSC} />
            <ChainSwitchButton chainId={ChainId.POLYGON} />
            <ChainSwitchButton chainId={ChainId.FANTOM} />
          </div>
          <div sx={styles.sortController}>
            <label sx={styles.checkBoxLabel}>
              <input
                sx={styles.checkBox}
                type="checkbox"
                onChange={()=>setIsShowStakedOnly(!isShowStakedOnly)}
              />
              {isShowStakedOnly ? <img src={images.iconChekBoxChecked} /> : <img src={images.iconChekBoxUnchecked} />}
              <span>Staked Only</span>
            </label>
            <div>
              <span>Sort by: </span>
              <select sx={styles.menu} onChange={(e)=> setSortBy(e.target.value)}>
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div>
          <p sx={styles.activeTitle}>Active ({activePools.length})</p>
          <div sx={styles.poolContainer}>
            <RewardsPoolsContainer pools={isShowStakedOnly ? sortedStakedActivePools : sortedActivePools} active renderPool={rewardsPoolRenderer} />
          </div>
        </div>
        <div>
          <div sx={{ display: 'inline-block' }}>
            <div onClick={() => setIsShowArchived(!isShowArchived)} sx={styles.archivedTitle}>
              <p>Archived ({archivedPools.length})</p>
              <img src={isShowArchived ? images.iconUp : images.iconDown} />
            </div>
          </div>
          {isShowArchived &&
            <div sx={styles.poolContainer}>
              <RewardsPoolsContainer pools={isShowStakedOnly ? stakedArchivedPools : archivedPools} renderPool={rewardsPoolRenderer} />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
