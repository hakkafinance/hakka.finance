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
import { REWARD_POOLS } from '../../constants/rewards';
import { POOL_ASSETES } from '../../constants/rewards/assets';
import { tryParseAmount } from '../../utils';
import { useRewardsData } from '../../data/RewardsData';

const RewardsPage = () => {
  const { account } = useWeb3React();
  const [currentChain, setCurrentChain] = useState<ChainId>(ChainId.MAINNET);
  const [isShowArchived, setIsShowArchived] = useState<boolean>(true);

  const activePools = Object.keys(REWARD_POOLS).filter((poolId) => !REWARD_POOLS[poolId].archived);
  const archivedPools = Object.keys(REWARD_POOLS).filter((poolId) => REWARD_POOLS[poolId].archived);

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
      const aprList = await Promise.all(Object.keys(REWARD_POOLS).map((address) => POOL_ASSETES[address].getApr(parseUnits(hakkaPrice.toString(), 18))));
      const newApr = {}
      aprList.map((apr, index) => {
        newApr[REWARD_POOLS[Object.keys(REWARD_POOLS)[index]].rewardsAddress] = apr
      });
      if (!active) { return }
      setApr(newApr);
    }
  }, [hakkaPrice]);

  const rewardData = useRewardsData(Object.keys(REWARD_POOLS));

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
            {activePools.filter((pool) => REWARD_POOLS[pool].chain === currentChain).map((pool) =>
              <RewardsPoolCard
                key={REWARD_POOLS[pool].rewardsAddress}
                tokenImage={POOL_ASSETES[pool].icon}
                title={REWARD_POOLS[pool].name}
                url={REWARD_POOLS[pool].url}
                linkContent={REWARD_POOLS[pool].website}
                btnContent={'Deposit / Withdraw'}
                depositedTokenSymbol={REWARD_POOLS[pool].tokenSymbol}
                rewardsAddress={REWARD_POOLS[pool].rewardsAddress}
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
              {archivedPools.filter((pool) => REWARD_POOLS[pool].chain === currentChain).map((pool) =>
                <RewardsPoolCard
                  key={REWARD_POOLS[pool].rewardsAddress}
                  tokenImage={POOL_ASSETES[pool].icon}
                  title={REWARD_POOLS[pool].name}
                  url={REWARD_POOLS[pool].url}
                  linkContent={REWARD_POOLS[pool].website}
                  btnContent={'Withdraw'}
                  depositedTokenSymbol={REWARD_POOLS[pool].tokenSymbol}
                  rewardsAddress={REWARD_POOLS[pool].rewardsAddress}
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
