/** @jsx jsx */
import { useState, useMemo, useEffect } from 'react';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { parseUnits } from 'ethers/lib/utils';
import { jsx } from 'theme-ui';
import {
  HAKKA,
  NEW_SHAKKA_ADDRESSES,
  ChainId,
  SEC_OF_FOUR_YEARS,
} from '../../../constants';
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

export default function StakingPanel (props: IProps) {
  const { toggleWalletModal, chainId: activeChainId, isCorrectNetwork } = props;
  const { account, error } = useWeb3React();
  const isConnected = !!account || error instanceof UnsupportedChainIdError;

  const hakkaBalance = useTokenBalance(account, HAKKA[activeChainId]);

  const [inputAmount, setInputAmount] = useState<string>('');
  const [isCorrectInput, setIsCorrectInput] = useState(true);

  const safeInputAmount = useMemo(() => inputAmount === '' ? '0' : inputAmount, [inputAmount]);
  const [approveState, approve] = useTokenApprove(
    HAKKA[activeChainId],
    NEW_SHAKKA_ADDRESSES[activeChainId],
    safeInputAmount
  );
  const [secondTimer, setSecondTimer] = useState<number>(SEC_OF_FOUR_YEARS);
  const [stakeState, stake] = useHakkaStake(
    NEW_SHAKKA_ADDRESSES[activeChainId],
    account!,
    parseUnits(safeInputAmount, 18),
    secondTimer
  );

  const receivedAmount = useMemo(() => {
    const received = +stakeReceivedAmount(
      safeInputAmount,
      transferToYear(secondTimer),
      activeChainId
    );
    return isNaN(received) ? 0 : received;
  }, [stakeState.toString(), safeInputAmount, secondTimer, activeChainId]);

  useEffect(() => {
    if (stakeState === StakeState.UNKNOWN) {
      setInputAmount('');
    }
  }, [stakeState]);

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
        onUserInput={setInputAmount}
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
          isConnected={isConnected}
          connectWallet={toggleWalletModal}
          isApproved={approveState === ApprovalState.APPROVED}
          approveToken={approve}
          disabled={
            stakeState === StakeState.PENDING ||
            approveState === ApprovalState.UNKNOWN ||
            !isCorrectInput
          }
          isCorrectNetwork={isCorrectNetwork}
          targetNetwork={activeChainId}
        >
          {stakeState === StakeState.PENDING ? 'Pending' : 'Stake'}
        </StakeButton>
      </div>
    </div>
  );
}
