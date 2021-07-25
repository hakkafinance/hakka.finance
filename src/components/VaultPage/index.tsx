/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useState, useCallback } from 'react'
import images from '../../images/index'
import styles from './styles'
import MyButton from '../Common/MyButton/index'
import RewardListItem from './RewardListItem/index'
import Wallet from '../Wallet/index'
import NumericalInputCard from './NumericalInputCard/index'
import NewTokenAddressInput from './NewTokenAddressInput'
import { useActiveWeb3React } from '../../hooks/index'
import { useSnackbar } from '../../hooks/useSnackbar'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import { getEtherscanLink, shortenTxId } from '../../utils'
import { useTokenBalance, useETHBalances } from '../../state/wallet/hooks'
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
  GUILDBANK
} from '../../constants';

const VaultPage = (props) => {
  const { account, library, chainId } = useActiveWeb3React()
  const { enqueueSnackbar } = useSnackbar()
  const [approveInfo, approveCallback] = useApproveCallback(
    HAKKA[chainId as ChainId],
    BURNER_ADDRESS[chainId as ChainId]
  )

  useEffect(() => {
    if (approveInfo.state === ApprovalState.APPROVED) {
      console.log('APPROVED')
    } else if (approveInfo.state === ApprovalState.NOT_APPROVED) {
      console.log('NOT_APPROVED')
    } else if (approveInfo.state === ApprovalState.PENDING) {
      console.log('PENDING')
      console.log(approveInfo.txid)
      enqueueSnackbar(
        <a
          target='_blank'
          href={getEtherscanLink(chainId ?? 1, approveInfo.txid, 'transaction')}
        >{shortenTxId(approveInfo.txid)}</a>,
        approveInfo.txid
      )
    } else {
      console.log('UNKNOWN')
    }
  }, [approveInfo])

  // ----------------------------------------------
  const estimateAmount = 500;
  const testHakkaBalance = 500.123;
  // ----------------------------------------------

  const [inputAmount, setInputAmount] = useState('');

  const [rewardTokens, setRewardTokens] = useState(VAULT_TOKENS[chainId || 1]);

  const [isAddTokenClick, setIsAddTokenClick] = useState(false);
  const [newAddressInput, setNewAddressInput] = useState('');

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

  const toggleToken = (tokenAddress: string) => {
    const selectedTokenList = pickedRewardTokensAddress.includes(tokenAddress) //return true or false
      ? pickedRewardTokensAddress.filter((sortedAddress) => sortedAddress !== tokenAddress) //return 符合規則的新陣列
      : [...pickedRewardTokensAddress, tokenAddress]; //(... 展開運算符) 將點選的地址加入到陣列之中
    const sortedAddress = selectedTokenList.sort(
      (a, b) => parseInt(a) - parseInt(b)
    );
    setPickedRewardTokensAddress(sortedAddress);
  };


  const [addTokenError, setAddTokenError] = useState<string>('');


  // ---------------------------------------------------------------------------------------------------------------------------------


  // // get HAKKA balance
  // const hakkaBalance = useTokenBalance(
  //   account as string,
  //   HAKKA[chainId as ChainId]
  // );


  const getEthBalance = useETHBalances([GUILDBANK[chainId as ChainId]])
  const ethBalance = getEthBalance[GUILDBANK[chainId as ChainId]]?.raw.toString()
  console.log("ethBalance", ethBalance)


  // ----------------------------------------------------------------------------------------------------------------------------------


  return (
    <div sx={styles.container}>
      <div sx={styles.vaultPageWrapper}>
        <div sx={styles.header}>
          <h1 sx={styles.title}>Guild Bank</h1>
          <Wallet />
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
                {BURNER_ADDRESS[chainId || 1].slice(0, 10) + '...' + BURNER_ADDRESS[chainId || 1].slice(-8,)}
              </span>
            </div>
            <p>Description Description Description Description Description Description</p>
            <div sx={styles.hakkaBalance}>
              <span>Burn</span>
              <span>HAKKA Balance: {testHakkaBalance}</span>
            </div>
            <NumericalInputCard
              value={inputAmount}
              onUserInput={setInputAmount}
              hakkaBalance={'1000'}
              approveCallback={approveCallback}
              approveState={approveInfo.state}
            />
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
                    receiveAmount={'100'}
                    bankBalance={'10000'}
                    isDefaultToken={Object.keys(VAULT_TOKENS[chainId || 1]).includes(tokenAddress)} // chainId
                    checked={pickedRewardTokensAddress.includes(tokenAddress)}
                    onChange={() => { toggleToken(tokenAddress) }}
                  />)
              })}
            </div>
            <hr sx={styles.hr2} />
            {/* total value */}
            <div sx={styles.totalValueWrapper}>
              <span>Total Value</span>
              <span sx={styles.totalValueAmount}>{estimateAmount} USD</span>
            </div>
            <div>
              <MyButton type={'green'} click={approveCallback}>Burn</MyButton>
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