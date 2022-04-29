import React from 'react';
import DappLayout from '../containers/DappLayout';
import Staking from '../components/StakingPage/v1';

const StakingPage = () => (
  <DappLayout
    title="Hakka Finance | Staking"
  >
    <Staking />
  </DappLayout>
);

export default StakingPage;
