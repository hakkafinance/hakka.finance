/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useEffect, useMemo } from 'react';
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
  const { account, chainId } = useWeb3React();
  const [currentChain, setCurrentChain] = useState<ChainId>(ChainId.MAINNET);
  const [isShowArchived, setIsShowArchived] = useState<boolean>(true);
  const currentPoolAddresses = useMemo(() => Object.keys(REWARD_POOLS).filter((poolAddress) => REWARD_POOLS[poolAddress].chain === currentChain), [currentChain]);
  const activePools = useMemo(() => currentPoolAddresses.filter((poolAddress) => !REWARD_POOLS[poolAddress].archived), [currentPoolAddresses]);
  const archivedPools = useMemo(() => currentPoolAddresses.filter((poolAddress) => REWARD_POOLS[poolAddress].archived), [currentPoolAddresses]);
  const decimals = useMemo(() => currentPoolAddresses.map((pool) => POOL_ASSETES[pool]?.decimal || 18), [currentPoolAddresses])

  const hakkaPrice = useTokenPrice('hakka-finance');
  const rewardData = useRewardsData(currentPoolAddresses, decimals);
  const [apr, setApr] = useState({});

  useEffect(() => {
    if (chainId === ChainId.MAINNET || chainId === ChainId.BSC || chainId === ChainId.POLYGON) {
      setCurrentChain(chainId);
    }
  }, [chainId]);

  useEffect(() => {
    let active = true;
    if (hakkaPrice) {
      loadApr();
    }

    async function loadApr() {
      try {
        setApr({});
        const aprList = await Promise.all(Object.keys(REWARD_POOLS).map((address) => POOL_ASSETES[address].getApr(parseUnits(hakkaPrice.toString(), 18))));
        const newApr = {}
        aprList.map((apr, index) => {
          newApr[REWARD_POOLS[Object.keys(REWARD_POOLS)[index]].rewardsAddress] = apr;
        });
        if (!active) { return }
        setApr(newApr);
      } catch (e) {
        console.error(e);

        setTimeout(() => {
          loadApr();
        }, 1000);
      }
    }
    
    return () => { active = false }
  }, [hakkaPrice]);

  const rewardsPoolRenderer = (pool, active = false) => (
    <RewardsPoolCard
      key={pool.rewardsAddress}
      tokenImage={POOL_ASSETES[pool.rewardsAddress].icon}
      title={pool.name}
      url={pool.url}
      linkContent={pool.website}
      btnContent={active ? 'Deposit / Withdraw' : 'Withdraw'}
      depositedTokenSymbol={pool.tokenSymbol}
      rewardsAddress={pool.rewardsAddress}
      apr={apr[pool.rewardsAddress] ? tryParseAmount(formatUnits(apr[pool.rewardsAddress]?.mul(100), 18)).toFixed(2) : '-'}
      depositedBalance={account ? rewardData.depositBalances[pool.rewardsAddress]?.toFixed(2) : '-'}
      earnedBalance={account ? rewardData.earnedBalances[pool.rewardsAddress]?.toFixed(2) : '-'}
    />
  );

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
          <div onClick={() => setCurrentChain(ChainId.POLYGON)} sx={currentChain === ChainId.POLYGON ? styles.chainActive : ''}>Polygon</div>
        </div>
        <div>
          <p sx={styles.activeTitle}>Active ({activePools.length})</p>
          <div sx={styles.poolContainer}>
            {activePools
              .filter((poolAddress) => REWARD_POOLS[poolAddress].chain === currentChain) // add `|| REWARD_POOLS[poolAddress].chain === ChainId.KOVAN` when test on kovan
              .map((poolAddress) => rewardsPoolRenderer(REWARD_POOLS[poolAddress], true))}
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
              {archivedPools
                .filter((poolAddress) => REWARD_POOLS[poolAddress].chain === currentChain)
                .map((poolAddress) => rewardsPoolRenderer(REWARD_POOLS[poolAddress]))}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
