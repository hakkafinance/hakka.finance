/** @jsx jsx */
import { jsx } from 'theme-ui'
import images from 'src/images'
import styles from './styles'
// import types from 'prop-types'
import MyButton from 'src/components/Common/MyButton'

const Web3Status = (props) => {
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

// Web3Status.propTypes = {
//   tokenName: types.string,
// }

export default Web3Status;