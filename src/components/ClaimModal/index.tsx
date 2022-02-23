/** @jsx jsx */
import { jsx } from 'theme-ui';
import {
  useClaimModalOpen,
  useClaimModalToggle,
} from '../../state/application/hooks';
import images from '../../images';
import Modal from '../Modal';
import styles from './styles';
import { MyButton } from '../Common';
import { ClaimState } from '../../hooks/farm/useRewardsClaim';

interface ClaimModalInterface {
  claim: ()=> void
  claimState: ClaimState
  claimableReward: string
}

const ClaimModal = (props:ClaimModalInterface) => {
  const { claim, claimState, claimableReward } = props;
  const claimModalOpen = useClaimModalOpen();
  const toggleClaimModal = useClaimModalToggle();

  function getModalContent() {
    return (
      <div sx={styles.container}>
        <div sx={styles.illustration}/>
        <div sx={styles.heading}>
          <h2>Claim Reward</h2>
          <img src={images.iconDeleteRound} onClick={toggleClaimModal} />
        </div>
        <div sx={styles.stateCard}>
          <div sx={{fontSize: "0px"}}>
            <img src={images.iconStep1} />
            <div sx={styles.lineStyle} />
            <div sx={styles.activeRing}>
              <img src={images.iconStep2} />
            </div>
            <div sx={styles.lineStyle} />
            <img src={images.iconStep3} />
          </div>
          <div sx={styles.stateInfo}>
            <h4>Staked</h4>
            <p>Get HAKKA rewards</p>
            <h4>Claim</h4>
            <p>Move rewards to vesting contract</p>
            <h4>Vesting</h4>
            <p>Withdraw 17.38% every 19 days</p>
          </div>
        </div>
        <p sx={styles.message}>
          Your
          <span> {claimableReward} HAKKA</span>
          {' '}
          rewards will be moved to vesting contract
        </p>
        <div sx={{ display: 'inline-block' }}>
          <a 
            href='https://medium.com/hakkafinance/vesting-contract-9ab2ff24bf76'
            sx={styles.learnMoreLink}
            target="_blank"
          >
            <span>Learn more </span>
            <img src={images.iconLinkNormal} />
          </a>
        </div>
        <div sx={styles.confirmBtn}>
          <MyButton onClick={claim} disabled={claimState === ClaimState.PENDING}>
            {claimState === ClaimState.PENDING ? 'Pending' : 'Confirm'}
          </MyButton>
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={claimModalOpen}
      onDismiss={toggleClaimModal}
    >
      <div>{getModalContent()}</div>
    </Modal>
  );
}

export default ClaimModal;