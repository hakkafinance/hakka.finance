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
  apy: string;
  depositedBalance: string;
  earnedBalance: string;
}

const RewardsPoolCard = (props: RewardsPoolCardProps) => (
  <div sx={styles.container}>
    <div sx={styles.illustration} />
    <div sx={styles.header}>
      <p>
        APY {props.apy} %
      </p>
      <img src={props.tokenImage} />
    </div>
    <p sx={styles.title}>{props.title}</p>
    <a sx={styles.link} target='_blank' href={props.url}>
      <span>{props.linkContent}</span>
      <img src={images.iconLinkNormal} />
    </a>
    <div sx={styles.rewardInfo}>
      <p>You deposited</p>
      <div sx={styles.amountWrapper}>
        <span sx={styles.amount}> {props.depositedBalance} </span>
        <span>{props.depositedTokenSymbol}</span>
      </div>
      <p>Earned</p>
      <div sx={styles.amountWrapper}>
        <span sx={styles.amount}> {props.earnedBalance} </span>
        <span>HAKKA</span>
      </div>
    </div>
    <MyButton click={() => { location.href = `/farms?pool=${props.rewardsAddress}`; }}>
      {props.btnContent}
    </MyButton>
  </div>
);

export default RewardsPoolCard;
