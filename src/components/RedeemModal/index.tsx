/** @jsx jsx */
import { useState } from 'react';
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
import {
  ChainId,
  NEW_SHAKKA_ADDRESSES,
  UnstakeState,
} from '../../constants';
import { useHakkaUnstake } from '../../hooks/staking/useHakkaUnstake';
import { unstakeReceivedAmount } from '../../utils/unstakeReceivedAmount';
import { tryParseAmount } from '../../utils';
import { VaultType } from '../../hooks/staking/useStakingVault';
import withWrongNetworkCheckWrapper from '../../hoc/withWrongNetworkCheckWrapper';
import withConnectWalletCheckWrapper from '../../hoc/withConnectWalletCheckWrapper';

interface RedeemModalInterface {
  vaults?: VaultType[];
  chainId: ChainId;
  account: string;
  index: number;
  sHakkaBalance?: string;
  sHakkaBalanceInFarming?: string;
  isCorrectNetwork: boolean;
  toggleWalletModal(): void;
}

const RedeemButton = withWrongNetworkCheckWrapper(
  withConnectWalletCheckWrapper(MyButton)
);

const RedeemModal = ({
  vaults,
  chainId,
  account,
  index,
  sHakkaBalance,
  sHakkaBalanceInFarming,
  isCorrectNetwork,
  toggleWalletModal,
}: RedeemModalInterface) => {
  const redeemModalOpen = useRedeemModalOpen();
  const toggleRedeemModal = useRedeemModalToggle();
  const [inputAmount, setInputAmount] = useState('0');
  const [isCorrectInput, setIsCorrectInput] = useState<boolean>(true);
  const vault = vaults[index];
  const receiveHakkaAmount = unstakeReceivedAmount(inputAmount, vault);

  const [unstakeState, unstake] = useHakkaUnstake(
    NEW_SHAKKA_ADDRESSES[chainId as ChainId],
    account,
    index,
    parseUnits(inputAmount || '0')
  );
  const sHakkaCurrencyAmount = tryParseAmount(sHakkaBalance);

  return (
    <Modal isOpen={redeemModalOpen} onDismiss={toggleRedeemModal}>
      <div sx={styles.container}>
        <div sx={styles.heading}>
          <h2>Redeem</h2>
          <img src={images.iconDeleteRound} onClick={toggleRedeemModal} />
        </div>
        <div sx={styles.hakkaBalanceContainer}>
          <span>Burn</span>
          <span>
            sHAKKA Balance: {parseFloat(sHakkaBalance).toFixed(2) || '-'}
          </span>
        </div>
        <div sx={styles.numericalInputWrapper}>
          <NumericalInputField
            value={inputAmount}
            onUserInput={setInputAmount}
            tokenBalance={sHakkaCurrencyAmount}
            approve={() => {}} // TODO: check this
            approveState={ApprovalState.APPROVED} // TODO: check this
            setIsCorrectInput={setIsCorrectInput}
          />
        </div>
        <p sx={styles.sHakkaBalanceTitle}>
          Your&nbsp;<span>sHAKKA</span>&nbsp;balance in farming pool
        </p>
        <div sx={styles.sHakkaInFarmContainer}>
          <p>{sHakkaBalanceInFarming || '-'}</p>
          <div sx={styles.sHakkaPoolLink} onClick={() => navigate(`/farms`)}>
            <p>sHAKKA Pool</p>
            <img sx={{ opacity: '0.5' }} src={images.iconArrowRight} />
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
        <RedeemButton
          onClick={unstake}
          styleKit="green"
          disabled={!isCorrectInput || unstakeState === UnstakeState.PENDING}
          isDisabledWhenNotPrepared={false}
          isConnected={!!account}
          connectWallet={toggleWalletModal}
          isCorrectNetwork={isCorrectNetwork}
          targetNetwork={chainId}
        >
          {unstakeState === UnstakeState.PENDING ? 'Pending' : 'Confirm'}
        </RedeemButton>
      </div>
    </Modal>
  );
};

export default RedeemModal;
