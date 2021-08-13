/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState, useMemo, useEffect } from 'react';
import useTokenPrice from '../../hooks/useTokenPrice';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import images from '../../images';
import styles from './styles';
import RewardsPoolCard from './RewardsPoolCard';
import PoolDetail from './PoolDetail';
import Web3Status from '../Web3Status';
import { BSC_REWARD_POOLS, ChainId, REWARD_POOLS } from '../../constants';
import { tryParseAmount } from '../../utils';
import { useRewardsData } from '../../data/RewardsData';

const RewardsPage = () => {
  const [currentChain, setCurrentChain] = useState<ChainId>(ChainId.MAINNET);
  const [isShowArchived, setIsShowArchived] = useState<boolean>(true);

  const showPool = useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params.pool;
  }, []);

  const pools = useMemo(() => currentChain === ChainId.BSC ? BSC_REWARD_POOLS : REWARD_POOLS, [currentChain]);
  const activePools = useMemo(() => Object.keys(pools).filter((poolId) => !pools[poolId].archived), [pools]);
  const archivedPools = useMemo(() => Object.keys(pools).filter((poolId) => pools[poolId].archived), [pools]);

  const hakkaPrice = useTokenPrice('hakka-finance');
  const [apy, setApy] = useState({});

  useEffect(() => {
    let active = true;
    try {
      load()
    } catch (e) {
      console.error(e);
    }
    return () => { active = false }
  
    async function load() {
      setApy({});
      const pools = { ...REWARD_POOLS, ...BSC_REWARD_POOLS };
      const apyList = await Promise.all(Object.keys(pools).map((address) => pools[address].getApy(parseUnits(hakkaPrice.toString(), 18))));
      const newApy = {}
      apyList.map((apy, index) => {
        newApy[pools[Object.keys(pools)[index]].rewardsAddress] = apy
      });
      if (!active) { return }
      setApy(newApy);
    }
  }, [hakkaPrice]);

  const rewardData = useRewardsData(Object.keys(pools));

  return (
    <div sx={styles.container}>
      <div sx={styles.rewardsPageWrapper}>
        <div sx={styles.header}>
          <p>Farms</p>
          <Web3Status />
        </div>

        {showPool ? <PoolDetail />
        :
        <>
        {/* pool portals  */}
        <div sx={styles.chainSwitch}>
          <div onClick={() => setCurrentChain(ChainId.MAINNET)} sx={currentChain === ChainId.MAINNET ? styles.chainActive : ''}>Ethereum</div>
          <div onClick={() => setCurrentChain(ChainId.BSC)} sx={currentChain === ChainId.BSC ? styles.chainActive : ''}>Binance Smart Chain</div>
        </div>
        <div>
          <p sx={styles.activeTitle}>Active ({activePools.length})</p>
          <div sx={styles.poolContainer}>
            {activePools.map((pool) =>
              <RewardsPoolCard
                key={pools[pool].rewardsAddress}
                tokenImage={pools[pool].icon}
                title={pools[pool].name}
                url={pools[pool].url}
                linkContent={pools[pool].website}
                btnContent={'Deposit / Withdraw'}
                depositedTokenSymbol={pools[pool].tokenSymbol}
                rewardsAddress={pools[pool].rewardsAddress}
                apy={apy[pool] ? tryParseAmount(formatUnits(apy[pool]?.mul(100), 18)).toFixed(2) : '-'}
                depositedBalance={rewardData.depositBalances[pool]?.toFixed(2)}
                earnedBalance={rewardData.earnedBalances[pool]?.toFixed(2)}
              />
            )}
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
              {archivedPools.map((pool) =>
                <RewardsPoolCard
                  key={pools[pool].rewardsAddress}
                  tokenImage={pools[pool].icon}
                  title={pools[pool].name}
                  url={pools[pool].url}
                  linkContent={pools[pool].website}
                  btnContent={'Withdraw'}
                  depositedTokenSymbol={pools[pool].tokenSymbol}
                  rewardsAddress={pools[pool].rewardsAddress}
                  apy={apy[pool] ? tryParseAmount(formatUnits(apy[pool]?.mul(100), 18)).toFixed(2) : '-'}
                  depositedBalance={rewardData.depositBalances[pool]?.toFixed(2)}
                  earnedBalance={rewardData.earnedBalances[pool]?.toFixed(2)}
                />
              )}
            </div>
          }
        </div>
        </>
        }

      </div>
    </div>
  );
};

export default RewardsPage;
