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
import { DECORATIVE_THREAD_COLOR_LIST } from '../../constants/challenge';

export default function PlayToEarnLevelUpModal() {
  const isPlayToEarnModalOpen = usePlayToEarnLevelUpModalOpen();
  const togglePlayToEarnModal = usePlayToEarnLevelUpModalToggle();

  function getModalContent() {
    return (
      <div sx={styles.container}>
        <img src={images.levelUpGif} />
        <p sx={styles.title}>Mission Hakka-plished! 🎉</p>
        <p sx={styles.subtitle}>Level Up!</p>
        <div sx={styles.decorativeThreadContainer}>
          {DECORATIVE_THREAD_COLOR_LIST.map((ele) => <div sx={{background: ele , ...styles.decorativeThread}} />)}
        </div>
        <p sx={styles.content}>You’ve completed all 7 DeFi missions, well done!</p>
        <div sx={styles.buttonSection}>
          <MyButton onClick={togglePlayToEarnModal} styleKit="green">Explore New Missions</MyButton>
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={isPlayToEarnModalOpen}
      onDismiss={togglePlayToEarnModal}
    >
      <div style={{ width: '100%' }}>{getModalContent()}</div>
    </Modal>
  );
}
