/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useEffect, useState } from 'react';
import styles from './styles'
import { useActiveWeb3React } from '../../../hooks/index';
import BigNumber from 'bignumber.js';
import {
  isAddress,
  isERC20Contract,
  getTokenDecimals,
  getTokenName,
  getTokenSymbol
} from '../../../utils/index'


interface RewardValueProps {
  localRewardAmount: { [key: string]: BigNumber };
}
// ----------------------------------------------
const estimateAmount = 500;
// ----------------------------------------------

const RewardValue = (props: RewardValueProps) => {

  return (
    <div sx={styles.totalValueWrapper}>
      <span>Total Value</span>
      <span sx={styles.totalValueAmount}>{estimateAmount} USD</span>
    </div>
  )
}

export default RewardValue