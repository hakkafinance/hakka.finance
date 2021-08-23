/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Token, TokenAmount } from '@uniswap/sdk';
import { useWeb3React } from '@web3-react/core';
import React, { useState, useMemo, useEffect } from 'react';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { Zero } from '@ethersproject/constants';
import styles from './styles';
import useTokenPrice from '../../../hooks/useTokenPrice';
import useTokensPrice from '../../../hooks/useTokensPrice';
import images from '../../../images/index';
import MyButton from '../../Common/MyButton';
import NumericalInputCard from '../../NumericalInputCard/index';
import { HAKKA, VESTING_ADDRESSES } from '../../../constants';
import { REWARD_POOLS } from '../../../constants/rewards';
import { POOL_ASSETES } from '../../../constants/rewards/assets';
import { useTokenBalance } from '../../../state/wallet/hooks';
import { useTokenApprove, ApprovalState } from '../../../hooks/useTokenApprove';
import { useSingleCallResult } from '../../../state/multicall/hooks';
import { tryParseAmount, shortenAddress, getEtherscanLink } from '../../../utils';
import { useRewardsData } from '../../../data/RewardsData';
import { useVestingContract } from '../../../hooks/useContract';
import { useClaimCallback, ClaimState } from '../../../hooks/useClaimCallback';
import { useExitCallback, ExitState } from '../../../hooks/useExitCallback';
import { useDepositCallback, DepositState } from '../../../hooks/useDepositCallback';
import { useWithdrawCallback, WithdrawState } from '../../../hooks/useWithdrawCallback';
import ConnectWalletButtonWrapper from '../../Common/ConnectWalletButtonWrapper';
import ApproveTokenButtonWrapper from '../../Common/ApproveTokenButtonWrapper';
import { useWalletModalToggle } from '../../../state/application/hooks';

