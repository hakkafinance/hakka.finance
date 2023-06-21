/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useMemo, useEffect } from 'react';
import { formatUnits } from '@ethersproject/units';
import { Zero, AddressZero } from '@ethersproject/constants';
import { useWeb3React } from '@web3-react/core';

import { navigate } from 'gatsby';
import images from '../../images';
import styles from './styles';
import Web3Status from '../Web3Status';
import useSHakkaBalance from '../../hooks/useSHakkaBalance';
import {
  ChainId,
  NEW_SHAKKA_ADDRESSES,
  ChainNameWithIcon,
  SHAKKA_POOLS,
} from '../../constants';
import {
  useWalletModalToggle,
  useRedeemModalToggle,
  useRestakeModalToggle,
} from '../../state/application/hooks';
import { TabGroup } from '../Common/TabGroup';

import RedeemModal from '../RedeemModal';
import StakePositionTable from './StakePositionTable';

import StakingPanel from './StakingPanel';

import _omit from 'lodash/omit';
import ReactTooltip from 'react-tooltip';
import { botSideBarItems } from '../../containers/SideBar';
import { useRewardsData } from '../../data/RewardsData';
import { REWARD_POOLS } from '../../constants/rewards';
import StakeInfo from './StakeInfo';
import useVotingPower from '../../hooks/useVotingPower';
import VotingPowerContainer from '../../containers/VotingPowerContainer';
import useStakedHakka from '../../hooks/useStakedHakka';
import RestakeModal from '../RestakeModal';
import useStakingVault from '../../hooks/staking/useStakingVault';
import NavigateLink from './NavigateLink';

const hakkaSupportChain = Object.keys(ChainNameWithIcon).map((key) => {
  return {
    value: +key as ChainId,
    title: ChainNameWithIcon[+key as ChainId].name,
    icon: ChainNameWithIcon[+key as ChainId].iconName,
  };
});

const stakingSupportChain = hakkaSupportChain.filter((chain) => 
  NEW_SHAKKA_ADDRESSES[chain.value] !== AddressZero);

const stakingSupportChainIdSet = new Set(
  stakingSupportChain.map((ele) => ele.value)
);

