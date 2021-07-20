/** @jsx jsx */
import { jsx } from 'theme-ui'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { AbstractConnector } from '@web3-react/abstract-connector'
import images from '../../images/index'
import styles from './styles'
// import types from 'prop-types'
import MyButton from '../Common/MyButton'
import {
  injected,
} from '../../connectors'
import { shortenAddress } from '../../utils'
import useENSName from '../../hooks/useENSName'

const Wallet = (props) => {
  const { activate, account } = useWeb3React()
  const { ENSName } = useENSName(account ?? undefined)
  const tryActivation = async (connector: AbstractConnector | undefined) => {
    connector &&
      activate(connector, undefined, true).catch((error) => {
        if (error instanceof UnsupportedChainIdError) {
          activate(connector)
        } else {
          console.error(true)
        }
      })
  }

  return (
    <div sx={styles.container}>
      <div sx={styles.chainWrapper}>
        <img src={images.iconEthereumDark} alt='Chain Icon' />
        <span sx={styles.chainNameWrapper}>
          Ethereum
        </span>
      </div>
      <div sx={styles.loginButtonWrapper}>
        <MyButton click={() => tryActivation(injected)}>{account ? ENSName || shortenAddress(account) : 'Connect'}</MyButton>
      </div>
      <img sx={styles.accountIconWrapper} src={images.iconAccount} alt='Account Icon' />
    </div>
  )
}

// Wallet.propTypes = {
//   tokenName: types.string,
// }

export default Wallet;