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
  STAKING_ADDRESSES,
  stakingMonth,
} from '../../constants';
import { tryParseAmount } from '../../utils';
import { useWalletModalToggle, useRedeemModalToggle } from '../../state/application/hooks';
import withConnectWalletCheckWrapper from '../../hoc/withConnectWalletCheckWrapper';
import withApproveTokenCheckWrapper from '../../hoc/withApproveTokenCheckWrapper';
import withWrongNetworkCheckWrapper from '../../hoc/withWrongNetworkCheckWrapper';
import { TabGroup } from '../Common/TabGroup';

import EthIcon from '../../images/icons/iconEthereum.svg';
import SVGIcon from '../../images/icons/iconBSC.svg';
import PolygonIcon from '../../images/icons/iconPolygon.svg';
import VotingPowerArea from './VotingPower';
import RedeemModal from '../RedeemModal';

const TabsMocking = [
  { icon: EthIcon, title: 'Ethereum' },
  { icon: SVGIcon, title: 'BSC' },
  { icon: PolygonIcon, title: 'Polygon' },
];


const Staking = () => {
  const { account, chainId } = useWeb3React();
  const [inputAmount, setInputAmount] = useState<string>('0');
  const [isShowArchived, setIsShowArchived] = useState<boolean>(true);
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
    STAKING_ADDRESSES[chainId as ChainId],
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
    STAKING_ADDRESSES[chainId as ChainId],
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
      return STAKING_ADDRESSES[chainId as ChainId] !== AddressZero;
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

  const [activeChainTab, setActiveChainTab] = useState(TabsMocking[0].title);

  return (
    <div sx={styles.container}>
      <div sx={styles.stakingPageWrapper}>
        <div sx={styles.heading}>
          <h1>Staking</h1>
          <Web3Status unsupported={!isCorrectNetwork} />
        </div>
        <div sx={styles.votingPowerArea}>
          {/* TODO: check the fake data */}
          <VotingPowerArea totalVotingPower={'100.00'} v1VotingPower={'66'} v2VotingPower={'34'} ethProportion={'33.33'} bscProportion={'33.33'} polygonProportion={'33.33'} />
          {/* TODO: replace this switch version btn */}
          <button>switch V1</button>
        </div>
        <div sx={styles.body}>
          {/* voting power */}
          <div sx={styles.votingPowerHeader}>
            <span className="voting-power">header</span>
            <button sx={styles.normalButton}>test</button>
            <a href="/staking-v1" sx={styles.normalButton}>
              Switch to v1
            </a>
          </div>
          {/* tab group */}
          <div>
            <TabGroup
              list={TabsMocking}
              active={activeChainTab}
              onChange={setActiveChainTab}
            ></TabGroup>
          </div>
          {/* TODO: modal trigger for dev. need to be removed */}
          <button onClick={toggleRedeemModal}>REDEEM MODAL BUTTON FOR DEV</button>
          {/* info-panel */}
          {/* stake-panel */}
          <div>{/* Stake position component */}</div>
        </div>
        <RedeemModal 
          redeem={() => {}}
          // redeemState={redeemState}
        />
      </div>
    </div>
  );
};

export default Staking;
