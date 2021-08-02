/** @jsx jsx */
import { jsx } from 'theme-ui'
import images from '../../images'
import React from 'react';
import styles from './styles'
import MyButton from '../../components/Common/MyButton/index'
import ClaimModal from '../ClaimModal';
import { useClaimModalToggle } from '../../state/application/hooks';


const VestingPage = () => {
  const toggleClaimModal = useClaimModalToggle();

  return (
    <>
      <div sx={styles.container}>
        <div sx={styles.vestingPageWrapper}>
          <div sx={styles.backBtn}>
            <img src={images.iconBack} sx={styles.iconBack} />
            <span>Back</span>
          </div>
          <h3 onClick={toggleClaimModal} sx={styles.heading}>Vesting</h3>
          <div sx={styles.vestingCardWrapper}>
            <div sx={styles.vestingCard}>
              <div sx={styles.balanceCard}>
                <div sx={styles.iconWaitingBackgroundColor}>
                  <img src={images.iconWaiting}/>
                </div>
                <p sx={styles.vestingCardItemHeading}>Vesting Balance</p>
                <div sx={styles.balanceValueCard}>
                  <span sx={styles.balanceAmount}>1,441,7282 HAKKA</span>
                  <span sx={styles.vestingBalanceValue}>(=263.5820 USD)</span>
                </div>
              </div>
              <div>
                <div sx={styles.iconWithdrawAvailableBackgroundColor}>
                  <img src={images.iconWithdrawAvailable} />
                </div>
                <p sx={styles.vestingCardItemHeading}>Claimable Amount</p>
                <div sx={styles.displayFlex}>
                  <span sx={styles.claimableAmount}>653.9283 HAKKA</span>
                  <button
                    sx={styles.addMetamaskBtn}
                  >
                    <img src={images.iconAdd} sx={styles.iconAdd} />
                    <img src={images.iconMetamask} />
                  </button>
                </div>
              </div>
            </div>
            <div sx={styles.activeArea}>
              <div sx={styles.linkWrapper}>
                <span>Check vesting terms and learn more</span>
                <img src={images.iconLinkNormal} sx={styles.iconLink} />
              </div>
              <div sx={styles.claimBtn}>
                <MyButton
                  // click={}
                  type={'green'}
                // disabled={}
                >
                  Claim
                </MyButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ClaimModal />
    </>
  )
};

export default VestingPage