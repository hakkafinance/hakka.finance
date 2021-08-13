import React from 'react';
import DappLayout from '../containers/DappLayout';
// import Staking from '../components/StakingPage';
import BlankScreen from '../components/BlankScreen/index'

const StakingPage = () => (
  <DappLayout
    title="staking"
  >

    <BlankScreen
      path={'staking'}
    />
    {/* <Staking /> */}
  </DappLayout>
);

export default StakingPage;
