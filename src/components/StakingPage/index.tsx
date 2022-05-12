/** @jsx jsx */
import { Box, Flex, jsx } from 'theme-ui';
import { useState, useMemo, useCallback } from 'react';
import { parseUnits } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { AddressZero } from '@ethersproject/constants';
import images from '../../images';
import styles from './styles';
import { MyButton } from '../../components/Common';
import Web3Status from '../Web3Status';
import NumericalInputField from '../NumericalInputField';
import { useTokenBalance } from '../../state/wallet/hooks';
import { useStakingData } from '../../data/StakingData';
import { useTokenApprove, ApprovalState } from '../../hooks/useTokenApprove';
import { useHakkaStakeV1, StakeState } from '../../hooks/staking/useHakkaStakeV1';
import {
  ChainId,
  HAKKA,
  NEW_SHAKKA_ADDRESSES,
  stakingMonth,
  SHAKKA_POOL,
  ChainNameWithIcon,
} from '../../constants';
import { tryParseAmount } from '../../utils';
import {
  useWalletModalToggle,
  useRedeemModalToggle,
} from '../../state/application/hooks';
import withConnectWalletCheckWrapper from '../../hoc/withConnectWalletCheckWrapper';
import withApproveTokenCheckWrapper from '../../hoc/withApproveTokenCheckWrapper';
import withWrongNetworkCheckWrapper from '../../hoc/withWrongNetworkCheckWrapper';
import { TabGroup } from '../Common/TabGroup';

import VotingPowerArea from './VotingPower';
import RedeemModal from '../RedeemModal';
import StakePositionTable from './StakePositionTable';

import { BigNumber } from 'ethers';
import { WeiPerEther } from '@ethersproject/constants';
import StakingPanel from './StakingPanel';

import _omit from 'lodash/omit'

const hakkaSupportChain = Object.keys(_omit(ChainNameWithIcon, ChainId.KOVAN))
  .map(key => {
    return {
      value: +key as ChainId,
      title: ChainNameWithIcon[+key as ChainId].name,
      icon: ChainNameWithIcon[+key as ChainId].iconName,
    }
  })
const mockingData = [
  {
    index: 0,
    stakedHakka: WeiPerEther,
    sHakkaReceived: WeiPerEther,
    until: BigNumber.from(`${~~(Date.now() / 1000) + 1036800}`),
  },
  {
    index: 1,
    stakedHakka: WeiPerEther.mul(2),
    sHakkaReceived: WeiPerEther.mul(2),
    until: BigNumber.from(`${~~(Date.now() / 1000) - 1036800}`),
  },
  {
    index: 2,
    stakedHakka: BigNumber.from('0'),
    sHakkaReceived: BigNumber.from('0'),
    until: BigNumber.from(`${~~(Date.now() / 1000)}`),
  },
];

