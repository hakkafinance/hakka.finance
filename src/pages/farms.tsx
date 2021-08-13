import React from 'react';
import DappLayout from '../containers/DappLayout';
import BlankScreen from '../components/BlankScreen/index'
// import RewardsPage from '../components/RewardsPage/index';

const Farms = () => (
  <DappLayout title="farms">
    <BlankScreen
        path = {'farms'}
    />
    {/* <RewardsPage /> */}
  </DappLayout>
);

export default Farms;