const PoolDetail = ({ pool }) => {
  const { account, chainId } = useWeb3React();
  const rewardData = useRewardsData([pool]);
  const vestingContract = useVestingContract(VESTING_ADDRESSES[chainId]);
  const vestingValue = useSingleCallResult(
    vestingContract,
    'balanceOf',
    [account],
  );
  const vestingValueAmount = useMemo(
    () => (vestingValue.result && chainId
      ? new TokenAmount(HAKKA[chainId || 1], vestingValue.result.toString())
      : new TokenAmount(HAKKA[chainId || 1], '0')),
    [vestingValue, chainId],
  );

  const hakkaPrice = useTokenPrice('hakka-finance');
  const tokenPrice = useTokensPrice();
  const [apr, setApr] = useState('');
  const [tvl, setTvl] = useState('');

  useEffect(() => {
    let active = true;
    try {
      loadApr()
    } catch (e) {
      console.error(e);
    }
    return () => { active = false }

    async function loadApr() {
      if (!active || !hakkaPrice) { return }
      const newApr = await POOL_ASSETES[pool].getApr(parseUnits(hakkaPrice.toString(), 18));
      setApr(tryParseAmount(formatUnits(newApr?.mul(100), 18)).toFixed(2));
    }
  }, [hakkaPrice]);

  useEffect(() => {
    let active = true;
    try {
      loadTvl()
    } catch (e) {
      console.error(e);
    }
    return () => { active = false }

    async function loadTvl() {
      if (!active || !tokenPrice) { return }
      const newTvl = await POOL_ASSETES[pool].getTvl(tokenPrice);
      setTvl(tryParseAmount(formatUnits(newTvl?.mul(100), 18)).toFixed(2));
    }
  }, [tokenPrice]);

  const [stakeInputAmount, setStakeInputAmount] = useState<string>('');
  const [withdrawInputAmount, setWithdrawInputAmount] = useState<string>('');

  const token = new Token(1, REWARD_POOLS[pool].tokenAddress, 18);
  const stakedToken = new Token(1, pool, 18);
  const tokenBalance = useTokenBalance(
    account as string,
    token,
  );
  const stakedBalance = useTokenBalance(
    account as string,
    stakedToken,
  );

  const [approveState, approve] = useTokenApprove(
    token,
    pool,
    stakeInputAmount > withdrawInputAmount ? stakeInputAmount : withdrawInputAmount,
  );

  enum SwitchOption {
    DEPOSIT,
    WITHDRAW
  }

  const [switchPick, setSwitchPick] = useState<SwitchOption>(SwitchOption.DEPOSIT);

  const [claimState, claimCallback] = useClaimCallback(pool, account);
  const [exitState, exitCallback] = useExitCallback(pool, account);
  const [depositState, depositCallback] = useDepositCallback(pool, stakeInputAmount, account);
  const [withdrawState, withdrawCallback] = useWithdrawCallback(pool, withdrawInputAmount, account);

  const toggleWalletModal = useWalletModalToggle();

  const DepositButton = ApproveTokenButtonWrapper(
    ConnectWalletButtonWrapper(MyButton)
  );

  const ClaimButton = ConnectWalletButtonWrapper(MyButton);

  return (
    <div>
      <a sx={styles.btnBack} href='/farms'>
        <img src={images.iconBack} />
        <span>Back</span>
      </a>
      <div sx={styles.title}>
        <p>{REWARD_POOLS[pool].name}</p>
        <div sx={styles.infoWrapper}>
          <div sx={styles.infoItem}>
            {tvl && parseUnits(tvl).gt(Zero)
              ? <>
                <span>TVL</span>
                <span sx={styles.infoValue}> ${tvl} </span>
              </>
              : <></>}
          </div>
          <div sx={styles.infoItem}>
            <span>Contract</span>
            <a sx={styles.contractAddress} target='_blank' href={getEtherscanLink(chainId, pool, 'address')}> {shortenAddress(pool)} </a>
          </div>
        </div>
        <img src={POOL_ASSETES[pool].icon} sx={styles.infoIcon} />
      </div>
      <div sx={styles.depositInfoContainer}>
        <div sx={styles.depositInfoItem}>
          <p>Deposit</p>
          <div sx={styles.lpTokenLinkContainer}>
            <span sx={styles.depositInfoValue}>{REWARD_POOLS[pool].name}</span>
            <a sx={styles.lpTokenLink} target='_blank' href={REWARD_POOLS[pool].url}>
              <span> Get Token </span>
              <img src={images.iconLinkNormal} />
            </a>
          </div>
        </div>
        <div sx={styles.depositInfoItem}>
          <p>APR</p>
          <span sx={styles.depositInfoValue}>
            {apr}%
          </span>
        </div>
      </div>
      <div sx={styles.operateArea}>
        {/* reward */}
        <div sx={styles.operateCard}>
          <p>Reward</p>
          <span>You deposited</span>
          <div sx={styles.rewardAmountContainer}>
            {/* if amount === 0 sx={styles.amountIsZero} */}
            <span>{account ? rewardData.depositBalances[pool]?.toFixed(4) : '-'}</span>
            <span>{REWARD_POOLS[pool].tokenSymbol}</span>
          </div>
          <div sx={styles.rewardInfoContainer}>
            <div sx={styles.rewardInfoLabelWrapper}>
              <img src={images.iconClaimableReward} sx={styles.rewardIcon} />
              <div>
                <p>Claimable reward</p>
                {/* if amount !== 0 sx={styles.rewardAmount} */}
                <p sx={styles.amountIsZero}>{account ? rewardData.earnedBalances[pool]?.toFixed(4) : '-'} HAKKA</p>
              </div>
            </div>
            <div sx={styles.rewardBtn}>
              <ClaimButton
                styleKit={"green"}
                isDisabledWhenNotPrepared={true}
                onClick={claimCallback}
                isConnected={!!account}
                connectWallet={toggleWalletModal}
                exceptionHandlingDisabled={claimState === ClaimState.PENDING}
              >
                Claim
              </ClaimButton>
            </div>
          </div>
          <div sx={styles.rewardInfoContainer}>
            <div sx={styles.rewardInfoLabelWrapper}>
              <img src={images.iconWaiting} sx={styles.rewardIcon} />
              <div>
                <p>Vesting balance</p>
                {/* if amount !== 0 remove the style */}
                <p sx={styles.amountIsZero}>{vestingValueAmount.toFixed(4)} HAKKA</p>
              </div>
            </div>
            <a sx={styles.viewBtn} href={'/vesting'}>
              <span>View</span>
              <img src={images.iconForward} />
            </a>
          </div>
          <div sx={styles.learnMoreLinkWrapper}>
            <img src={images.iconInform} />
            <span>
              Claim means your HAKKA rewards will be locked in vesting contract.
              <a sx={styles.learnMoreLink} target='_blank' href='https://medium.com/hakkafinance/vesting-contract-9ab2ff24bf76'>learn more</a>
            </span>
          </div>
        </div>
        {/* stake */}
        <div sx={styles.operateCard}>
          <p>Stake</p>
          <div sx={styles.switch}>
            <div
              onClick={() => setSwitchPick(SwitchOption.DEPOSIT)}
              sx={switchPick === SwitchOption.DEPOSIT && styles.switchFocus}
            >
              Deposit
            </div>
            <div
              onClick={() => setSwitchPick(SwitchOption.WITHDRAW)}
              sx={switchPick === SwitchOption.WITHDRAW && styles.switchFocus}
            >
              Withdraw
            </div>
          </div>
          <div sx={styles.stakeBalanceContainer}>
            <span>Amount</span>
            <span>Balance:{' '}{switchPick === SwitchOption.DEPOSIT ? (tokenBalance?.toExact()|| '0.00') : (stakedBalance?.toExact() || '0.00')}</span>
          </div>
          <div sx={styles.numericalInputWrapper}>
            {switchPick === SwitchOption.DEPOSIT
              ? (
                <NumericalInputCard
                  value={stakeInputAmount}
                  onUserInput={setStakeInputAmount}
                  tokenBalance={tokenBalance}
                  approve={approve}
                  approveState={approveState}
                />
              ) : (
                <NumericalInputCard
                  value={withdrawInputAmount}
                  onUserInput={setWithdrawInputAmount}
                  tokenBalance={stakedBalance}
                  approve={approve}
                  approveState={approveState}
                />
              )}
          </div>
          {switchPick === SwitchOption.DEPOSIT
            ? (
              <DepositButton
                styleKit={'green'}
                isDisabledWhenNotPrepared={false}
                onClick={depositCallback}
                isConnected={!!account}
                connectWallet={toggleWalletModal}
                isApproved={approveState === ApprovalState.APPROVED}
                approveToken={approve}
                exceptionHandlingDisabled={depositState === DepositState.PENDING}
              >
               Deposit
              </DepositButton>
            ) : !!account ? (
                <div sx={styles.withdrawBtnContainer}>
                  <div>
                    <MyButton
                      click={withdrawCallback}
                      styleKit="green"
                      disabled={withdrawState === WithdrawState.PENDING}
                    >
                      <p sx={styles.withdrawContent}>Withdraw</p>
                    </MyButton>
                  </div>
                  <div>
                    <MyButton
                      click={exitCallback}
                      disabled={exitState === ExitState.PENDING}
                    >
                      <div sx={styles.exitBtnContent}>
                        <p>Exit</p>
                        <p className="exitContent">Withdraw all and claim</p>
                      </div>
                    </MyButton>
                  </div>
                </div>
              ) : (
                <MyButton
                  click={toggleWalletModal}
                  styleKit={"green"}
                >
                  Connect Wallet
                </MyButton>
              )}
        </div>
      </div>
    </div>
  );
};

export default PoolDetail;
