/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useState, useCallback, useMemo } from 'react'
import images from '../../images/index'
import styles from './styles'
import MyButton from '../Common/MyButton/index'
import RewardListItem from './RewardListItem/index'
// import Wallet from '../Wallet/index'
import NumericalInputCard from './NumericalInputCard/index'
import NewTokenAddressInput from './NewTokenAddressInput'
import Web3Status from '../Web3Status'
import RewardValue from './RewardValue'
import { useActiveWeb3React } from '../../hooks/index'
import { ethers } from 'ethers';
import { useSnackbar } from '../../hooks/useSnackbar'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import { useTokenAllowance } from '../../data/Allowances';
import { getEtherscanLink, shortenTxId, shortenAddress, getContract } from '../../utils'
import { useTokenBalance, useTokenBalances, useETHBalances } from '../../state/wallet/hooks'
import { useTotalSupply } from '../../data/TotalSupply'
import { Token, TokenAmount } from '@uniswap/sdk';
import BURNER_ABI from '../../constants/abis/burner.json';
import {
  isAddress,
  isERC20Contract,
  getTokenDecimals,
  getTokenName,
  getTokenSymbol
} from '../../utils/index'

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
  const { enqueueSnackbar } = useSnackbar()
  const [approveInfo, approveCallback] = useApproveCallback(
    HAKKA[chainId as ChainId],
    BURNER_ADDRESS[chainId as ChainId]
  )

  const hakkaBalance = useTokenBalance(
    account as string,
    HAKKA[chainId as ChainId]
  );

  // 1e18
  const bignumber1e18 = new BigNumber(ethers.constants.WeiPerEther.toString());

  useEffect(() => {
    if (approveInfo.state === ApprovalState.APPROVED) {
      // console.log('APPROVED')
    } else if (approveInfo.state === ApprovalState.NOT_APPROVED) {
      // console.log('NOT_APPROVED')
    } else if (approveInfo.state === ApprovalState.PENDING) {
      // console.log('PENDING')
      console.log(approveInfo.txid)
      enqueueSnackbar(
        <a
          target='_blank'
          href={getEtherscanLink(chainId ?? 1, approveInfo.txid, 'transaction')}
        >{shortenTxId(approveInfo.txid)}</a>,
        approveInfo.txid
      )
    } else {
      // console.log('UNKNOWN')
    }
  }, [approveInfo])


  const [inputAmount, setInputAmount] = useState('');
  const [rewardTokens, setRewardTokens] = useState(VAULT_TOKENS[chainId || 1]);
  const [isAddTokenClick, setIsAddTokenClick] = useState(false);
  const [newAddressInput, setNewAddressInput] = useState('');

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



  // amount, balance, allowance 檢查 且顯示錯誤訊息
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
    if (inputAmount && approveInfo.state) {
      if (approveInfo.state !== ApprovalState.APPROVED || allowance === 0) {
        setApproveError('Please unlock the token to continue');
      } else {
        setApproveError('');
      }

      if (hakkaBalance.raw.toString() < inputAmount) {
        console.log(
          `the amount ${inputAmount} is more than your balance ${hakkaBalance.raw.toString()}`
        );
        setAmountError('Insufficient balance');
      } else if (parseFloat(inputAmount) > allowance) {
        setAmountError('Please unlock the token to continue');
      } else {
        setAmountError('');
      }
    }
  }, [hakkaBalance, inputAmount, allowance, approveInfo.state, chainId]);


  // 保留: 不用 callback 是否有差 (印象很模糊，記得好像是我加的)
  // const toggleTokens = useCallback(
  //   (tokenAddress) => {
  //     const selectedTokenList = sortedRewardTokensAddress.includes(tokenAddress) //return true or false
  //       ? sortedRewardTokensAddress.filter((sortedAddress) => sortedAddress !== tokenAddress) //return 符合規則的新陣列
  //       : [...sortedRewardTokensAddress, tokenAddress]; //(... 展開運算符) 將點選的地址加入到陣列之中
  //     const sorted = selectedTokenList.sort(
  //       (a, b) => parseInt(a) - parseInt(b)
  //     );
  //     setSortedRewardTokensAddress(sorted);
  //   },
  //   [sortedRewardTokensAddress]
  // );

  const abc123 = 1;

  // haddle checklist click 
  const toggleToken = (tokenAddress: string) => {
    const selectedTokenList = pickedRewardTokensAddress.includes(tokenAddress) //return true or false
      ? pickedRewardTokensAddress.filter((sortedAddress) => sortedAddress !== tokenAddress) //return 符合規則的新陣列
      : [...pickedRewardTokensAddress, tokenAddress]; //(... 展開運算符) 將點選的地址加入到陣列之中
    const sortedAddress = selectedTokenList.sort(
      (a, b) => parseInt(a) - parseInt(b)
    );
    setPickedRewardTokensAddress(sortedAddress);
  };


  // calculate reward amount in local

  const ethBalance = useETHBalances([GUILDBANK[chainId as ChainId]])
  // const guildbankEthBalance = ethBalance[GUILDBANK[chainId as ChainId]]?.raw.toString()

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
  // console.log('hakkaTotalSupply', hakkaTotalSupply.div(bignumber1e18).toString())

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

  // local端計算rewardAmount
  let localRewardAmount: { [key: string]: BigNumber } = {};
  if (inputAmount && rewardTokens && hakkaTotalSupply) {
    const amountBigNumber = new BigNumber(inputAmount);
    Object.keys(rewardTokens).map((tokenAddress) => {
      // 避免輸入大於HAKKA totalSupply
      if (hakkaTotalSupply.div(bignumber1e18).isGreaterThanOrEqualTo(amountBigNumber)) {
        // if(tokenAddress === ETHADDRESS){};
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
        localRewardAmount[tokenAddress] = num;

      } else {
        localRewardAmount[tokenAddress] = new BigNumber(0);
      }
    })
  };

  // Parse the valueString representation of units into a BigNumber instance of the amount of wei.
  // input amount -> decimal, 16進制
  // 檢查amount是否超過decimal, 避免underflow shutdown.
  const [amountParsedError, setAmountParsedError] = useState<string>('');
  const amountParsed = useMemo(() => {
    if (inputAmount) {
      try {
        setAmountParsedError('');
        return ethers.utils.parseUnits(inputAmount.toString(), 18);
      } catch (error) {
        // should fail if the user specifies too many decimal places of precision
        console.log(`Failed to parse input amount: "${inputAmount}"`, error);
        setAmountParsedError(`Failed to parse input amount: "${inputAmount}"`);
        setInputAmount((prevState: string) => {
          const amountString = prevState.substring(0, prevState.length - 1);
          return amountString;
        });
        return null;
      }
    } else {
      setAmountParsedError('');
      return null;
    }

  }, [inputAmount]);

  // callback burn
  const [isPending, setIsPending] = useState<boolean>(false);
  const [burnError, setBurnError] = useState();
  const burn = useCallback(async () => {
    if (
      amountParsed &&
      pickedRewardTokensAddress.length &&
      account &&
      chainId &&
      library
    ) {
      const burner = getContract(
        BURNER_ADDRESS[chainId as ChainId],
        BURNER_ABI,
        library,
        account
      );
      try {
        setIsPending(true);
        const tx = await burner.ragequit(pickedRewardTokensAddress, amountParsed);
        await tx.wait();
      } catch (e) {
        setBurnError(e.message);
      } finally {
        setIsPending(false);
      }
    }
  }, [account, amountParsed, chainId, library, pickedRewardTokensAddress]);


  // errorMessage
  // 問題: account 沒有隨著登入狀態改變
  const noAccountError = useMemo(
    () => (account ? '' : 'Wallet is not connected.'),
    [account]
  );


  const noAmountError = useMemo(() => !inputAmount, [inputAmount]);

  const noTokenError = useMemo(() => !pickedRewardTokensAddress.length, [pickedRewardTokensAddress]);

  const [addTokenError, setAddTokenError] = useState<string>('');

  const errorMessage =
    addTokenError ||
    noAccountError ||
    approveError ||
    amountParsedError ||
    totalSupplyError ||
    amountError ||
    noAmountError ||
    noTokenError ||
    burnError;

  return (
    <div sx={styles.container}>
      <div sx={styles.vaultPageWrapper}>
        <div sx={styles.header}>
          <h1 sx={styles.title}>Guild Bank</h1>
          <Web3Status />
        </div>
        <div sx={styles.body}>
          <div sx={styles.infomationContainer}>
            <h3 sx={styles.subTitle}>Burn to get value</h3>
            <div sx={styles.contract}>
              <span>Contract</span>
              <span
                sx={styles.contractAddress}
                onClick={() => { window.open('https://etherscan.io/address/0xde02313f8BF17f31380c63e41CDECeE98Bc2b16d#code', '_blank').focus() }}
              >
                {chainId ? shortenAddress(BURNER_ADDRESS[chainId]) : ''}
              </span>
            </div>
            <p>Description Description Description Description Description Description</p>
            <div sx={styles.hakkaBalance}>
              <span>Burn</span>
              <span>HAKKA Balance: {hakkaBalance?.toSignificant(10)}</span>
            </div>
            <NumericalInputCard
              value={inputAmount}
              onUserInput={setInputAmount}
              hakkaBalance={hakkaBalance}
              approveCallback={approveCallback}
              approveState={approveInfo.state}
            />
            <div sx={styles.errorMessage}>{errorMessage}</div>
            
          </div>
          <div sx={styles.formContainer}>
            <div sx={styles.formTitleArea}>
              <span sx={styles.formTitle}>You wish to receive</span>
              <div
                sx={styles.addTokenButton}
                onClick={() => setIsAddTokenClick(!isAddTokenClick)}
              >
                {isAddTokenClick
                  ? <img src={images.iconDeleteRound} alt='Close the address input window' />
                  : <div sx={styles.addTokenButton}>
                    <span sx={{ paddingBottom: '2px' }}>Add token</span>
                    <img style={styles.addIcon} src={images.iconAdd} alt='add new token' />
                  </div>
                }
              </div>
            </div>
            {/* add new token input area */}
            {isAddTokenClick ?
              <NewTokenAddressInput
                value={newAddressInput}
                onUserInput={setNewAddressInput}
                rewardTokens={rewardTokens}
                setAddTokenError={setAddTokenError}
              />
              : ''
            }
            <div sx={styles.rewardListContainer}>
              {Object.keys(rewardTokens).map((tokenAddress) => {
                return (
                  <RewardListItem
                    key={tokenAddress}
                    tokenName={rewardTokens[tokenAddress].symbol}
                    receiveAmount={localRewardAmount[tokenAddress] || new BigNumber(0)}
                    bankBalance={tokenAddress === ETHADDRESS
                      ? ethBalance[GUILDBANK[chainId as ChainId]]?.toSignificant(6)
                      : tokensBalanceInBank[tokenAddress]?.toSignificant(6)
                    }
                    isDefaultToken={Object.keys(VAULT_TOKENS[chainId || 1]).includes(tokenAddress)} // chainId
                    checked={pickedRewardTokensAddress.includes(tokenAddress)}
                    onChange={() => { toggleToken(tokenAddress) }}
                  />)
              })}
            </div>
            <hr sx={styles.hr2} />
            {/* total value */}
            <RewardValue 
              localRewardAmount={localRewardAmount}
            />
            <div>
              <MyButton type={'green'} click={burn} disabled={!!errorMessage}>Burn</MyButton>
            </div>
          </div>
        </div>
        <div sx={styles.knowMoreWrapper}>
          <hr sx={styles.hr} />
          <div sx={styles.knowMoreRow}>
            <span sx={styles.knowMoreTitle}>Know more</span>
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