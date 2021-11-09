/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useMemo } from 'react';
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
import { useHakkaStake, StakeState } from '../../hooks/staking/useHakkaStake';
import StakePositionItem from './StakePositionItem/index';
import {
  ChainId, HAKKA, STAKING_ADDRESSES, stakingMonth,
} from '../../constants';
import { tryParseAmount } from '../../utils';
import { useWalletModalToggle } from '../../state/application/hooks';
import withConnectWalletCheckWrapper from '../../hoc/withConnectWalletCheckWrapper';
import withApproveTokenCheckWrapper from '../../hoc/withApproveTokenCheckWrapper';
import withWrongNetworkCheckWrapper from '../../hoc/withWrongNetworkCheckWrapper';

const Staking = () => {
  const { account, chainId } = useWeb3React();
  const [inputAmount, setInputAmount] = useState<string>('0');
  const [isShowArchived, setIsShowArchived] = useState<boolean>(true);
  const [isSortByUnlockTime, setIsSortByUnlockTime] = useState<boolean>(false);

  const hakkaBalance = useTokenBalance(
    account as string,
    HAKKA[chainId as ChainId],
  );
  const {
    stakingBalance, sHakkaBalance, votingPower, stakingRate, vaults,
  } = useStakingData();

  const [approveState, approve] = useTokenApprove(
    HAKKA[chainId as ChainId],
    STAKING_ADDRESSES[chainId as ChainId],
    inputAmount,
  );

  const [lockTime, setLockTime] = useState<number>(12);
  const timeOption: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  const lockUntil = useMemo(() => new Date(Date.now() + lockTime * 2592000 * 1000).toLocaleString(
    'en-US',
    timeOption,
  ), [lockTime]);

  const sHakkaPreview = useMemo(() => (stakingRate && inputAmount ? tryParseAmount(stakingRate[stakingMonth.indexOf(lockTime)]).multiply(tryParseAmount(inputAmount)).divide(1e18.toString()) : 0),
    [lockTime, stakingRate, inputAmount]);

  const [stakeState, stake] = useHakkaStake(
    STAKING_ADDRESSES[chainId as ChainId],
    account,
    parseUnits(inputAmount || '0'),
    lockTime,
  );

  const toggleWalletModal = useWalletModalToggle();

  const StakeButton = withApproveTokenCheckWrapper(
    withWrongNetworkCheckWrapper(
      withConnectWalletCheckWrapper(MyButton)
    )
  )

  const [isCorrectInput, setIsCorrectInput] = useState<boolean>(true);

  const isCorrectNetwork = useMemo<boolean>(() => {
    if(chainId){
      return STAKING_ADDRESSES[chainId as ChainId] !== AddressZero;
    }
    return true;
  }, [chainId]);  

  const sortedPosition = useMemo(() => {
    let archivedPosition = [];
    let unarchivePosition = [];
    
    vaults.forEach((vault, index) => {
      if(vault?.result?.hakkaAmount.isZero()) {
        archivedPosition.push({...vault, 'index': index});
      } else {
        unarchivePosition.push({...vault, 'index': index});
      }
    });
    
    archivedPosition = archivedPosition.reverse();
    unarchivePosition = unarchivePosition.reverse();
    
    if (isSortByUnlockTime) {
      unarchivePosition.sort(function (a, b) {
        return a?.result?.unlockTime - b?.result?.unlockTime
      });
      return [unarchivePosition, archivedPosition]
    } else {
      unarchivePosition.sort(function (a, b) {
        return b?.index - a?.index
      });
      return [unarchivePosition, archivedPosition]
    }
  }, [isSortByUnlockTime, vaults]);

  return (
    <div sx={styles.container}>
      <div sx={styles.stakingPageWrapper}>
        <div sx={styles.heading}>
          <h1>Staking</h1>
          <Web3Status unsupported={!isCorrectNetwork} />
        </div>
        <div sx={styles.body}>
          {/* infoPart */}
          <div>
            <div sx={styles.infoArea}>
              <div sx={styles.amountArea}>
                <h4>Stake to increase power</h4>
                <div sx={styles.valueWrapper}>
                  <span>Wallet sHAKKA balance</span>
                  <span sx={styles.amountBold}>{sHakkaBalance?.toFixed(2)}</span>
                </div>
                <div sx={styles.valueWrapper}>
                  <span>Staked HAKKA amount</span>
                  <span sx={styles.amountBold}>{stakingBalance?.toFixed(2)}</span>
                </div>
              </div>
              <div sx={styles.votingPowerCard}>
                <div sx={styles.powerContent}>
                  <div>
                    <span>Voting Power</span>
                    <p>{votingPower?.toFixed(2)}</p>
                  </div>
                  <img src={images.iconVotingPower} sx={styles.iconPower} />
                </div>
                <a sx={styles.viewGovernance} target="_blank" href="https://snapshot.org/#/hakka.eth" rel="noreferrer">
                  <span>View governance</span>
                  <img src={images.iconLinkNormal} />
                </a>
              </div>
            </div>
          </div>
          {/* stakingForm */}
          <div sx={styles.stakingCard}>
            <div sx={styles.hakkaBalanceWrapper}>
              <span>Amount</span>
              <span>
                HAKKA Balance:
                {' '}
                {isCorrectNetwork 
                  ? (hakkaBalance?.toFixed(2) || '0.00')
                  : '-'
                }
              </span>
            </div>
            <NumericalInputField
              value={inputAmount}
              onUserInput={setInputAmount}
              tokenBalance={hakkaBalance}
              approve={approve}
              approveState={approveState}
              setIsCorrectInput={setIsCorrectInput}
            />
            <p sx={{ margin: '20px 0 8px 0' }}>Lock time</p>
            <div sx={styles.optionContainer}>
              <div sx={styles.monthSwitch}>
                <div sx={styles.optionWrapper}>
                  {stakingMonth.map((month) => (
                    <div
                      onClick={() => setLockTime(month)}
                      sx={
                        lockTime === month
                          ? styles.optionItemActive
                          : styles.optionItem
                      }
                      key={month}
                    >
                      {month}
                    </div>
                  ))}
                </div>
                <span>Month(s)</span>
              </div>
              <span sx={styles.lockTimeUntil}>
                until {lockUntil}
              </span>
            </div>
            <div sx={styles.getsHakkaWrapper}>
              <span sx={{ fontWeight: 'normal' }}>
                Get sHAKKA (Voting Power)
              </span>
              <span>{sHakkaPreview?.toFixed(4)}</span>
            </div>
            <div sx={styles.stakeBtn}>
              <StakeButton
                styleKit={'green'}
                isDisabledWhenNotPrepared={false}
                onClick={stake}
                isConnected={!!account}
                connectWallet={toggleWalletModal}
                isApproved={approveState === ApprovalState.APPROVED}
                approveToken={approve}
                disabled={stakeState === StakeState.PENDING
                  || approveState === ApprovalState.UNKNOWN
                  || !isCorrectInput
                }
                isCorrectNetwork={isCorrectNetwork}
              >
                Stake
              </StakeButton>
            </div>
          </div>
        </div>

        {/* link area */}
        <div sx={styles.sHakkaRewardLinkArea}>
          <hr sx={styles.hr} />
          <div sx={styles.sHakkaRewardLinkWrapper}>
            <span>Earn more Hakka</span>
            <a sx={styles.sHakkaRewardLinkBtn} href="/farms/0xF4D1F9674c8e9f29A69DC2E6f841292e675B7977" rel="noreferrer">
              <span>sHAKKA Reward</span>
              <img src={images.iconForwardGreen} />
            </a>
          </div>
        </div>
        <div sx={styles.positionContainer}>
          <div sx={styles.positionHeader}>
            <h2 sx={styles.positionTitle}>Stake position</h2>
            <button 
              sx={isSortByUnlockTime ? {...styles.sortBtn, ...styles.activeSortBtn} : {...styles.sortBtn, ...styles.inactiveSortBtn}} 
              onClick={() => setIsSortByUnlockTime(!isSortByUnlockTime)}
            >
              <img sx={!isSortByUnlockTime ? styles.inactiveSVG : {}}  src={images.iconSort}/>
              <span>Sort by expiry date</span>
            </button>
          </div>
          {sortedPosition[0]?.map((vault, index) => {
            return <StakePositionItem
            key={index}
            sHakkaBalance={sHakkaBalance}
            index={vault.index}
            stakedHakka={vault?.result?.hakkaAmount}
            sHakkaReceived={vault?.result?.wAmount}
            until={vault?.result?.unlockTime}
            />
          })}
          <div sx={{ display: 'inline-block' }}>
            <div onClick={() => setIsShowArchived(!isShowArchived)} sx={styles.archivedTitle}>
              <p>Archived</p>
              <img src={isShowArchived ? images.iconUp : images.iconDown} />
            </div>
          </div>
          { isShowArchived && sortedPosition[1]?.map((vault, index) => {
            return <StakePositionItem
            key={index}
            sHakkaBalance={sHakkaBalance}
            index={vault.index}
            stakedHakka={vault?.result?.hakkaAmount}
            sHakkaReceived={vault?.result?.wAmount}
            until={vault?.result?.unlockTime}
            />
          })}
        </div>
      </div>
    </div>
  );
};

export default Staking;
