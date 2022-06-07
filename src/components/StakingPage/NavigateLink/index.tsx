/** @jsx jsx */
import { jsx } from 'theme-ui';
import styles from './styles';
import images from '../../../images';
export default function NavigateLink () {
  return (
    <div sx={styles.wrapper}>
      <strong>New staking model (v2) is now available!</strong>
      <div className="navigate-link">
        Read more about updates and migration
      </div>
      <img src={images.iconLinkSmall} alt="iconLinkSmall" />
    </div>
  );
}
