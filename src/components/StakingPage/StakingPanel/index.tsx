/** @jsx jsx */
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react';
import { jsx } from 'theme-ui';
import { HAKKA, STAKING_ADDRESSES, ChainId } from '../../../constants';
import withApproveTokenCheckWrapper from '../../../hoc/withApproveTokenCheckWrapper';
import withConnectWalletCheckWrapper from '../../../hoc/withConnectWalletCheckWrapper';
import withWrongNetworkCheckWrapper from '../../../hoc/withWrongNetworkCheckWrapper';
import { StakeState } from '../../../hooks/staking/useHakkaStake';
import { ApprovalState, useTokenApprove } from '../../../hooks/useTokenApprove';
import { useTokenBalance } from '../../../state/wallet/hooks';
import { MyButton } from '../../Common';
import NumericalInputField from '../../NumericalInputField';
import LockPeriodOptions from './LockPeriodOptions.tsx';
import styles from './styles';
import VotingPowerSection from './VotingPowerSection';

interface IProps {
  isCorrectNetwork: boolean;
  toggleWalletModal: () => void;
  stakeState: StakeState;
  chainId: ChainId;
}

export default function StakingPanel(props: IProps) {
  const { isCorrectNetwork, toggleWalletModal, stakeState, chainId } = props;
  const { account } = useWeb3React();

  const hakkaBalance = useTokenBalance(account, HAKKA[chainId]);

  const [inputAmount, setInputAmount] = useState<string>('0');
  const [isCorrectInput, setIsCorrectInput] = useState(true);

  const [approveState, approve] = useTokenApprove(
    HAKKA[chainId],
    STAKING_ADDRESSES[chainId],
    inputAmount
  );

  const StakeButton = withApproveTokenCheckWrapper(
    withWrongNetworkCheckWrapper(withConnectWalletCheckWrapper(MyButton))
  );

  const [secondTimer, setSecondTimer] = useState<number>(124416000);

  function mockStake() {}

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
      <p sx={styles.title}>
        Obtain sHAKA (voting power)
      </p>
      <VotingPowerSection value={0} />
      <div sx={styles.stakeBtn}>
        <StakeButton
          styleKit={'green'}
          isDisabledWhenNotPrepared={false}
          onClick={mockStake}
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
          Stake
        </StakeButton>
      </div>
    </div>
  );
}
