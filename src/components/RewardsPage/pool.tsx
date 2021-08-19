/** @jsx jsx */
import { jsx } from 'theme-ui';
import styles from './styles';
import PoolDetail from './PoolDetail';
import Web3Status from '../Web3Status';

const PoolPage = ({ pool }) => {
  return (
    <div sx={styles.container}>
      <div sx={styles.rewardsPageWrapper}>
        <div sx={styles.header}>
          <p>Pool</p>
          <Web3Status />
        </div>

        <PoolDetail pool={pool}/>
      </div>
    </div>
  );
};

export default PoolPage;
