/** @jsx jsx */
import { useCallback, useState } from 'react';
import { jsx } from 'theme-ui';
import { navigate } from 'gatsby';
import { parseUnits } from 'ethers/lib/utils';
import {
  useRedeemModalOpen,
  useRedeemModalToggle,
} from '../../state/application/hooks';
import images from '../../images';
import Modal from '../Modal';
import styles from './styles';
import { MyButton } from '../Common';
import NumericalInputField from '../NumericalInputField';
import { ApprovalState } from '../../hooks/useTokenApprove';
import { ChainId, NEW_SHAKKA_ADDRESSES, UnstakeState } from '../../constants';
import { useHakkaUnstake } from '../../hooks/staking/useHakkaUnstake';
import useStakingVault from '../../hooks/staking/useStakingVault';
import { unstakeReceivedAmount } from '../../utils/unstakeReceivedAmount';

interface RedeemModalInterface {
  chainId: ChainId;
  account: string;
  index: number;
  sHakkaBalance?: string;
  sHakkaBalanceInFarming?: string;
}

const RedeemModal = ({ 
  chainId, 
  account, 
  index, 
  sHakkaBalance, 
  sHakkaBalanceInFarming 
}: RedeemModalInterface) => {
  const redeemModalOpen = useRedeemModalOpen();
  const toggleRedeemModal = useRedeemModalToggle();
  const [inputAmount, setInputAmount] = useState('0');
  const [isCorrectInput, setIsCorrectInput] = useState<boolean>(true);
  const {vault} = useStakingVault();
  const receiveHakkaAmount = unstakeReceivedAmount(index, inputAmount, vault);

  const [unstakeState, unstake] = useHakkaUnstake(
    NEW_SHAKKA_ADDRESSES[chainId as ChainId],
    account,
    index,
    parseUnits(inputAmount || '0'),
  );

  return (
    <Modal
      isOpen={redeemModalOpen}
      onDismiss={toggleRedeemModal}
    >
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
            approve={()=>{}} // TODO: check this
            approveState={ApprovalState.APPROVED} // TODO: check this
            setIsCorrectInput={setIsCorrectInput}
          />
        </div>
        <p sx={styles.sHakkaBalanceTitle}>Your&nbsp;<span>sHAKKA</span>&nbsp;balance in farming pool</p>
        <div sx={styles.sHakkaInFarmContainer}>
          <p>{sHakkaBalanceInFarming || '-'}</p>
          <div sx={styles.sHakkaPoolLink} onClick={() => navigate(`/farms`)}>
            <p>sHAKKA Pool</p>
            <img sx={{opacity: '0.5'}} src={images.iconArrowRight} />
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
        <MyButton onClick={unstake} styleKit='green' disabled={isCorrectInput || unstakeState === UnstakeState.PENDING}>
          {unstakeState === UnstakeState.PENDING ? 'Pending' : 'Confirm'}
        </MyButton>
      </div>
    </Modal>
  );
}

export default RedeemModal;