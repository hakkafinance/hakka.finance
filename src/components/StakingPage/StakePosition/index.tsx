/** @jsx jsx */
import { jsx } from 'theme-ui'
import images from '../../../images'
import React, { useState } from 'react';
import styles from './styles'
import MyButton from '../../../components/Common/MyButton/index'
import Web3Status from '../../Web3Status'
import NumericalInputCard from '../../VaultPage/NumericalInputCard'

const StakePosition = () => {

  return (
    <div>
      <h2>Stake position</h2>
      <div sx={styles.positionContainer}>
        <span sx={styles.positionNumber}>1</span>
        <div>
          <p>Staked HAKKA</p>
          <p sx={styles.amountFontColor}>12,520</p>
        </div>
        <div>
          <p>Get sHAKKA</p>
          <p sx={styles.amountFontColor}>1,005</p>
        </div>
        <div>
          <p>Until</p>
          <p sx={styles.amountFontColor}>07/12/2020 15:35</p>
        </div>
        <div sx={styles.DetailLink}>
          <span>Detail</span>
          <img src={images.iconLinkNormal}/>
        </div>
        <div sx={styles.redeemBtn}>
          <span>Redeem</span>
          <img src={images.iconDown} />
        </div>
      </div>
    </div>
  )
};

export default StakePosition;
