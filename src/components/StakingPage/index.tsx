/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useMemo, useRef } from 'react';
import { formatUnits } from '@ethersproject/units';
import { Zero } from '@ethersproject/constants';
import { useWeb3React } from '@web3-react/core';
import { AddressZero } from '@ethersproject/constants';
import images from '../../images';
import styles from './styles';
import Web3Status from '../Web3Status';
import { useTokenBalance } from '../../state/wallet/hooks';
import { useStakingData } from '../../data/StakingData';
import { useTokenApprove, ApprovalState } from '../../hooks/useTokenApprove';
import useSHakkaBalance from '../../hooks/useSHakkaBalance';
import {
  ChainId,
  HAKKA,
  NEW_SHAKKA_ADDRESSES,
  stakingMonth,
  SHAKKA_POOL,
  ChainNameWithIcon,
  SHAKKA_POOLS,
} from '../../constants';
import { tryParseAmount } from '../../utils';
import {
  useWalletModalToggle,
  useRedeemModalToggle,
} from '../../state/application/hooks';
import { TabGroup } from '../Common/TabGroup';

import VotingPowerArea from './VotingPower';
import RedeemModal from '../RedeemModal';
import StakePositionTable from './StakePositionTable';

import StakingPanel from './StakingPanel';

import _omit from 'lodash/omit';
import ReactTooltip from 'react-tooltip';
import { botSideBarItems } from '../../containers/SideBar';
import { useRewardsData } from '../../data/RewardsData';
import { REWARD_POOLS } from '../../constants/rewards';
import StakeInfo from './StakeInfo';
import { useHakkaUnstake } from '../../hooks/staking/useHakkaUnstake';
import useVotingPower from '../../hooks/useVotingPower';
import VotingPowerContainer from '../../containers/VotingPowerContainer';

const hakkaSupportChain = Object.keys(ChainNameWithIcon).map((key) => {
  return {
    value: +key as ChainId,
    title: ChainNameWithIcon[+key as ChainId].name,
    icon: ChainNameWithIcon[+key as ChainId].iconName,
  };
});

const Staking = () => {
  const { account, chainId, connector } = useWeb3React();
  const [positionIndex, setPositionIndex] = useState<number>(undefined);

  const {
    stakingRate,
    vaults,
  } = useStakingData('v2');

  const toggleWalletModal = useWalletModalToggle();
  const toggleRedeemModal = useRedeemModalToggle();

  const isCorrectNetwork = useMemo<boolean>(() => {
    if (chainId) {
      return NEW_SHAKKA_ADDRESSES[chainId as ChainId] !== AddressZero;
    }
    return true;
  }, [chainId]);

  const [activeChainTab, setActiveChainTab] = useState(ChainId.MAINNET);

  const governanceLink = useMemo(() => {
    return botSideBarItems.find((ele) => ele.name === 'governance').href!;
  }, []);

  const { votingPowerInfo } = useVotingPower();

  const currentShakkaRewardPoolAddress = SHAKKA_POOLS[chainId];

  const rewardData = useRewardsData(
    [currentShakkaRewardPoolAddress],
    [REWARD_POOLS[currentShakkaRewardPoolAddress]?.decimal || 18]
  );
  const depositedBalance = account
    ? rewardData.depositBalances[currentShakkaRewardPoolAddress]?.toFixed(2)
    : '-';

  const totalSHakkaObtained =
    (+formatUnits(votingPowerInfo[chainId] ?? Zero)).toFixed(2) || '-';

  const sHakkaBalance = useSHakkaBalance()

  return (
    <div sx={styles.container}>
      <div sx={styles.stakingPageWrapper}>
        <div sx={styles.heading}>
          <h1>Staking</h1>
          <Web3Status unsupported={!isCorrectNetwork} />
        </div>
        <div sx={styles.votingPowerArea}>
          <VotingPowerContainer />

          {/* governance navigation */}
          <a
            data-tip
            data-for="governance"
            className="ml-auto"
            href={governanceLink}
            rel="noreferrer"
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
          <a href="/staking-v1" sx={styles.normalButton}>
            Switch to v1
            <img className="icon" src={images.iconArrowRight} />
          </a>
        </div>
        <div sx={styles.body}>
          {/* voting power */}
          {/* tab group */}
          <TabGroup
            list={hakkaSupportChain}
            active={activeChainTab}
            onChange={setActiveChainTab}
          ></TabGroup>
          <div sx={styles.gridBlock}>
            <div sx={styles.stakeInfoWrapper}>
              <StakeInfo
                totalStakedHakka={stakingBalance?.toFixed(2)}
                totalSHakkaObtained={totalSHakkaObtained}
                sHakkaBalance={sHakkaBalance?.toFixed(2)}
                farmingSHakka={depositedBalance}
              />
            </div>
            <StakingPanel
              isCorrectNetwork={isCorrectNetwork}
              chainId={ChainId.KOVAN}
              toggleWalletModal={toggleWalletModal}
            ></StakingPanel>
          </div>
          {/* info-panel */}
          {/* stake-panel */}
          <div>{/* Stake position component */}</div>
        </div>
        <RedeemModal
          chainId={chainId}
          account={account}
          index={positionIndex}
          sHakkaBalance={sHakkaBalance[chainId]}
          sHakkaBalanceInFarming={depositedBalance}
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
          data={vaults}
          onRedeem={toggleRedeemModal}
          onRestake={() => {}}
          setPositionIndex={setPositionIndex}
        />
      </div>
    </div>
  );
};

export default Staking;
