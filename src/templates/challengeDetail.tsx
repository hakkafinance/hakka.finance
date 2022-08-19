import React from 'react';
import ChallengeDetailPage from '../components/ChallengePage/DetailPage';
import DappLayout from '../containers/DappLayout';

const ChallengeDetail = ({ pageContext }) => {
  const { oatAddress } = pageContext
  return (
  <DappLayout title="Hakka Finance | Mission">
    <ChallengeDetailPage oatAddress={oatAddress} />
  </DappLayout>
  )
};

export default ChallengeDetail;
