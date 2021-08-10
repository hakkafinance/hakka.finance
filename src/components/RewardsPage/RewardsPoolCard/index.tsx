/** @jsx jsx */
import { jsx } from 'theme-ui'
import styles from './styles'
import images from '../../../images/index'
import MyButton from '../../Common/MyButton'


interface RewardsPoolCardProps {
  apiPercentage: string;
  tokenImage: string;
  title: string;
  linkContent: string;
  btnContent: string;
  depositedTokenSymbol: string; 
}

const RewardsPoolCard = (props: RewardsPoolCardProps) => {
  return (
    <div sx={styles.container}>
      <div sx={styles.illustration} />
      <div sx={styles.header}>
        <p>APY {props.apiPercentage}</p>
        <img src={props.tokenImage} />
      </div>
      <p sx={styles.title}>{props.title}</p>
      <div sx={styles.link}>
        <span>{props.linkContent}</span>
        <img src={images.iconLinkNormal} />
      </div>
      <div sx={styles.rewardInfo}>
        <p>You deposited</p>
        <div sx={styles.amountWrapper}>
          <span sx={styles.amount}> 0 </span>
          <span>{props.depositedTokenSymbol}</span>
        </div>
        <p>Earned</p>
        <div sx={styles.amountWrapper}>
          <span sx={styles.amount}> 0 </span>
          <span>HAKKA</span>
        </div>
      </div>
      <MyButton> {props.btnContent} </MyButton>
    </div>
  )
}

export default RewardsPoolCard