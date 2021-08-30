/** @jsx jsx */
import { jsx } from 'theme-ui';
import styles from './styles';
import images from '../../../images/index';
import MyButton from '../../Common/MyButton';

interface RewardsPoolCardProps {
  tokenImage: string;
  title: string;
  url: string;
  linkContent: string;
  btnContent: string;
  depositedTokenSymbol: string;
  rewardsAddress: string;
  apr: string;
  depositedBalance: string;
  earnedBalance: string;
}

const RewardsPoolCard = (props: RewardsPoolCardProps) => {
  const {
    apr,
    tokenImage,
    title,
    url,
    linkContent,
    depositedBalance,
    depositedTokenSymbol,
    earnedBalance,
    btnContent,
    rewardsAddress
  } = props;

  return(
    <div sx={styles.container}>
      <div sx={styles.illustration} />
      <div sx={styles.header}>
        <p>
          APR {apr}%
        </p>
        <img sx={styles.icon} src={tokenImage} />
      </div>
      <p sx={styles.title}>{title}</p>
      <a sx={styles.link} target='_blank' href={url}>
        <span>{linkContent}</span>
        <img src={images.iconLinkNormal} />
      </a>
      <div sx={styles.rewardInfo}>
        <p>You deposited</p>
        <div sx={styles.amountWrapper}>
          <span sx={styles.amount}> {depositedBalance} </span>
          <span>{depositedTokenSymbol}</span>
        </div>
        <p>Earned</p>
        <div sx={styles.amountWrapper}>
          <span sx={styles.amount}> {earnedBalance} </span>
          <span>HAKKA</span>
        </div>
      </div>
      <MyButton onClick={() => { location.href = `/farms/${rewardsAddress}`; }}>
        {btnContent}
      </MyButton>
    </div>
  )
} ;

export default RewardsPoolCard;
