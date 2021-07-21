/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useState, useCallback } from 'react'
import images from '../../images/index'
import styles from './styles'
import MyButton from '../Common/MyButton/index'
import RewardListItem from './RewardListItem/index'
import Wallet from '../Wallet/index'
import { useActiveWeb3React } from '../../hooks/index'
import { useSnackbar } from '../../hooks/useSnackbar'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import { getEtherscanLink, shortenTxId } from '../../utils'

import {
  ChainId,
  HAKKA,
  BURNER_ADDRESS,
  REWARD_TOKENS
} from '../../constants';
import { find } from 'lodash'

const VaultPage = (props) => {
  const { chainId } = useActiveWeb3React()
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

  const estimateAmount = 500;
  const hakkaBalance = 500.123;
  const HAKKAADDRESS = '0x0E29e5Ab…47dE3bcd';

  const [rewardTokens, setRewardTokens] = useState(REWARD_TOKENS[1]) // chainId

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
              <span sx={styles.contractAddress}>{HAKKAADDRESS}</span>
            </div>
            <p>Description Description Description Description Description Description</p>
            <div sx={styles.hakkaBalance}>
              <span>Burn</span>
              <span>HAKKA Balance: {hakkaBalance}</span>
            </div>
          </div>
          <div sx={styles.formContainer}>
            <div sx={styles.formTitleArea}>
              <span sx={styles.formTitle}>You wish to receive</span>
              <div sx={styles.addTokenButton}>
                <span sx={{ paddingBottom: '2px' }}>Add token</span>
                <img style={styles.addTokenButtonAddIcon} src={images.iconAdd} alt='add new token' />  {/* + */}
                {/* <img src={images.iconDeleteRound} alt='Close the address input window' /> */}
              </div>
            </div>
            {/* add new token input area */}
            <div>
              {/* input */}
              <MyButton>Add</MyButton>
            </div>
            <div sx={styles.rewardListContainer}>
              {Object.keys(rewardTokens).map((tokenAddress) => {
                return (
                  <RewardListItem
                    key={tokenAddress}
                    tokenName={rewardTokens[tokenAddress].symbol}
                    receiveAmount={'100'}
                    bankBalance={'10000'}
                    isDefaultToken={Object.keys(REWARD_TOKENS[1]).includes(tokenAddress)} // chainId
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