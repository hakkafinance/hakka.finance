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
      <div sx={styles.introGraphWrapper}>
        <h4>Let's Play To Earn!</h4>
        <p>A fantastic journey to become the best DeFi Master of the Galaxy is awaiting you, young Hakka Farmer!
          Level up and learn how to make money in DeFi & win NFTs by completing simple missions with Hakka Finance!</p>
      </div>
      <div sx={styles.startBtnWrapper}>
        <div sx={styles.startBtn}>
          <MyButton onClick={() => setIsShowMissionPage(true)} styleKit='green'>START NOW</MyButton>
        </div>
      </div>
    </div>
  )
}

export default IntroPage