/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react'
import { MyButton } from '../../Common';
import styles from './styles';

type IntroPageProps = {
  setIsShowMissionPage: (value: boolean) => void;
}

const IntroPage = ({ setIsShowMissionPage }: IntroPageProps) => {
  return (
    <div>
      <p>
        iGain - Interest Rate Synth (IRS) is an interest rate derivative providing lenders and borrowers a platform 
        to hedge against the risk of future changing interest rates. It empowers users to lock future interest rates
      </p>
      {/* TODO: img is not ready */}
      <div sx={{ height: '200px', border: '2px solid lightGray' }}></div>
      {/* <img /> */}
      <div sx={styles.startBtnWrapper}>
        <div sx={styles.startBtn}>
          <MyButton onClick={() => setIsShowMissionPage(true)} styleKit='green'>START NOW</MyButton>
        </div>
      </div>
    </div>
  )
}

export default IntroPage