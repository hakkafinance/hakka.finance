import React from 'react';
import DappLayout from '../containers/DappLayout';
import RewardsPage from '../components/RewardsPage/index';

const Farms = ({ pageContext }) => {
  const { pool } = pageContext
  console.log(pool)
  return (
  <DappLayout title="farms">
    <RewardsPage />
  </DappLayout>
  )
};

export default Farms;