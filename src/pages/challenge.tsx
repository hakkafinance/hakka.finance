import React from 'react';
import DappLayout from '../containers/DappLayout';
import ChallengePage from '../components/ChallengePage/index';

type Props = {}

const Challenge = ({}: Props) => {
  return (
    <DappLayout title="Hakka Finance | Challenge">
      <ChallengePage />
    </DappLayout>
  )
}

export default Challenge