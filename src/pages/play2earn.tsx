import React from 'react';
import DappLayout from '../containers/DappLayout';
import ChallengePage from '../components/ChallengePage/index';

type Props = {}

const Play2Earn = ({}: Props) => {
  return (
    <DappLayout title="Hakka Finance | Play2Earn">
      <ChallengePage />
    </DappLayout>
  )
}

export default Play2Earn