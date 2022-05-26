/** @jsx jsx */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { jsx, Switch } from 'theme-ui';
import { parseUnits } from 'ethers/lib/utils';
import {
  useRestakeModalOpen,
  useRestakeModalToggle,
} from '../../state/application/hooks';
import images from '../../images';
import Modal from '../Modal';
import styles, { headerWrapper } from './styles';
import { MyButton } from '../Common';
import NumericalInputField from '../NumericalInputField';
import { ApprovalState, useTokenApprove } from '../../hooks/useTokenApprove';
import VotingPowerSection from '../StakingPage/StakingPanel/VotingPowerSection';
import LockPeriodOptions from '../StakingPage/StakingPanel/LockPeriodOptions.tsx';
import { useTokenBalance } from '../../state/wallet/hooks';
import { ChainId, HAKKA, NEW_SHAKKA_ADDRESSES, TransactionState } from '../../constants';
import useHakkaRestake from '../../hooks/staking/useHakkaRestake';
import { restakeReceivedAmount } from '../../utils/stakeReceivedAmount';
import { transferToYear } from '../../utils';
import withApproveTokenCheckWrapper from '../../hoc/withApproveTokenCheckWrapper';
import withWrongNetworkCheckWrapper from '../../hoc/withWrongNetworkCheckWrapper';
import withConnectWalletCheckWrapper from '../../hoc/withConnectWalletCheckWrapper';
import { VaultType } from '../../hooks/staking/useStakingVault';
interface RestakeModalInterface {
  index: number;
  vaults?: VaultType[];
  account: string;
  chainId: ChainId;
  isCorrectNetwork: boolean;
  toggleWalletModal(): void;
}

interface StayTheSameSwitchWithTitleType {
  title?: string;
  switchState: boolean;
  handleSwitchChange?: () => void;
  isDisable?: boolean;
}

const StayTheSameSwitchWithTitle = ({
  title,
  switchState,
  handleSwitchChange,
  isDisable,
}: StayTheSameSwitchWithTitleType) => {
  return (
    <div sx={headerWrapper}>
      <p>{title}</p>
      <div>
        <Switch
          disabled={isDisable}
          id="stake-position-switch"
          className="switch"
          label="Stay the same"
          checked={switchState}
          onChange={handleSwitchChange}
        ></Switch>
      </div>
    </div>
  );
};

// 365.25 days a year
const secOfFourYear = 31557600 * 4;

const RestakeButton = withApproveTokenCheckWrapper(
  withWrongNetworkCheckWrapper(withConnectWalletCheckWrapper(MyButton))
);

