import React from 'react';
import DappLayout from '../containers/DappLayout';
import RewardsPage from '../components/RewardsPage/index';

const Farms = ({ pageContext }) => {
  const { pool } = pageContext
  console.log(pool)
  return (
  <DappLayout title="Hakka Finance | Farms">
    <RewardsPage />
  </DappLayout>
  )
};

export default Farms;
