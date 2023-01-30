/** @jsx jsx */
import { jsx } from 'theme-ui';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import {
  JSBI,
  TokenAmount,
} from '@uniswap/sdk';
import { useMemo, useState, useEffect } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import { AddressZero } from '@ethersproject/constants';
import _omit from 'lodash/omit';
import Web3Status from '../Web3Status';
import images from '../../images';
import styles from './styles';
import MyButton from '../../components/Common/MyButton/index';
import useTokenPrice from '../../hooks/useTokenPrice';
import { useVestingWithdraw, VestingState } from '../../hooks/vesting/useVestingWithdraw';
import {
  ChainId,
  ChainNameWithIcon,
  HAKKA,
  VESTING_ADDRESSES,
} from '../../constants';
import { useWalletModalToggle } from '../../state/application/hooks';
import withConnectWalletCheckWrapper from '../../hoc/withConnectWalletCheckWrapper';
import withWrongNetworkCheckWrapper from '../../hoc/withWrongNetworkCheckWrapper';
import AddToMetamaskBtn from '../AddToMetamaskBtn';
import { TabGroup } from '../Common/TabGroup';
import useVestingInfo from '../../hooks/vesting/useVestingInfo';

const hakkaSupportChain = Object.keys(_omit(ChainNameWithIcon, process.env.GATSBY_ENV === 'development' ? [] : [ChainId.KOVAN, ChainId.RINKEBY])).map((key) => {
  return {
    value: +key as ChainId,
    title: ChainNameWithIcon[+key as ChainId].name,
    icon: ChainNameWithIcon[+key as ChainId].iconName,
  };
});

const vestingSupportChain = hakkaSupportChain.filter((chain) => 
  VESTING_ADDRESSES[chain.value] !== AddressZero);

const vestingSupportChainIdSet = new Set(
  vestingSupportChain.map((ele) => ele.value)
);

const VestingPage = () => {
  const { chainId, account, error } = useWeb3React();
  const hakkaPrice = useTokenPrice('hakka-finance');
  const [claimState, claim] = useVestingWithdraw(VESTING_ADDRESSES[chainId], account);

  const isConnected = !!account || error instanceof UnsupportedChainIdError;
  const isChainSupported = vestingSupportChainIdSet.has(chainId);
  const [activeChainTab, setActiveChainTab] = useState(
    isChainSupported ? chainId! : ChainId.MAINNET
  );

  useEffect(() => {
    if (isChainSupported) {
      setActiveChainTab(chainId);
    }
  }, [chainId]);

  const isTabInCorrectNetwork = chainId === activeChainTab;

  const { vestingInfo } = useVestingInfo();

  const isWaitingCycle = useMemo(
    () => vestingInfo[activeChainTab]?.lastWithdrawalTime && Date.now() - parseInt(vestingInfo[activeChainTab].lastWithdrawalTime?.toString()) * 1000 < 1641600000,
    [vestingInfo[activeChainTab]?.lastWithdrawalTime , activeChainTab],
  );
  const vestingValueAmount = useMemo(
    () => (vestingInfo[activeChainTab]?.vestingValue && activeChainTab
      ? new TokenAmount(HAKKA[activeChainTab || 1], vestingInfo[activeChainTab].vestingValue.toString())
      : new TokenAmount(HAKKA[activeChainTab || 1], '0')),
    [vestingInfo[activeChainTab]?.vestingValue, activeChainTab],
  );

  const vestingValuePrice = useMemo(
    () => vestingValueAmount.multiply(JSBI.BigInt((hakkaPrice * 1e8).toFixed(0))).divide(JSBI.BigInt(1e8)),
    [vestingValueAmount],
  );
  const vestingProportionAmount = useMemo(
    () => (vestingInfo[activeChainTab]?.vestingProportion && activeChainTab
      ? new TokenAmount(HAKKA[activeChainTab || 1], vestingInfo[activeChainTab].vestingProportion.toString())
      : new TokenAmount(HAKKA[activeChainTab || 1], '0')),
    [vestingInfo[activeChainTab]?.vestingProportion, activeChainTab],
  );

  const countdownRenderer = ({
    days, hours, minutes, seconds,
  }) => (
    <div>
      {zeroPad(days)}D {zeroPad(hours)}H {zeroPad(minutes)}M {zeroPad(seconds)}S
    </div>
  );

  const toggleWalletModal = useWalletModalToggle();
  const ClaimButton = withWrongNetworkCheckWrapper(
    withConnectWalletCheckWrapper(MyButton)
  );

  return (
    <div sx={styles.container}>
      <div sx={styles.vestingPageWrapper}>
        <div sx={styles.header}>
          <h1 sx={styles.title}>Vesting</h1>
          <Web3Status unsupported={VESTING_ADDRESSES[chainId as ChainId] === AddressZero} />
        </div>
        <h3 sx={styles.heading}></h3>
        <div sx={styles.tabWrapper}>
          <TabGroup
            list={vestingSupportChain}
            active={activeChainTab}
            onChange={setActiveChainTab}
          />
        </div>
        <div sx={styles.vestingCardWrapper}>
          <div sx={styles.vestingCard}>
            <div sx={styles.balanceCard}>
              <div sx={styles.iconWaitingBackgroundColor}>
                <img src={images.iconWaiting} />
              </div>
              <p sx={styles.vestingCardItemHeading}>Vesting Balance</p>
              <div sx={styles.balanceValueCard}>
                <span sx={styles.balanceAmount}>
                  {vestingValueAmount.toFixed(4)}
                  {' '}
                  HAKKA
                </span>
                <span sx={styles.vestingBalanceValue}>
                  (=
                  {vestingValuePrice.toFixed(4)}
                  {' '}
                  USD)
                </span>
              </div>
            </div>
            <div sx={styles.claimableCard}>
              <div sx={styles.iconWithdrawAvailableBackgroundColor}>
                <img src={images.iconWithdrawAvailable} />
              </div>
              <p sx={styles.vestingCardItemHeading}>Claimable Amount</p>
              <div sx={styles.displayFlex}>
                <span sx={styles.claimableAmount}>
                  {vestingValueAmount.multiply(vestingProportionAmount).toFixed(4)}
                  {' '}
                  HAKKA
                </span>
                <AddToMetamaskBtn />
              </div>
            </div>
          </div>
          <div sx={styles.activeArea}>
            <a sx={styles.linkWrapper} target="_blank" href="https://medium.com/hakkafinance/vesting-contract-9ab2ff24bf76" rel="noreferrer">
              <span>Check vesting terms and learn more</span>
              <img src={images.iconLinkNormal} sx={styles.iconLink} />
            </a>
            <div sx={styles.claimBtn}>
              <ClaimButton
                styleKit={"green"}
                isDisabledWhenNotPrepared={false}
                isConnected={isConnected}
                connectWallet={toggleWalletModal}
                isCorrectNetwork={isTabInCorrectNetwork}
                targetNetwork={activeChainTab}
                onClick={claim}
                disabled={claimState === VestingState.PENDING || isWaitingCycle}
              >
                {isWaitingCycle ? (
                  <Countdown
                    date={parseInt(vestingInfo?.[activeChainTab].lastWithdrawalTime.toString()) * 1000 + 1641600000}
                    renderer={countdownRenderer}
                  />
                ) : 'Claim'}
              </ClaimButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VestingPage;
