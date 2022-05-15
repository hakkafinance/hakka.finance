/** @jsx jsx */
import { jsx, Switch } from 'theme-ui';
import {
  useRestakeModalOpen,
  useRestakeModalToggle,
} from '../../state/application/hooks';
import images from '../../images';
import Modal from '../Modal';
import styles, { headerWrapper } from './styles';
import { MyButton } from '../Common';
import { navigate } from 'gatsby';
import NumericalInputField from '../NumericalInputField';
import { useCallback, useState } from 'react';
import { ApprovalState } from '../../hooks/useTokenApprove';
import VotingPowerSection from '../StakingPage/StakingPanel/VotingPowerSection'

interface RestakeModalInterface {
  restake: () => void;
  // restakeState?: RestakeState;
  hakkaBalance?: string;
}

interface StayTheSameSwitchWithTitleType {
  title?: string;
  switchState: boolean;
  handleSwitchChange?: () => void;
};

const StayTheSameSwitchWithTitle = ({ title, switchState, handleSwitchChange }: StayTheSameSwitchWithTitleType) => {
  return (
    <div sx={headerWrapper}>
      <p>{title}</p>
      <div>
        <Switch id="stake-position-switch" className="switch" label="Stay the same" checked={switchState} onChange={handleSwitchChange}></Switch>
      </div>
    </div>
  );
};

const RestakeModal = ({ restake, hakkaBalance }: RestakeModalInterface) => {
  const restakeModalOpen = useRestakeModalOpen();
  const toggleRestakeModal = useRestakeModalToggle();
  const [inputAmount, setInputAmount] = useState('0');
  const [isCorrectInput, setIsCorrectInput] = useState<boolean>(true);
  const [isKeepAmountTheSame, setIsKeepAmountTheSame] = useState(false);
  const [isKeepPeriodTheSame, setIsKeepPeriodTheSame] = useState(false);

  const handleKeepAmountTheSame = useCallback(() => {
    setIsKeepAmountTheSame((state) => !state);
  }, []);

  const handleKeepPeriodTheSame = useCallback(() => {
    setIsKeepPeriodTheSame((state) => !state);
  }, []);
  // 
  const receiveShakkaAmount = inputAmount ? parseFloat(inputAmount) * 0.1 : 0; // TODO: replace this
  const totalShakkaValue = 15000;

  // const [approveState, approve] = useTokenApprove(
  //  HAKKA[chainId as ChainId],  // sHakka
  //  BURNER_ADDRESS[chainId as ChainId],
  //  inputAmount,
  // );

  return (
    <Modal
      isOpen={restakeModalOpen}
      onDismiss={toggleRestakeModal}
    >
      <div sx={styles.container}>
        <div sx={styles.heading}>
          <h2>Restake</h2>
          <img src={images.iconDeleteRound} onClick={toggleRestakeModal} />
        </div>
        <StayTheSameSwitchWithTitle title='Stake more HAKKA?' switchState={isKeepAmountTheSame} handleSwitchChange={handleKeepAmountTheSame} />
        <div style={isKeepAmountTheSame ? { display: 'none' } : {}}>
          <div sx={styles.hakkaBalanceContainer}>
            <span>Amount</span>
            <span>HAKKA Balance: {hakkaBalance || '-'}</span>
          </div>
          <div sx={styles.numericalInputWrapper}>
            <NumericalInputField
              value={inputAmount}
              onUserInput={setInputAmount}
              tokenBalance={hakkaBalance as any}
              approve={()=>{}} // TODO: fill approve
              approveState={ApprovalState.NOT_APPROVED} // TODO: fill approveState
              setIsCorrectInput={setIsCorrectInput}
            />
          </div>
        </div>
        <hr sx={styles.hr} />
        <StayTheSameSwitchWithTitle title='Adjust period?' switchState={isKeepPeriodTheSame} handleSwitchChange={handleKeepPeriodTheSame}  />
        <div style={isKeepPeriodTheSame ? { display: 'none' } : {}}>
          <p sx={styles.date}>
            {/* TODO: until date is not ready */}
            Locked period until <strong>2099/03/23</strong> 
          </p>
          <p sx={styles.textHint}> You can only reselect a longer duration than the left period.</p>
        </div>
        <hr sx={styles.hr} />
        <h4 sx={styles.receiveShakkaTitle}>Additional sHAKKA you get...</h4>
        <div sx={styles.votingPowerSectionWrapper}>
          <VotingPowerSection 
            value={receiveShakkaAmount}
            prefixSymbol
            total={totalShakkaValue}
          />
        </div>
        {/* disabled={isCorrectInput || restakeState === RestakeState.PENDING} */}
        <MyButton onClick={restake} styleKit='green'>
          Confirm
          {/* {restakeState === RestakeState.PENDING ? 'Pending' : 'Confirm'} */}
        </MyButton>
      </div>
    </Modal>
  );
}

export default RestakeModal;