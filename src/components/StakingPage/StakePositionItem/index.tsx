/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState, useMemo } from 'react';
import { CurrencyAmount } from '@uniswap/sdk';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { BigNumber } from 'ethers';
import Countdown, { zeroPad } from 'react-countdown';
import images from '../../../images';
import styles from './styles';
import MyButton from '../../Common/MyButton/index';
import NumericalInputCard from '../../NumericalInputCard';
import { useActiveWeb3React } from '../../../hooks/index';
import { useTokenApprove, ApprovalState } from '../../../hooks/useTokenApprove';
import { ChainId, HAKKA, STAKING_ADDRESSES } from '../../../constants';
import { useUnstakeCallback, UnstakeState } from '../../../hooks/useUnstakeCallback';
import { tryParseAmount } from '../../../utils';
import ApproveTokenButtonWrapper from '../../Common/ApproveTokenButtonWrapper';

interface StakePositionProps {
  index: number;
  sHakkaBalance: CurrencyAmount;
  stakedHakka: BigNumber;
  sHakkaReceived: BigNumber;
  until: BigNumber;
}

const StakePositionItem = (props: StakePositionProps) => {
  const { chainId, account } = useActiveWeb3React();
  const [inputAmount, setInputAmount] = useState('0');
  const {
    index, sHakkaBalance, stakedHakka, sHakkaReceived, until,
  } = props;
  const stakingValue = useMemo(
    () => parseUnits(inputAmount || '0').mul(stakedHakka || 0).div(!sHakkaReceived || sHakkaReceived.eq(0) ? 1 : sHakkaReceived),
    [inputAmount, stakedHakka, sHakkaReceived],
  );

  const [approveState, approve] = useTokenApprove(
    HAKKA[chainId as ChainId],
    STAKING_ADDRESSES[chainId as ChainId],
    inputAmount,
  );

  const timeOption: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  const lockUntil = useMemo(() => new Date(until?.mul(1000).toNumber()).toLocaleString(
    'en-US',
    timeOption,
  ), [until]);

  const [isShowRedeem, setIsShowRedeem] = useState<boolean>(false);

  const [unstakeState, unstakeCallback] = useUnstakeCallback(
    STAKING_ADDRESSES[chainId as ChainId],
    account,
    index,
    parseUnits(inputAmount || '0'),
  );

  const countdownRenderer = ({ days }) => (
    <div sx={styles.redeemToggleCountdown}>
      <span>
        {zeroPad(days)}
        {' '}
        Days Left
      </span>
    </div>
  );

  const RedeemButton = ApproveTokenButtonWrapper(MyButton)

  return (
    <div sx={styles.positionFormWrapper}>
      <span sx={styles.positionNumber}>{index + 1}</span>
      <div sx={styles.positionCard}>
        <div sx={styles.positionItem}>
          <div sx={styles.stackedHakkaWrapper}>
            <p>Staked HAKKA</p>
            <p sx={styles.amountFontColor}>{(+formatUnits(stakedHakka || 0)).toFixed(4)}</p>
          </div>
          <div sx={styles.stackedHakkaWrapper}>
            <p>Get sHAKKA</p>
            <p sx={styles.amountFontColor}>{(+formatUnits(sHakkaReceived || 0)).toFixed(4)}</p>
          </div>
          <div sx={styles.stackedHakkaWrapper}>
            <p>Until</p>
            <p sx={styles.amountFontColor}>{lockUntil}</p>
          </div>
          {Date.now() < until?.mul(1000).toNumber() ? (
            <Countdown
              date={new Date(until?.mul(1000).toNumber())}
              renderer={countdownRenderer}
            />
          )
            : (
              <div
                sx={styles.redeemToggleBtn}
                onClick={() => setIsShowRedeem(!isShowRedeem)}
              >
                <span>Redeem</span>
                <img src={isShowRedeem ? images.iconTop : images.iconDown} />
              </div>
            )}
        </div>
        {isShowRedeem && (
        <div sx={styles.redeemContainer}>
          <div sx={styles.inputArea}>
            <div sx={styles.balance}>
              <span>Burn</span>
              <span>
                {'sHAKKA Balance: '}
                {sHakkaBalance.toFixed(2) || '0.00'}
              </span>
            </div>
            <NumericalInputCard
              value={inputAmount}
              onUserInput={setInputAmount}
              tokenBalance={tryParseAmount(formatUnits(sHakkaReceived || 0, 18))}
              approve={approve}
              approveState={approveState}
            />
          </div>
          <div sx={styles.receiveAmountWrapper}>
            <img src={images.iconBecome} sx={styles.iconBecome} />
            <div>
              <p sx={{ fontWeight: 'normal' }}>Receive HAKKA</p>
              <p>{(+formatUnits(stakingValue || 0)).toFixed(4)}</p>
            </div>
          </div>
          <div sx={styles.redeemBtn}>
            <RedeemButton
              styleKit={'green'}
              isDisabledWhenNotPrepared={false}
              onClick={unstakeCallback}
              isApproved={approveState === ApprovalState.APPROVED}
              approveToken={approve}
              exceptionHandlingDisabled={
                Date.now() < until?.mul(1000).toNumber() 
                || unstakeState === UnstakeState.PENDING 
                || sHakkaReceived.eq(0)
              }
            >
              Redeem
            </RedeemButton>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default StakePositionItem;
