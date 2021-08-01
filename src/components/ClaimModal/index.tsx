/** @jsx jsx */
import { jsx } from 'theme-ui'
import {
  useClaimModalOpen,
  useClaimModalToggle,
} from '../../state/application/hooks';
import images from '../../images';
import Modal from '../Modal';
import styles from './styles';
import MyButton from '../Common/MyButton';

export default function ClaimModal() {
  const claimModalOpen = useClaimModalOpen();
  const toggleClaimModal = useClaimModalToggle();

  function getModalContent() {
    return (
      <div sx={styles.container}>
        <div sx={styles.heading}>
          <h2>Claim Reward</h2>
          <img src={images.iconDeleteRound} onClick={toggleClaimModal} />
        </div>
        <div sx={styles.stateCard}>
          <div>
            <div sx={styles.ringStyle}> 1</div>
            <div sx={styles.lineStyle}></div>
            <div sx={styles.activeRing}> 2</div>
            <div sx={styles.lineStyle}></div>
            <div sx={styles.ringStyle}> 3</div>
          </div>
          <div sx={styles.stateInfo}>
            <h4>Staked</h4>
            <p>Get HAKKA rewards</p>
            <h4>Claim</h4>
            <p>Move rewards to vesting contract</p>
            <h4>Vesting</h4>
            <p>withDraw 19% every 19 days</p>
          </div>
        </div>
        <p sx={styles.message}>Your <span>2,436.0388 HAKKA</span> rewards will be moved to vesting contract</p>
        <div sx={{display:'inline-block'}} >
          <div sx={styles.learnMoreLink}>
            <span>Learn more </span>
            <img src={images.iconLinkNormal} />
          </div>
        </div>
        <div sx={styles.confirmBtn}>
          <MyButton>
            confirm
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
