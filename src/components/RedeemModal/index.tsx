/** @jsx jsx */
import { jsx } from 'theme-ui';
import {
  useRedeemModalOpen,
  useRedeemModalToggle,
} from '../../state/application/hooks';
import images from '../../images';
import Modal from '../Modal';
import styles from './styles';
import { MyButton } from '../Common';
import { navigate } from 'gatsby';
import NumericalInputField from '../NumericalInputField';
import { useCallback, useState } from 'react';
import { ApprovalState } from '../../hooks/useTokenApprove';

interface RedeemModalInterface {
  redeem: () => void;
  // redeemState?: RedeemState;
  sHakkaBalance?: string;
  sHakkaBalanceInFarming?: string;
}

const RedeemModal = ({ redeem, sHakkaBalance, sHakkaBalanceInFarming }: RedeemModalInterface) => {
  const redeemModalOpen = useRedeemModalOpen();
  const toggleRedeemModal = useRedeemModalToggle();
  const [inputAmount, setInputAmount] = useState('0');
  const [isCorrectInput, setIsCorrectInput] = useState<boolean>(true);
  const receiveHakkaAmount = parseFloat(inputAmount) * 0.1; // TODO: replace this

  // const [approveState, approve] = useTokenApprove(
  //  HAKKA[chainId as ChainId],  // sHakka
  //  BURNER_ADDRESS[chainId as ChainId],
  //  inputAmount,
  // );

  const renderModalContent = useCallback(() => (
    <div sx={styles.container}>
      <div sx={styles.heading}>
        <h2>Redeem</h2>
        <img src={images.iconDeleteRound} onClick={toggleRedeemModal} />
      </div>
      <div sx={styles.hakkaBalanceContainer}>
        <span>Burn</span>
        <span>sHAKKA Balance: {sHakkaBalance || '-'}</span>
      </div>
      <div sx={styles.numericalInputWrapper}>
        <NumericalInputField
          value={inputAmount}
          onUserInput={setInputAmount}
          tokenBalance={sHakkaBalance as any}
          approve={()=>{}} // TODO: fill approve
          approveState={ApprovalState.NOT_APPROVED} // TODO: fill approveState
          setIsCorrectInput={setIsCorrectInput}
        />
      </div>
      <p sx={styles.sHakkaBalanceTitle}>Your&nbsp;<span>sHAKKA</span>&nbsp;balance in farming pool</p>
      <div sx={styles.sHakkaInFarmContainer}>
        <p>{sHakkaBalanceInFarming || '-'}</p>
        <div sx={styles.sHakkaPoolLink} onClick={() => navigate(`/farms`)}>
          <p>sHAKKA Pool</p>
          <img src={images.iconArrowRight} />
        </div>
      </div>
      <hr sx={styles.hr} />
      <div>
        <h4 sx={styles.receiveHakkaTitle}>Receive HAKKA</h4>
        <div sx={styles.receiveHakkaWrapper}>
          <img src={images.iconHakkaCoin} />
          <span>{receiveHakkaAmount || '-'}</span>
        </div>
      </div>
      {/* disabled={isCorrectInput || redeemState === RedeemState.PENDING} */}
      <MyButton onClick={redeem} styleKit='green'>
        Confirm
        {/* {redeemState === ClaimState.PENDING ? 'Pending' : 'Confirm'} */}
      </MyButton>
    </div>
  ), [toggleRedeemModal, sHakkaBalance, inputAmount, receiveHakkaAmount, sHakkaBalanceInFarming, redeem]); // TODO: fill approve approveState isCorrectInput

  return (
    <Modal
      isOpen={redeemModalOpen}
      onDismiss={toggleRedeemModal}
    >
      <div sx={{ width: '100%' }}>{renderModalContent()}</div>
    </Modal>
  );
}

export default RedeemModal;