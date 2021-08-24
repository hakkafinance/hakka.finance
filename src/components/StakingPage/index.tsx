/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useMemo } from 'react';
import { parseUnits } from '@ethersproject/units';
import { useWeb3React } from '@web3-react/core';
import { AddressZero } from '@ethersproject/constants';
import images from '../../images';
import styles from './styles';
import MyButton from '../../components/Common/MyButton/index';
import Web3Status from '../Web3Status';
import NumericalInputCard from '../NumericalInputCard';
import { useTokenBalance } from '../../state/wallet/hooks';
import { useStakingData } from '../../data/StakingData';
import { useTokenApprove, ApprovalState } from '../../hooks/useTokenApprove';
import { useStakeCallback, StakeState } from '../../hooks/useStakeCallback';
import { useTokenAllowance } from '../../data/Allowances';
import StakePositionItem from './StakePositionItem/index';
import {
  ChainId, HAKKA, STAKING_ADDRESSES, stakingMonth,
} from '../../constants';
import { tryParseAmount } from '../../utils';
import ConnectWalletButtonWrapper from '../Common/ConnectWalletButtonWrapper';
import ApproveTokenButtonWrapper from '../Common/ApproveTokenButtonWrapper';
import { useWalletModalToggle } from '../../state/application/hooks';
import WithWrongNetworkCheckWrapper from '../Common/WithWrongNetworkCheckWrapper';

const Staking = () => {
  const { account, chainId } = useWeb3React();

  const [inputAmount, setInputAmount] = useState<string>('0');

  const tokenAllowance = useTokenAllowance(
    HAKKA[chainId as ChainId],
    account ?? undefined,
    STAKING_ADDRESSES[chainId as ChainId],
  );

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

  const [stakeState, stakeCallback] = useStakeCallback(
    STAKING_ADDRESSES[chainId as ChainId],
    account,
    parseUnits(inputAmount || '0'),
    lockTime,
  );

  const toggleWalletModal = useWalletModalToggle();

  const StakeButton = ApproveTokenButtonWrapper(
    ConnectWalletButtonWrapper(
      WithWrongNetworkCheckWrapper(MyButton)
    )
  )

  return (
    <div sx={styles.container}>
      <div sx={styles.stakingPageWrapper}>
        <div sx={styles.heading}>
          <h1>Staking</h1>
          <Web3Status unsupported={STAKING_ADDRESSES[chainId as ChainId] === AddressZero} />
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
                {hakkaBalance?.toFixed(2) || '0.00'}
              </span>
            </div>
            <NumericalInputCard
              value={inputAmount}
              onUserInput={setInputAmount}
              tokenBalance={hakkaBalance}
              approve={approve}
              approveState={approveState}
            //  amountError={amountError}
            //  totalSupplyError={totalSupplyError}
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
                onClick={stakeCallback}
                isConnected={!!account}
                connectWallet={toggleWalletModal}
                isApproved={approveState === ApprovalState.APPROVED}
                approveToken={approve}
                exceptionHandlingDisabled={
                  stakeState === StakeState.PENDING 
                  || approveState === ApprovalState.UNKNOWN
                }
                unsupported={STAKING_ADDRESSES[chainId as ChainId] === AddressZero}
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
          <h2 sx={styles.positionHeading}>Stake position</h2>
          {vaults.map((vault, index) => 
            <StakePositionItem 
              key={index} 
              sHakkaBalance={sHakkaBalance} 
              index={index} 
              stakedHakka={vault?.result?.hakkaAmount} 
              sHakkaReceived={vault?.result?.wAmount} 
              until={vault?.result?.unlockTime} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Staking;
