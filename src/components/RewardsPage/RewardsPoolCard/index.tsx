/** @jsx jsx */
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { jsx } from 'theme-ui';
import styles from './styles';
import images from '../../../images/index';
import { MyButton } from '../../Common';
import withConnectWalletCheckWrapper from '../../../hoc/withConnectWalletCheckWrapper';
import withWrongNetworkCheckWrapper from '../../../hoc/withWrongNetworkCheckWrapper';
import { useWalletModalToggle } from '../../../state/application/hooks';
import { ChainId } from '../../../constants';

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
  subtitle?: string;
  currentChain: ChainId;
}

const RewardsPoolCard = (props: RewardsPoolCardProps) => {
  const {
    apr,
    tokenImage,
    subtitle,
    title,
    url,
    linkContent,
    depositedBalance,
    depositedTokenSymbol,
    earnedBalance,
    btnContent,
    rewardsAddress,
    currentChain,
  } = props;

  const { chainId, account, error } = useWeb3React();
  const toggleWalletModal = useWalletModalToggle();
  const MainButton = withWrongNetworkCheckWrapper(
    withConnectWalletCheckWrapper(MyButton)
  );
  const isConnected = !!account || error instanceof UnsupportedChainIdError;

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
      {subtitle && <p sx={styles.subtitle}>{subtitle}</p>}
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
      <MainButton
        isDisabledWhenNotPrepared={false}
        isConnected={isConnected}
        connectWallet={toggleWalletModal}
        isCorrectNetwork={chainId === currentChain}
        targetNetwork={currentChain}
        onClick={() => { location.href = `/farms/${rewardsAddress}` }}
      >
        {btnContent}
      </MainButton>
    </div>
  )
} ;

export default RewardsPoolCard;
