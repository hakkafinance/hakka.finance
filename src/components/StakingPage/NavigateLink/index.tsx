/** @jsx jsx */
import { jsx } from 'theme-ui';
import styles from './styles';
import images from '../../../images';

const NEW_STAKING_MEDIUM_LINK = 'https://hakkafinance.medium.com/hakka-finance-token-staking-model-upgrade-1c34d1bb82f6';
export default function NavigateLink () {
  function onClick () {
    window.open(NEW_STAKING_MEDIUM_LINK, '_blank', 'noopener, noreferrer');
  }
  return (
    <div sx={styles.wrapper} onClick={onClick}>
      <strong>New staking model (v2) is now available!</strong>
      <div className="navigate-link">
        Read more about updates and migration
      </div>
      <img src={images.iconLinkSmall} alt="iconLinkSmall" />
    </div>
  );
}
