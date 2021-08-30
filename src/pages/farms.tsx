import React from 'react';
import DappLayout from '../containers/DappLayout';
import RewardsPage from '../components/RewardsPage/index';

const Farms = ({ pageContext }) => {
  const { pool } = pageContext
  return (
  <DappLayout title="Hakka Finance | Farms">
    <RewardsPage />
  </DappLayout>
  )
};

export default Farms;
