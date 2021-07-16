/** @jsx jsx */
import { jsx } from 'theme-ui'
import images from 'src/images'
import styles from './styles'
import MyButton from 'src/components/Common/MyButton'
import RewardListItem from './RewardListItem/index'
import Web3Status from '../Web3Status/index'

const VaultPage = (props) => {

  const estimateAmount = 500;
  const hakkaBalance = 500.123;
  const HAKKAADDRESS = '0x0E29e5Ab…47dE3bcd';
  const tokenList = {
    '1': {
      tokenName: 'HAKKA',
      receiveAmount: '100',
      bankBalance: '20000',
      isDefaultToken: true,
      checked: false,
    }, '2': {
      tokenName: 'DAI',
      receiveAmount: '0.201',
      bankBalance: '200.99',
      isDefaultToken: true,
      checked: true,
    }, '3': {
      tokenName: 'BHS',
      receiveAmount: '100',
      bankBalance: '20000',
      isDefaultToken: false,
      checked: false,
    }, '4': {
      tokenName: 'YUANANTOKEN',
      receiveAmount: '100',
      bankBalance: '20000',
      isDefaultToken: false,
      checked: true,
    }
  };

  // const rewardList

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
              {Object.keys(tokenList).map((tokenAddress) => {
                return (
                  <RewardListItem
                    key={tokenAddress}
                    tokenName={tokenList[tokenAddress].tokenName}
                    receiveAmount={tokenList[tokenAddress].receiveAmount}
                    bankBalance={tokenList[tokenAddress].bankBalance}
                    isDefaultToken={tokenList[tokenAddress].isDefaultToken}
                    checked={tokenList[tokenAddress].checked}
                    onChange={() => { alert('123') }}
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
              <MyButton type={'green'}>Burn</MyButton>
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