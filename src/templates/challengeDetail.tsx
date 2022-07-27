import React from 'react';
import DappLayout from '../containers/DappLayout';

const ChallengeDetail = ({ pageContext }) => {
  const { oatAddress } = pageContext
  return (
  <DappLayout title="Hakka Finance | Challenge">
    <p>{`Here is challenge detail ${oatAddress}`}</p>
  </DappLayout>
  )
};

export default ChallengeDetail;
