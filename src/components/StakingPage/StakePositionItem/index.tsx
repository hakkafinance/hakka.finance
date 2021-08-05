/** @jsx jsx */
import { jsx } from "theme-ui";
import images from "../../../images";
import React, { useState, useMemo } from "react";
import { TokenAmount } from '@uniswap/sdk';
import styles from "./styles";
import MyButton from "../../Common/MyButton/index";
import NumericalInputCard from "../NumericalInputCard";
import { useActiveWeb3React } from "../../../hooks/index";
import { useApproveCallback } from "../../../hooks/useApproveCallback";
import { ChainId, HAKKA, STAKING_ADDRESSES } from "../../../constants";
import { formatUnits, parseUnits } from '@ethersproject/units';
import { useUnstakeCallback, UnstakeState } from '../../../hooks/useUnstakeCallback';
import { BigNumber } from 'ethers';

interface StakePositionProps {
  index: number;
  stakedHakka: BigNumber;
  sHakkaReceived: BigNumber;
  until: BigNumber;
}

const StakePositionItem = (props: StakePositionProps) => {
  const { chainId, account } = useActiveWeb3React();
  const [inputAmount, setInputAmount] = useState('0');
  const { index, stakedHakka, sHakkaReceived, until } = props
  const stakingValue = useMemo(
    () => parseUnits(inputAmount || '0').mul(stakedHakka || 0).div(sHakkaReceived || 1)
    , [inputAmount, stakedHakka, sHakkaReceived]);

  const [approveState, approveCallback] = useApproveCallback(
    HAKKA[chainId as ChainId],
    STAKING_ADDRESSES[chainId as ChainId]
  );

  const timeOption: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }

  const lockUntil = useMemo(() => {
    return new Date(until?.mul(1000).toNumber()).toLocaleString(
      'en-US',
      timeOption,
    )
  }, [until]);

  const [isShowRedeem, setIsShowRedeem] = useState<boolean>(false);

  const [unstakeState, unstakeCallback] = useUnstakeCallback(
    STAKING_ADDRESSES[chainId as ChainId],
    account,
    index,
    parseUnits(inputAmount || '0'),
  );

  return (
      <div sx={styles.positionFormWrapper}>
        <span sx={styles.positionNumber}>{index+1}</span>
        <div sx={styles.positionCard}>
          <div sx={styles.positionItem}>
            <div sx={styles.stackedHakkaWrapper}>
              <p>Staked HAKKA</p>
              <p sx={styles.amountFontColor}>{formatUnits(stakedHakka || 0)}</p>
            </div>
            <div sx={styles.stackedHakkaWrapper}>
              <p>Get sHAKKA</p>
              <p sx={styles.amountFontColor}>{formatUnits(sHakkaReceived || 0)}</p>
            </div>
            <div sx={styles.stackedHakkaWrapper}>
              <p>Until</p>
              <p sx={styles.amountFontColor}>{lockUntil}</p>
            </div>
            <div
              sx={styles.redeemToggleBtn}
              onClick={() => setIsShowRedeem(!isShowRedeem)}
            >
              <span>Redeem</span>
              <img src={isShowRedeem ? images.iconTop : images.iconDown} />
            </div>
          </div>
          {isShowRedeem && (
            <div sx={styles.redeemContainer}>
              <div sx={styles.inputArea}>
                <div sx={styles.balance}>
                  <span>Burn</span>
                </div>
                <NumericalInputCard
                  value={inputAmount}
                  onUserInput={setInputAmount}
                  hakkaBalance={TokenAmount.ether(formatUnits(sHakkaReceived || 0, 0)) as TokenAmount}
                  approveCallback={approveCallback}
                  approveState={approveState}
                />
              </div>
              <div sx={styles.receiveAmountWrapper}>
                <img src={images.iconBecome} sx={styles.iconBecome}/>
                <div>
                  <p sx={{ fontWeight: "normal" }}>Receive HAKKA</p>
                  <p>{formatUnits(stakingValue)}</p>
                </div>
              </div>
              <div sx={styles.redeemBtn}>
                <MyButton type={"green"} click={unstakeCallback} disabled={Date.now() < until?.mul(1000).toNumber() || unstakeState === UnstakeState.PENDING}>Redeem</MyButton>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default StakePositionItem;
