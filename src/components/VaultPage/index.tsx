/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useState, useCallback, useMemo } from 'react'
import images from '../../images/index'
import styles from './styles'
import MyButton from '../Common/MyButton/index'
import RewardListItem from './RewardListItem/index'
import NumericalInputCard from '../NumericalInputCard/index'
import NewTokenAddressInput from './NewTokenAddressInput'
import Web3Status from '../Web3Status'
import RewardValue from './RewardValue'
import { useActiveWeb3React } from '../../hooks/index'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import { useBurnCallback, BurnState } from '../../hooks/useBurnCallback'
import { useTokenAllowance } from '../../data/Allowances';
import { shortenAddress, getEtherscanLink } from '../../utils'
import { useTokenBalance, useTokenBalances, useETHBalances } from '../../state/wallet/hooks'
import { useTotalSupply } from '../../data/TotalSupply'
import { Token } from '@uniswap/sdk';
import { AddressZero, WeiPerEther } from '@ethersproject/constants';
import { parseUnits } from '@ethersproject/units'

import {
  ChainId,
  HAKKA,
  BURNER_ADDRESS,
  VAULT_TOKENS,
  GUILDBANK,
  ETHADDRESS
} from '../../constants';

import BigNumber from 'bignumber.js';

const VaultPage = (props) => {
  const { account, library, chainId } = useActiveWeb3React()

  const hakkaBalance = useTokenBalance(
    account as string,
    HAKKA[chainId as ChainId]
  );

  // 1e18
  const bignumber1e18 = new BigNumber(WeiPerEther.toString());

  // burn amount
  const [inputAmount, setInputAmount] = useState('0');
  const [rewardTokens, setRewardTokens] = useState(VAULT_TOKENS[chainId || 1]);
  const [isShowNewTokenArea, setIsShowNewTokenArea] = useState(false);
  const [newRewardAddressInput, setNewRewardAddressInput] = useState<string>('');
  
  const [approveState, approveCallback] = useApproveCallback(
    HAKKA[chainId as ChainId],
    BURNER_ADDRESS[chainId as ChainId],
    inputAmount
  );

  // when chainId change, update rewardTokens value
  useEffect(() => {
    setRewardTokens(VAULT_TOKENS[chainId || 1])
  }, [chainId])

  // sort the reward tokens address
  const [pickedRewardTokensAddress, setPickedRewardTokensAddress] = useState([
    ...Object.keys(rewardTokens).sort((a, b) => parseInt(a) - parseInt(b)),
  ]);

  // when new token added sort again.
  useEffect(() => {
    let newSortedTokens = Object.keys(rewardTokens).sort(
      (a, b) => parseInt(a) - parseInt(b)
    );
    setPickedRewardTokensAddress(newSortedTokens);
  }, [rewardTokens]);

  // haddle checklist click 
  const toggleToken = (tokenAddress: string) => {
    const selectedTokenList = pickedRewardTokensAddress.includes(tokenAddress) 
      ? pickedRewardTokensAddress.filter((sortedAddress) => sortedAddress !== tokenAddress) 
      : [...pickedRewardTokensAddress, tokenAddress];
    const sortedAddress = selectedTokenList.sort(
      (a, b) => parseInt(a) - parseInt(b)
    );
    setPickedRewardTokensAddress(sortedAddress);
  };

  const ethBalance = useETHBalances([GUILDBANK[chainId as ChainId]])

  // get reward tokens balance in guild bank
  const [tokens, setTokens] = useState<Token[]>()
  useEffect(() => {
    let tokens: Token[] = [];
    Object.keys(rewardTokens).map((address) => {
      tokens.push(
        new Token(
          chainId,
          address,
          rewardTokens[address]['decimals'],
          rewardTokens[address]['symbol'],
          rewardTokens[address]['name'],
        )
      );
    });
    setTokens(tokens)
  }, [rewardTokens, chainId, account])

  const tokensBalanceInBank = useTokenBalances(
    GUILDBANK[chainId as ChainId],
    tokens
  );

  // get HAKKA totalSupply
  const totalSupplyTokenAmount = useTotalSupply(HAKKA[chainId as ChainId]);
  const hakkaTotalSupply = new BigNumber(totalSupplyTokenAmount?.raw.toString())

  // calculate the rewardAmount
  let localRewardAmount: { [key: string]: BigNumber } = {};
  if (inputAmount && rewardTokens && hakkaTotalSupply) {
    const amountBigNumber = new BigNumber(inputAmount);
    Object.keys(rewardTokens).map((tokenAddress) => {
      // Input should not be greater than HAKKA totalSupply
      if (hakkaTotalSupply.div(bignumber1e18).isGreaterThanOrEqualTo(amountBigNumber)) {
        let balanceBigNumber = tokenAddress === ETHADDRESS ?
          new BigNumber(ethBalance[GUILDBANK[chainId as ChainId]]?.raw.toString())  
          : new BigNumber(tokensBalanceInBank[tokenAddress]?.raw.toString());
        let decimalBigNumber = new BigNumber(10).pow(
          new BigNumber(rewardTokens[tokenAddress]['decimals'])
        );

        let num: BigNumber;
        num = amountBigNumber
          .multipliedBy(bignumber1e18)
          .div(hakkaTotalSupply)
          .multipliedBy(balanceBigNumber)
          .div(decimalBigNumber);
        localRewardAmount[tokenAddress] = num.isNaN() ? new BigNumber(0) : num;

      } else {
        localRewardAmount[tokenAddress] = new BigNumber(0);
      }
    })
  };

  const amountParsed = useMemo(() => {
    if (inputAmount) {
      return parseUnits(inputAmount.toString(), 18);
    } else {
      return null;
    }
  }, [inputAmount]);
  
  const [burnState, burnCallback] = useBurnCallback(
    BURNER_ADDRESS[chainId as ChainId],
    account,
    amountParsed,
    pickedRewardTokensAddress,
  );

  // error message
  const noAccountError = useMemo(
    () => (account ? '' : 'Wallet is not connected.'),
    [account]
  );

  const noAmountError = useMemo(() => !inputAmount, [inputAmount]);
  const noTokenError = useMemo(() => !pickedRewardTokensAddress.length, [pickedRewardTokensAddress]);

  // check amount, balance, allowance 
  const [amountError, setAmountError] = useState<string>('');
  const [approveError, setApproveError] = useState<string>('');

  const tokenAllowance = useTokenAllowance(
    HAKKA[chainId as ChainId],
    account ?? undefined,
    BURNER_ADDRESS[chainId as ChainId]
  );

  let allowance: number = 0;
  if (tokenAllowance) {
    allowance = new BigNumber(parseFloat(tokenAllowance.raw.toString())).div(bignumber1e18).toNumber();
  }

  useEffect(() => {
    if (inputAmount && approveState) {
      if (approveState !== ApprovalState.APPROVED || allowance === 0) {
        setApproveError('Please approve to continue');
      } else {
        setApproveError('');
      }

      if (parseFloat(hakkaBalance.raw.toString()) < parseFloat(inputAmount)) {
        console.log(
          `the amount ${inputAmount} is more than your balance ${hakkaBalance.raw.toString()}`
        );
        setAmountError('Insufficient balance');
      } else if (parseFloat(inputAmount) > allowance) {
        setAmountError('Please approve to continue');
      } else {
        setAmountError('');
      }
    }
  }, [hakkaBalance, inputAmount, allowance, approveState, chainId]);

  
  // check the input amount is not bigger than total supply
  const [totalSupplyError, setTotalSupplyError] = useState<string>('');
  useEffect(() => {
    if (parseFloat(inputAmount) > hakkaTotalSupply.div(bignumber1e18).toNumber()) {
      setTotalSupplyError(
        'The amount is more than HAKKA total supply'
      );
    } else {
      setTotalSupplyError('');
    }
  }, [inputAmount]);

  const errorMessage =
    noAccountError ||
    approveError ||
    totalSupplyError ||
    amountError ||
    noAmountError ||
    noTokenError;

  return (
    <div sx={styles.container}>
      <div sx={styles.vaultPageWrapper}>
        <div sx={styles.header}>
          <h1 sx={styles.title}>Guild Bank</h1>
          <Web3Status unsupported={BURNER_ADDRESS[chainId as ChainId] === AddressZero}/>
        </div>
        <div sx={styles.body}>
          <div sx={styles.infomationContainer}>
            <h3 sx={styles.subTitle}>Burn to get value</h3>
            <div sx={styles.contract}>
              <span>Guild Bank Contract</span>
              <span
                sx={styles.contractAddress}
                onClick={() => {
                  window
                    .open(
                      getEtherscanLink(chainId, GUILDBANK[chainId], "address")
                    )
                    .focus();
                }}
              >
                {chainId ? shortenAddress(BURNER_ADDRESS[chainId]) : ''}
              </span>
            </div>
            <p>An interface for Hakka holders to call ragequit() function to burn their HAKKA and draw funds from Guild Bank proportionally.</p>
            <div sx={styles.hakkaBalance}>
              <span>Burn</span>
              <span>HAKKA Balance: {hakkaBalance?.toSignificant(10)}</span>
            </div>
            <NumericalInputCard
              value={inputAmount}
              onUserInput={setInputAmount}
              tokenBalance={hakkaBalance}
              approveCallback={approveCallback}
              approveState={approveState}
              amountError={amountError}
              totalSupplyError={totalSupplyError}
            />
          </div>
          <div sx={styles.formContainer}>
            <div sx={styles.formTitleArea}>
              <span sx={styles.formTitle}>You wish to receive</span>
              <div
                sx={styles.addTokenButton}
                onClick={() => setIsShowNewTokenArea(!isShowNewTokenArea)}
              >
                {isShowNewTokenArea
                  ? <img src={images.iconDeleteRound} alt='Close the address input window' />
                  : <div sx={styles.addTokenButton}>
                    <span sx={{ paddingBottom: '2px' }}>Add token</span>
                    <img style={styles.addIcon} src={images.iconAdd} alt='add new token' />
                  </div>
                }
              </div>
            </div>
            {/* add new token input area */}
            {isShowNewTokenArea ?
              <NewTokenAddressInput
                rewardTokens={rewardTokens}
                addressInputValue={newRewardAddressInput}
                setAddressInputValue={setNewRewardAddressInput}
                setIsShowNewTokenArea={setIsShowNewTokenArea}
                setRewardTokens={setRewardTokens}
              />
              : ''
            }
            <div sx={styles.rewardListContainer}>
              {Object.keys(rewardTokens).map((tokenAddress) => {
                return (
                  <RewardListItem
                    key={tokenAddress}
                    tokenAddress={tokenAddress}
                    tokenName={rewardTokens[tokenAddress].symbol}
                    receiveAmount={localRewardAmount[tokenAddress] || new BigNumber(0)}
                    bankBalance={tokenAddress === ETHADDRESS
                      ? ethBalance[GUILDBANK[chainId as ChainId]]?.toFixed(4)
                      : tokensBalanceInBank[tokenAddress]?.toFixed(4) || '0'
                    }
                    isDefaultToken={Object.keys(VAULT_TOKENS[chainId || 1]).includes(tokenAddress)} // chainId
                    checked={pickedRewardTokensAddress.includes(tokenAddress)}
                    onChange={() => { toggleToken(tokenAddress) }}
                    rewardTokens={rewardTokens}
                    setRewardTokens={setRewardTokens}
                  />)
              })}
            </div>
            <hr sx={styles.hr2} />
            {/* total value */}
            <RewardValue 
              localRewardAmount={localRewardAmount}
              pickedRewardTokensAddress={pickedRewardTokensAddress}
              inputAmount={inputAmount}
              newRewardAddressInput={newRewardAddressInput}
            />
            <div>
              <MyButton
                type={"green"}
                click={
                  approveState !== ApprovalState.APPROVED
                    ? approveCallback
                    : burnCallback
                }
                disabled={
                  approveState === ApprovalState.APPROVED && errorMessage || burnState === BurnState.PENDING
                }
              >
                {approveState !== ApprovalState.APPROVED
                  ? "Unlock Token"
                  : errorMessage && errorMessage.constructor !== Boolean
                  ? errorMessage
                  : "Burn"}
              </MyButton>
            </div>
          </div>
        </div>
        <div sx={styles.knowMoreWrapper}>
          <hr sx={styles.hr} />
          <div sx={styles.knowMoreRow}>
            <span sx={styles.knowMoreTitle}>More Information</span>
            <div sx={styles.wikiLinkArea} onClick={() => { window.open('https://hakka-finance.gitbook.io/hakka-wiki', '_blank').focus() }}>
              <span sx={styles.visitWikiLink}>Visit Wiki</span>
              <img src={images.iconForwardGreen} alt='link' />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default VaultPage