const RestakeModal = ({
  vaults,
  index,
  account,
  chainId,
  toggleWalletModal,
  isCorrectNetwork,
}: RestakeModalInterface) => {
  const restakeModalOpen = useRestakeModalOpen();
  const toggleRestakeModal = useRestakeModalToggle();
  const [inputAmount, setInputAmount] = useState('0');
  const [period, setPeriod] = useState(secOfFourYear);
  const [isCorrectInput, setIsCorrectInput] = useState<boolean>(true);
  const [isKeepAmountTheSame, setIsKeepAmountTheSame] = useState(false);
  const [isKeepPeriodTheSame, setIsKeepPeriodTheSame] = useState(false);
  const vault = vaults[index];
  const hakkaBalance = useTokenBalance(account, HAKKA[chainId]);

  const handleKeepAmountTheSame = useCallback(() => {
    setIsKeepAmountTheSame((state) => !state);
  }, []);

  const handleKeepPeriodTheSame = useCallback(() => {
    setIsKeepPeriodTheSame((state) => !state);
  }, []);

  let timeLeft = vault?.unlockTime.sub(~~(Date.now() / 1000)).toNumber() ?? 0;
  timeLeft = timeLeft < 0 ? 0 : timeLeft;
  const isLeftTimeLessThan30Mins = useMemo(() => {
    if (isKeepPeriodTheSame) {
      return timeLeft < 30 * 60;
    }
    return false;
  }, [isKeepPeriodTheSame, timeLeft]);

  const [restakeState, restake] = useHakkaRestake(
    NEW_SHAKKA_ADDRESSES[chainId],
    index,
    isKeepAmountTheSame ? vault?.hakkaAmount : parseUnits(inputAmount, 18),
    isKeepPeriodTheSame ? timeLeft : period
  );

  const periodYear = transferToYear(period);
  const trialInputAmount = isKeepAmountTheSame ? '0' : inputAmount;
  const trialPeriod = isKeepPeriodTheSame ? timeLeft.toString() : periodYear;

  // TODO: stakingRate is not ready
  const [receivedSHakkaAmount, additionalSHakkaAmount] = restakeReceivedAmount(
    trialInputAmount,
    trialPeriod,
    vault,
    chainId
  );

  const [approveState, approve] = useTokenApprove(
    HAKKA[chainId],
    NEW_SHAKKA_ADDRESSES[chainId],
    inputAmount
  );

  const isDisable =
    (parseFloat(inputAmount) !== 0 && !isCorrectInput) ||
    restakeState === TransactionState.PENDING ||
    (isKeepPeriodTheSame && isKeepAmountTheSame) ||
    parseFloat(additionalSHakkaAmount) <= 0 ||
    isLeftTimeLessThan30Mins;

  const isRestakePending = restakeState === TransactionState.PENDING;

  const btnContent = isRestakePending
    ? 'Pending'
    : isLeftTimeLessThan30Mins
    ? 'Insufficient extension period'
    : 'Confirm';

  useEffect(() => {
    if(restakeState === TransactionState.SUCCESS && restakeModalOpen) {
      toggleRestakeModal()
    }
  }, [restakeState, restakeModalOpen]);

  return (
    <Modal isOpen={restakeModalOpen} onDismiss={toggleRestakeModal}>
      <div sx={styles.container}>
        <div sx={styles.heading}>
          <h2>Restake</h2>
          <img src={images.iconDeleteRound} onClick={toggleRestakeModal} />
        </div>
        <StayTheSameSwitchWithTitle
          title="Stake more HAKKA?"
          switchState={isKeepAmountTheSame}
          handleSwitchChange={handleKeepAmountTheSame}
        />
        <div style={isKeepAmountTheSame ? { display: 'none' } : {}}>
          <div sx={styles.hakkaBalanceContainer}>
            <span>Amount</span>
            <span>HAKKA Balance: {hakkaBalance?.toFixed(2) || '-'}</span>
          </div>
          <div sx={styles.numericalInputWrapper}>
            <NumericalInputField
              value={inputAmount}
              onUserInput={val => setInputAmount(`${+val}` || '0')}
              tokenBalance={hakkaBalance}
              approve={approve}
              approveState={approveState}
              setIsCorrectInput={setIsCorrectInput}
            />
          </div>
        </div>
        <hr sx={styles.hr} />
        <StayTheSameSwitchWithTitle
          isDisable={timeLeft === 0}
          title="Adjust period?"
          switchState={isKeepPeriodTheSame}
          handleSwitchChange={handleKeepPeriodTheSame}
        />
        <div style={isKeepPeriodTheSame ? { display: 'none' } : {}}>
          <LockPeriodOptions onChange={setPeriod} timeLeft={timeLeft} />
          <p sx={styles.textHint}>
            {' '}
            You can only reselect a longer duration than the left period.
          </p>
        </div>
        <hr sx={styles.hr} />
        <h4 sx={styles.receiveShakkaTitle}>Additional sHAKKA you get...</h4>
        <div sx={styles.votingPowerSectionWrapper}>
          <VotingPowerSection
            value={parseFloat(additionalSHakkaAmount)}
            prefixSymbol
            total={parseFloat(receivedSHakkaAmount)}
          />
        </div>
        <RestakeButton
          onClick={restake}
          styleKit="green"
          disabled={isDisable}
          isDisabledWhenNotPrepared={false}
          isConnected={!!account}
          connectWallet={toggleWalletModal}
          isApproved={approveState === ApprovalState.APPROVED}
          approveToken={approve}
          targetNetwork={chainId}
          isCorrectNetwork={isCorrectNetwork}
        >
          {btnContent}
        </RestakeButton>
      </div>
    </Modal>
  );
};

export default RestakeModal;