const Staking = () => {
  const { account, chainId, connector } = useWeb3React();
  const [inputAmount, setInputAmount] = useState<string>('0');
  const [isSortByUnlockTime, setIsSortByUnlockTime] = useState<boolean>(false);

  // TODO: use new token balance
  const hakkaBalance = useTokenBalance(
    account as string,
    HAKKA[chainId as ChainId]
  );
  const {
    stakingBalance,
    sHakkaBalance,
    votingPower,
    stakingRate,
    vaults,
  } = useStakingData();

  const [approveState, approve] = useTokenApprove(
    HAKKA[chainId as ChainId],
    NEW_SHAKKA_ADDRESSES[chainId as ChainId],
    inputAmount
  );

  const [lockTime, setLockTime] = useState<number>(12);
  const timeOption: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  const lockUntil = useMemo(
    () =>
      new Date(Date.now() + lockTime * 2592000 * 1000).toLocaleString(
        'en-US',
        timeOption
      ),
    [lockTime]
  );

  const sHakkaPreview = useMemo(
    () =>
      stakingRate && inputAmount
        ? tryParseAmount(stakingRate[stakingMonth.indexOf(lockTime)])
            .multiply(tryParseAmount(inputAmount))
            .divide((1e18).toString())
        : 0,
    [lockTime, stakingRate, inputAmount]
  );

  const [stakeState, stake] = useHakkaStakeV1(
    NEW_SHAKKA_ADDRESSES[chainId as ChainId],
    account,
    parseUnits(inputAmount || '0'),
    lockTime
  );

  const toggleWalletModal = useWalletModalToggle();
  const toggleRedeemModal = useRedeemModalToggle();

  const StakeButton = withApproveTokenCheckWrapper(
    withWrongNetworkCheckWrapper(withConnectWalletCheckWrapper(MyButton))
  );

  const [isCorrectInput, setIsCorrectInput] = useState<boolean>(true);

  const isCorrectNetwork = useMemo<boolean>(() => {
    if (chainId) {
      return NEW_SHAKKA_ADDRESSES[chainId as ChainId] !== AddressZero;
    }
    return true;
  }, [chainId]);

  const [unarchivePosition, archivedPosition] = useMemo(() => {
    let archivedPosition = [];
    let unarchivePosition = [];

    vaults.forEach((vault, index) => {
      if (vault?.result?.hakkaAmount.isZero()) {
        archivedPosition.push({ ...vault, index: index });
      } else {
        unarchivePosition.push({ ...vault, index: index });
      }
    });

    archivedPosition = archivedPosition.reverse();
    return [unarchivePosition, archivedPosition];
  }, [vaults]);

  const sortedUnarchivePosition = useMemo(() => {
    if (isSortByUnlockTime) {
      unarchivePosition.sort(function(a, b) {
        return a?.result?.unlockTime - b?.result?.unlockTime;
      });
      return unarchivePosition;
    } else {
      unarchivePosition.sort(function(a, b) {
        return b?.index - a?.index;
      });
      return unarchivePosition;
    }
  }, [isSortByUnlockTime, unarchivePosition]);

  const handleSortBtnClick = useCallback(
    () => setIsSortByUnlockTime(!isSortByUnlockTime),
    [isSortByUnlockTime]
  );

  const [activeChainTab, setActiveChainTab] = useState(ChainId.MAINNET);

  return (
    <div sx={styles.container}>
      <div sx={styles.stakingPageWrapper}>
        <div sx={styles.heading}>
          <h1>Staking</h1>
          <Web3Status unsupported={!isCorrectNetwork} />
        </div>
        <div sx={styles.votingPowerArea}>
          {/* TODO: check the fake data */}
          <VotingPowerArea
            totalVotingPower={'100.00'}
            v1VotingPowerProportion={'66'}
            v2VotingPowerProportion={'34'}
            ethProportion={'33.33'}
            bscProportion={'33.33'}
            polygonProportion={'33.33'}
          />
          {/* TODO: replace this switch version btn */}

          {/* governance navigation */}
          <button className="ml-auto" sx={styles.governanceButton}>
            <img src={images.iconToGovernance} />
          </button>
          <a href="/staking-v1" sx={styles.normalButton}>
            Switch to v1
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
          {/* TODO: modal trigger for dev. need to be removed */}
          <div sx={styles.gridBlock}>
            <div>{/* staking number */}</div>
            <StakingPanel
              isCorrectNetwork={isCorrectNetwork}
              chainId={ChainId.KOVAN}
              toggleWalletModal={toggleWalletModal}
              stakeState={stakeState}
            ></StakingPanel>
          </div>
          {/* info-panel */}
          {/* stake-panel */}
          <div>{/* Stake position component */}</div>
        </div>
        <RedeemModal
          redeem={() => {}}
          // redeemState={redeemState}
        />
        {/* infoPart */}

        {/* link area */}
        <div sx={styles.sHakkaRewardLinkArea}>
          <hr sx={styles.hr} />
          <div sx={styles.sHakkaRewardLinkWrapper}>
            <span>Earn more Hakka</span>
            <a
              sx={styles.sHakkaRewardLinkBtn}
              href={`/farms/${SHAKKA_POOL}`}
              rel="noreferrer"
            >
              <span>sHAKKA Reward</span>
              <img src={images.iconForwardGreen} />
            </a>
          </div>
        </div>
        {/* table */}
        <StakePositionTable
          data={mockingData}
          onRedeem={() => {}}
          onRestake={() => {}}
        />
      </div>
    </div>
  );
};

export default Staking;
