import React from 'react'
import DappLayout from '../containers/Layout'
import VestingPage from '../components/VestingPage'

const Vesting = () => {
  return (
    <DappLayout title={'vesting'}>
      <VestingPage />
    </DappLayout>
  )
}

export default Vesting
