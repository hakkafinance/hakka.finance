/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useWeb3React } from '@web3-react/core';
import styles from './styles';
import PoolDetail from './PoolDetail';
import Web3Status from '../Web3Status';
import { REWARD_POOLS } from '../../constants/rewards';

const PoolPage = ({ pool }) => {
  const { chainId } = useWeb3React();

  return (
    <div sx={styles.container}>
      <div sx={styles.rewardsPageWrapper}>
        <div sx={styles.header}>
          <p>Pool</p>
          <Web3Status unsupported={REWARD_POOLS[pool].chain !== chainId} />
        </div>

        <PoolDetail pool={pool}/>
      </div>
    </div>
  );
};

export default PoolPage;
