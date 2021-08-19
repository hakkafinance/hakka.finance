/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useMemo, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import useTokenPrice from '../../hooks/useTokenPrice';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import images from '../../images';
import styles from './styles';
import RewardsPoolCard from './RewardsPoolCard';
import Web3Status from '../Web3Status';
import { ChainId } from '../../constants';
import { BSC_REWARD_POOLS, REWARD_POOLS } from '../../constants/rewards';
import { POOL_ASSETES } from '../../constants/rewards/assets';
import { tryParseAmount } from '../../utils';
import { useRewardsData } from '../../data/RewardsData';

const RewardsPage = () => {
  const { account } = useWeb3React();
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
  const [apr, setApr] = useState({});

  useEffect(() => {
    let active = true;
    try {
      load()
    } catch (e) {
      console.error(e);
    }
    return () => { active = false }
  
    async function load() {
      setApr({});
      const pools = { ...REWARD_POOLS, ...BSC_REWARD_POOLS };
      const aprList = await Promise.all(Object.keys(pools).map((address) => POOL_ASSETES[address].getApr(parseUnits(hakkaPrice.toString(), 18))));
      const newApr = {}
      aprList.map((apr, index) => {
        newApr[pools[Object.keys(pools)[index]].rewardsAddress] = apr
      });
      if (!active) { return }
      setApr(newApr);
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
                tokenImage={POOL_ASSETES[pool].icon}
                title={pools[pool].name}
                url={pools[pool].url}
                linkContent={pools[pool].website}
                btnContent={'Deposit / Withdraw'}
                depositedTokenSymbol={pools[pool].tokenSymbol}
                rewardsAddress={pools[pool].rewardsAddress}
                apr={apr[pool] ? tryParseAmount(formatUnits(apr[pool]?.mul(100), 18)).toFixed(2) : '-'}
                depositedBalance={account ? rewardData.depositBalances[pool]?.toFixed(2) : '-'}
                earnedBalance={account ? rewardData.earnedBalances[pool]?.toFixed(2) : '-'}
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
                  tokenImage={POOL_ASSETES[pool].icon}
                  title={pools[pool].name}
                  url={pools[pool].url}
                  linkContent={pools[pool].website}
                  btnContent={'Withdraw'}
                  depositedTokenSymbol={pools[pool].tokenSymbol}
                  rewardsAddress={pools[pool].rewardsAddress}
                  apr={apr[pool] ? tryParseAmount(formatUnits(apr[pool]?.mul(100), 18)).toFixed(2) : '-'}
                  depositedBalance={account ? rewardData.depositBalances[pool]?.toFixed(2) : ''}
                  earnedBalance={account ? rewardData.earnedBalances[pool]?.toFixed(2) : '-'}
                />
              )}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
