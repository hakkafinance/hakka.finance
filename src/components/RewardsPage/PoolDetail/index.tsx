/** @jsx jsx */
import { jsx } from 'theme-ui'
import styles from './styles'
import images from '../../../images/index'
import MyButton from '../../Common/MyButton'
import NumericalInputCard from '../NumericalInputCard/index'
import { useWeb3React } from '@web3-react/core';
import { useState } from 'react'
import { ChainId, HAKKA, STAKING_ADDRESSES } from "../../../constants/index";
import { useTokenBalance } from "../../../state/wallet/hooks";
import { useApproveCallback } from "../../../hooks/useApproveCallback";

const PoolDetail = () => {
  const { account, chainId } = useWeb3React();

  const [stakeInputAmount, setStakeInputAmount] = useState<string>('');

  // wrong balance
  const hakkaBalance = useTokenBalance(
    account as string,
    HAKKA[chainId as ChainId]
  );

  // wrong address
  const [approveState, approveCallback] = useApproveCallback(
    HAKKA[chainId as ChainId],
    STAKING_ADDRESSES[chainId as ChainId],
    stakeInputAmount
  );

  enum SwitchOption {
    DEPOSIT,
    WITHDRAW
  }

  const [switchPick, setSwitchPick] = useState<SwitchOption>(SwitchOption.DEPOSIT);

  return (
    <div>
      <div sx={styles.btnBack}>
        <img src={images.iconBack} />
        <span>Back</span>
      </div>
      <div sx={styles.title}>
        <p>BHS-USDC-DAI-HAKKA</p>
        <div sx={styles.infoWrapper}>
          <div sx={styles.infoItem}>
            <span>TVL</span>
            <span sx={styles.infoValue}> $ 635,481,486 </span>
          </div>
          <div sx={styles.infoItem}>
            <span>Contract</span>
            <span sx={styles.contractAddress}> 0x0E29e5Ab…47dE3bcd </span>
          </div>
        </div>
        <img src={images.icon4Tokens} sx={styles.infoIcon} />
      </div>
      <div sx={styles.depositInfoContainer}>
        <div sx={styles.depositInfoItem}>
          <p>Deposit</p>
          <div sx={styles.lpTokenLinkContainer}>
            <span sx={styles.depositInfoValue}>Balancer LP token</span>
            <div sx={styles.lpTokenLink}>
              <span> Get LP Token </span>
              <img src={images.iconLinkNormal} />
            </div>
          </div>
        </div>
        <div sx={styles.depositInfoItem}>
          <p>APY</p>
          <span sx={styles.depositInfoValue}>{'-'} %</span>
          <span> (Pool 78.41% + Bonus 47.27%) </span>
        </div>
      </div>
      <div sx={styles.operateArea}>
        {/* reward */}
        <div sx={styles.operateCard}>
          <p>Reward</p>
          <span>You deposited</span>
          <div sx={styles.rewardAmountContainer}>
            {/* if amount === 0 sx={styles.amountIsZero} */}
            <span>0</span>
            <span>BHS-USDC-DAI-HAKKA LP</span>
          </div>
          <div sx={styles.rewardInfoContainer}>
            <div sx={styles.rewardInfoLabelWrapper}>
              <img src={images.iconClaimableReward} sx={styles.rewardIcon} />
              <div>
                <p>Claimable reward</p>
                {/* if amount !== 0 sx={styles.rewardAmount} */}
                <p sx={styles.amountIsZero}>0 HAKKA</p>
              </div>
            </div>
            <div sx={styles.rewardBtn}>
              <MyButton type={'green'}>
                Claim
              </MyButton>
            </div>
          </div>
          <div sx={styles.rewardInfoContainer}>
            <div sx={styles.rewardInfoLabelWrapper}>
              <img src={images.iconWaiting} sx={styles.rewardIcon} />
              <div>
                <p>Vesting balance</p>
                {/* if amount !== 0 remove the style */}
                <p sx={styles.amountIsZero}>0 HAKKA</p>
              </div>
            </div>
            <button sx={styles.viewBtn}>
              <span>View</span>
              <img src={images.iconForward} />
            </button>
          </div>
          <div sx={styles.learnMoreLinkWrapper}>
            <img src={images.iconInform} />
            <span>Claim means your HAKKA rewards will be locked in vesting contract.
              <span sx={styles.learnMoreLink}>learn more</span>
            </span>
          </div>
        </div>
        {/* stake */}
        <div sx={styles.operateCard}>
          <p>Stake</p>
          <div sx={styles.switch}>
            <div 
              onClick={() => setSwitchPick(SwitchOption.DEPOSIT)} 
              sx={switchPick === SwitchOption.DEPOSIT && styles.switchFocus}>
              Deposit
            </div>
            <div 
              onClick={() => setSwitchPick(SwitchOption.WITHDRAW)} 
              sx={switchPick === SwitchOption.WITHDRAW && styles.switchFocus}>
              Withdraw
            </div>
          </div>
          <div sx={styles.stakeBalanceContainer}>
            <span>Amount</span>
            <span>Balance: 566.6324</span>
          </div>
          <div sx={styles.numericalInputWrapper}>
            <NumericalInputCard
              value={stakeInputAmount}
              onUserInput={setStakeInputAmount}
              hakkaBalance={hakkaBalance}
              approveCallback={approveCallback}
              approveState={approveState}
            />
          </div>
          {switchPick === SwitchOption.DEPOSIT
            ? (
              <MyButton type={'green'}>
                <p sx={styles.depositBtnContent}>Deposit</p>
              </MyButton>
            ) : (
              <div sx={styles.withdrawBtnContainer}>
                <div>
                  <MyButton type={'green'}>
                    <p sx={styles.withdrawContent}>Withdraw</p>
                  </MyButton>
                </div>
                <div>
                  <MyButton>
                    <div sx={styles.exitBtnContent}>
                      <p>Exit</p>
                      <p className='exitContent'>Withdraw all and claim</p>
                    </div>
                  </MyButton>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default PoolDetail