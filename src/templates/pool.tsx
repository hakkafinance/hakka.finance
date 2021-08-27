import React from 'react';
import DappLayout from '../containers/DappLayout';
import PoolPage from '../components/RewardsPage/pool';

const Pools = ({ pageContext }) => {
  const { pool } = pageContext
  return (
  <DappLayout title="farms">
    <PoolPage pool={pool} />
  </DappLayout>
  )
};

export default Pools;
