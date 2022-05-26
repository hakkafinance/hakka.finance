/** @jsx jsx */
import { useState, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { parseUnits } from 'ethers/lib/utils';
import { jsx } from 'theme-ui';
import { HAKKA, NEW_SHAKKA_ADDRESSES, ChainId, SEC_OF_FOUR_YEARS } from '../../../constants';
import withApproveTokenCheckWrapper from '../../../hoc/withApproveTokenCheckWrapper';
import withConnectWalletCheckWrapper from '../../../hoc/withConnectWalletCheckWrapper';
import withWrongNetworkCheckWrapper from '../../../hoc/withWrongNetworkCheckWrapper';
import { useHakkaStake } from '../../../hooks/staking/useHakkaStake';
import { StakeState } from '../../../hooks/staking/useHakkaStakeV1';
import { ApprovalState, useTokenApprove } from '../../../hooks/useTokenApprove';
import { useTokenBalance } from '../../../state/wallet/hooks';
import { transferToYear } from '../../../utils';
import { stakeReceivedAmount } from '../../../utils/stakeReceivedAmount';
import { MyButton } from '../../Common';
import NumericalInputField from '../../NumericalInputField';
import LockPeriodOptions from './LockPeriodOptions.tsx';
import styles from './styles';
import VotingPowerSection from './VotingPowerSection';

interface IProps {
  isCorrectNetwork: boolean;
  toggleWalletModal: () => void;
  chainId: ChainId;
}

const StakeButton = withApproveTokenCheckWrapper(
  withWrongNetworkCheckWrapper(withConnectWalletCheckWrapper(MyButton))
);

export default function StakingPanel(props: IProps) {
  const { isCorrectNetwork, toggleWalletModal, chainId } = props;
  const { account } = useWeb3React();

  const hakkaBalance = useTokenBalance(account, HAKKA[chainId]);

  const [inputAmount, setInputAmount] = useState<string>('0');
  const [isCorrectInput, setIsCorrectInput] = useState(true);

  const [approveState, approve] = useTokenApprove(
    HAKKA[chainId],
    NEW_SHAKKA_ADDRESSES[chainId],
    inputAmount
  );

  // TODO, use on staking
  const [secondTimer, setSecondTimer] = useState<number>(SEC_OF_FOUR_YEARS);
  const [stakeState, stake] = useHakkaStake(
    NEW_SHAKKA_ADDRESSES[chainId],
    account,
    parseUnits(inputAmount, 18),
    secondTimer
  );

  const receivedAmount = useMemo(() => {
    const received = +stakeReceivedAmount(
      inputAmount,
      transferToYear(secondTimer),
      chainId
    );
    return received;
  }, [stakeState.toString(), inputAmount, secondTimer, chainId]);

  return (
    <div sx={styles.stakingCard}>
      <div sx={styles.hakkaBalanceWrapper}>
        <span>Amount</span>
        <span>
          HAKKA Balance:{' '}
          {isCorrectNetwork ? hakkaBalance?.toFixed(4) || '0.0000' : '-'}
        </span>
      </div>
      <NumericalInputField
        value={inputAmount}
        onUserInput={val => setInputAmount(`${+val}` || '0')}
        tokenBalance={hakkaBalance}
        approve={approve}
        approveState={approveState}
        setIsCorrectInput={setIsCorrectInput}
      />

      <LockPeriodOptions onChange={setSecondTimer} />
      <p sx={styles.title}>Obtain sHAKKA (voting power)</p>
      <VotingPowerSection value={receivedAmount} />
      <div sx={styles.stakeBtn}>
        <StakeButton
          styleKit={'green'}
          isDisabledWhenNotPrepared={false}
          onClick={stake}
          isConnected={!!account}
          connectWallet={toggleWalletModal}
          isApproved={approveState === ApprovalState.APPROVED}
          approveToken={approve}
          disabled={
            stakeState === StakeState.PENDING ||
            approveState === ApprovalState.UNKNOWN ||
            !isCorrectInput
          }
          isCorrectNetwork={isCorrectNetwork}
          targetNetwork={chainId}
        >
          {stakeState === StakeState.PENDING ? 'Pending' : 'Stake'}
        </StakeButton>
      </div>
    </div>
  );
}
