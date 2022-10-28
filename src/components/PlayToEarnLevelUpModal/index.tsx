/** @jsx jsx */
import { jsx } from 'theme-ui';
import {
  usePlayToEarnLevelUpModalOpen,
  usePlayToEarnLevelUpModalToggle,
} from '../../state/application/hooks';
import images from '../../images';
import Modal from '../Modal';
import styles from './styles';
import { MyButton } from '../Common';
import { DECORATIVE_THREAD_COLOR_MAP } from '../../constants/challenge';

export default function PlayToEarnLevelUpModal() {
  const infoModalOpen = usePlayToEarnLevelUpModalOpen();
  const toggleInfoModal = usePlayToEarnLevelUpModalToggle();

  function getModalContent() {
    return (
      <div sx={styles.container}>
        <div sx={{ borderRadius: '50%', padding: '16px' , border: '1px solid rgba(62, 189, 147, 0.3)', filter: 'drop-shadow(0px 0px 8px #6CE8B4)' }}>
          <div sx={{ borderRadius: '50%', padding: '8px' , border: '3px solid rgba(62, 189, 147, 0.7)', filter: 'drop-shadow(0px 0px 8px #6CE8B4)' }}>
            {/* TODO: gif is not ready */}
            {/* <img src={images.levelUpGif} /> */}
            <div sx={{ width: '220px', height: '220px', borderRadius: '50%'  }}></div>
          </div>
        </div>
        <p sx={styles.title}>Mission Hakka-plished! 🎉</p>
        <p sx={styles.subtitle}>New Level!</p>
        <div sx={styles.decorativeThreadContainer}>
          {DECORATIVE_THREAD_COLOR_MAP.map((ele) => <div sx={{background: ele , ...styles.decorativeThread}} />)}
        </div>
        <p sx={styles.content}>You’ve completed all 7 DeFi missions, well done!</p>
        <div sx={styles.buttonSection}>
          <MyButton onClick={toggleInfoModal} styleKit="green">New Missions</MyButton>
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={infoModalOpen}
      onDismiss={toggleInfoModal}
    >
      <div style={{ width: '100%' }}>{getModalContent()}</div>
    </Modal>
  );
}
