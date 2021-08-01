/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useWeb3React } from '@web3-react/core';
import {
  JSBI,
  TokenAmount,
} from '@uniswap/sdk';
import images from '../../images'
import React, { useMemo, useCallback, useEffect } from 'react';
import styles from './styles'
import MyButton from '../../components/Common/MyButton/index'
import ClaimModal from '../ClaimModal';
import { useClaimModalToggle } from '../../state/application/hooks';
import { useSingleCallResult } from '../../state/multicall/hooks';
import useTokenPrice from '../../hooks/useTokenPrice';
import { useVestingCallback, VestingState } from '../../hooks/useVestingCallback';
import {
  HAKKA,
  VESTING_ADDRESSES
} from '../../constants';
import { useVestingContract } from '../../hooks/useContract';
import { useSnackbar } from '../../hooks/useSnackbar';
import { getEtherscanLink, shortenTxId } from '../../utils'


const VestingPage = () => {
  const { chainId, account } = useWeb3React();
  const { enqueueSnackbar } = useSnackbar()
  const toggleClaimModal = useClaimModalToggle();
  const hakkaPrice = useTokenPrice('hakka-finance')
  const [claimInfo, claimCallback] = useVestingCallback(VESTING_ADDRESSES[chainId], account)

  const vestingContract = useVestingContract(VESTING_ADDRESSES[chainId]);
  const vestingValue = useSingleCallResult(
    vestingContract,
    'balanceOf',
    [account],
  );
  const vestingProportion = useSingleCallResult(
    vestingContract,
    'proportion',
  );
  const vestingValueAmount = useMemo(
    () =>
    vestingValue.result && chainId
        ? new TokenAmount(HAKKA[chainId], vestingValue.result.toString())
        : new TokenAmount(HAKKA[chainId], '0'),
    [vestingValue, chainId]
  );
  const vestingValuePrice = useMemo(
    () => vestingValueAmount.multiply(JSBI.BigInt(hakkaPrice*1e8)).divide(JSBI.BigInt(1e8)),
    [vestingValueAmount]
  );
  const vestingProportionAmount = useMemo(
    () =>
    vestingProportion.result && chainId
        ? new TokenAmount(HAKKA[chainId], vestingProportion.result.toString())
        : new TokenAmount(HAKKA[chainId], '0'),
    [vestingProportion, chainId]
  );

  const addToMetamask = useCallback(() => {
    const _ethereum = window.ethereum
    _ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: HAKKA[chainId].address,
          symbol: 'HAKKA',
          decimals: 18,
          image:
            'https://assets.coingecko.com/coins/images/12163/small/Hakka-icon.png?1597746776',
        },
      },
    })
  }, [chainId])

  useEffect(() => {
    if (claimInfo.state === VestingState.PENDING) {
      console.log(claimInfo.txid)
      enqueueSnackbar(
        <a
          target='_blank'
          href={getEtherscanLink(chainId ?? 1, claimInfo.txid, 'transaction')}
        >{shortenTxId(claimInfo.txid)}</a>,
        claimInfo.txid
      )
    }
  }, [claimInfo])

  return (
    <>
      <div sx={styles.container}>
        <div sx={styles.vaultPageWrapper}>
          <div sx={styles.backBtn}>
            <img src={images.iconBack} sx={styles.iconBack} />
            <span>Back</span>
          </div>
          <h3 onClick={toggleClaimModal} sx={styles.heading}>Vesting</h3>
          <div sx={styles.vestingCardWrapper}>
            <div sx={styles.vestingCard}>
              <div sx={styles.balanceCard}>
                <div sx={styles.iconWaitingBackgroundColor}>
                  <img src={images.iconWaiting}/>
                </div>
                <p sx={styles.vestingCardItemHeading}>Vesting Balance</p>
                <div sx={styles.balanceValueCard}>
                  <span sx={styles.balanceAmount}>{vestingValueAmount.toFixed(4)} HAKKA</span>
                  <span sx={styles.vestingBalanceValue}>(={vestingValuePrice.toFixed(4)} USD)</span>
                </div>
              </div>
              <div>
                <div sx={styles.iconWithdrawAvailableBackgroundColor}>
                  <img src={images.iconWithdrawAvailable} />
                </div>
                <p sx={styles.vestingCardItemHeading}>Claimable Amount</p>
                <div sx={styles.displayFlex}>
                  <span sx={styles.claimableAmount}>{vestingValueAmount.multiply(vestingProportionAmount).toFixed(4)} HAKKA</span>
                  <button
                    onClick={addToMetamask}
                    sx={styles.addMetamaskBtn}
                  >
                    <img src={images.iconAdd} sx={styles.iconAdd} />
                    <img src={images.iconMetamask} />
                  </button>
                </div>
              </div>
            </div>
            <div sx={styles.activeArea}>
              <div sx={styles.linkWrapper}>
                <span>Check vesting terms and learn more</span>
                <img src={images.iconLinkNormal} sx={styles.iconLink} />
              </div>
              <div sx={styles.claimBtn}>
                <MyButton
                  click={claimCallback}
                  type={'green'}
                  disabled={claimInfo.state === VestingState.PENDING}
                >
                  Claim
                </MyButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ClaimModal />
    </>
  )
};

export default VestingPage