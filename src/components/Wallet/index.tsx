/** @jsx jsx */
import { jsx } from 'theme-ui'
import images from '../../images/index'
import styles from './styles'
// import types from 'prop-types'
import MyButton from '../Common/MyButton'

const Wallet = (props) => {
  return (
    <div sx={styles.container}>
      <div sx={styles.chainWrapper}>
        <img src={images.iconEthereumDark} alt='Chain Icon' />
        <span sx={styles.chainNameWrapper}>
          Ethereum
        </span>
      </div>
      <div sx={styles.loginButtonWrapper}>
        <MyButton click={() => { }}>0x1234…1234</MyButton>
      </div>
      <img sx={styles.accountIconWrapper} src={images.iconAccount} alt='Account Icon' />
    </div>
  )
}

// Wallet.propTypes = {
//   tokenName: types.string,
// }

export default Wallet;