const Staking = () => {
  const { account, chainId } = useWeb3React();
  const [positionIndex, setPositionIndex] = useState<number>(undefined);

  const toggleWalletModal = useWalletModalToggle();
  const toggleRedeemModal = useRedeemModalToggle();
  const toggleRestakeModal = useRestakeModalToggle();

  const isCorrectNetwork = useMemo<boolean>(() => {
    if (chainId) {
      return NEW_SHAKKA_ADDRESSES[chainId as ChainId] !== AddressZero;
    }
    return true;
  }, [chainId]);

  const isChainSupported = stakingSupportChainIdSet.has(chainId);
  const [activeChainTab, setActiveChainTab] = useState(
    isChainSupported ? chainId : ChainId.MAINNET
  );

  useEffect(() => {
    if (stakingSupportChainIdSet.has(chainId)) {
      setActiveChainTab(chainId);
    }
  }, [chainId]);

  const isTabInCorrectNetwork = chainId === activeChainTab;

  const governanceLink = useMemo(() => {
    return botSideBarItems.find((ele) => ele.name === 'governance').href!;
  }, []);

  const { votingPowerInfo } = useVotingPower();

  const currentShakkaRewardPoolAddress = SHAKKA_POOLS[activeChainTab];

  const rewardData = useRewardsData(
    [currentShakkaRewardPoolAddress],
    [REWARD_POOLS[currentShakkaRewardPoolAddress]?.decimal || 18]
  );
  const depositedBalance = account
    ? rewardData.depositBalances[currentShakkaRewardPoolAddress]?.toFixed(2)
    : '-';

  const totalSHakkaObtained =
    (+formatUnits(votingPowerInfo[activeChainTab] ?? Zero)).toFixed(2) || '-';

  const { sHakkaBalanceInfo } = useSHakkaBalance();
  const { stakedHakka } = useStakedHakka();

  const { vault } = useStakingVault(activeChainTab);

  return (
    <div sx={styles.container}>
      <div sx={styles.stakingPageWrapper}>
        <div sx={styles.headingBlock}>
          <h1 className="heading-title">Staking</h1>
          <div className="heading-comment">
            <NavigateLink />
          </div>
          <div className="heading-wallet">
            <Web3Status unsupported={!isCorrectNetwork} />
          </div>
          <div className="heading-voting-power">
            <VotingPowerContainer />
          </div>

          {/* governance navigation */}
          <div className="heading-switch-btn">
            <a
              data-tip
              data-for="governance"
              className="governance"
              href={governanceLink}
              rel="noreferrer noopener"
              target="_blank"
              sx={styles.governanceButton}
            >
              <img src={images.iconToGovernance} />
            </a>
            <ReactTooltip
              place="bottom"
              id="governance"
              effect="solid"
              backgroundColor="#253E47"
            >
              <span>Go to governance</span>
            </ReactTooltip>
            <a onClick={() => navigate('/staking-v1')} sx={styles.normalButton}>
              Switch to v1
              <img className="icon" src={images.iconArrowRight} />
            </a>
          </div>
        </div>
        <div sx={styles.body}>
          {/* voting power */}
          {/* tab group */}
          <TabGroup
            list={stakingSupportChain}
            active={activeChainTab}
            onChange={setActiveChainTab}
          ></TabGroup>
          <div sx={styles.gridBlock}>
            <div sx={styles.stakeInfoWrapper}>
              <StakeInfo
                totalStakedHakka={
                  stakedHakka?.[activeChainTab]
                    ? parseFloat(
                      formatUnits(stakedHakka[activeChainTab], 18)
                    ).toFixed(2)
                    : '-'
                }
                totalSHakkaObtained={totalSHakkaObtained}
                sHakkaBalance={
                  sHakkaBalanceInfo?.[activeChainTab]
                    ? parseFloat(
                      formatUnits(sHakkaBalanceInfo[activeChainTab], 18)
                    ).toFixed(2)
                    : '-'
                }
                farmingSHakka={depositedBalance}
              />
            </div>
            <StakingPanel
              isCorrectNetwork={isTabInCorrectNetwork}
              chainId={activeChainTab}
              toggleWalletModal={toggleWalletModal}
            ></StakingPanel>
          </div>
        </div>
        <RedeemModal
          key={`redeem-${positionIndex}`}
          vaults={vault}
          chainId={activeChainTab}
          account={account}
          index={positionIndex}
          sHakkaBalance={formatUnits(sHakkaBalanceInfo?.[chainId] ?? Zero, 18)}
          sHakkaBalanceInFarming={depositedBalance}
          toggleWalletModal={toggleWalletModal}
          isCorrectNetwork={isTabInCorrectNetwork}
        />
        <RestakeModal
          key={`restake-${positionIndex}`}
          chainId={activeChainTab}
          account={account}
          index={positionIndex}
          vaults={vault}
          toggleWalletModal={toggleWalletModal}
          isCorrectNetwork={isTabInCorrectNetwork}
        />
        {/* infoPart */}
        {/* link area */}
        <div sx={styles.sHakkaRewardLinkArea}>
          <hr sx={styles.hr} />
          <div sx={styles.sHakkaRewardLinkWrapper}>
            <span>Earn more Hakka</span>
            <a
              sx={styles.sHakkaRewardLinkBtn}
              href={`/farms/${currentShakkaRewardPoolAddress}`}
              rel="noreferrer"
            >
              <span>sHAKKA Pool</span>
              <img src={images.iconForwardGreen} />
            </a>
          </div>
        </div>
        {/* table */}
        <StakePositionTable
          data={vault}
          onRedeem={(index) => {
            setPositionIndex(index);
            toggleRedeemModal();
          }}
          onRestake={(index) => {
            setPositionIndex(index);
            toggleRestakeModal();
          }}
        />
      </div>
    </div>
  );
};

export default Staking;
