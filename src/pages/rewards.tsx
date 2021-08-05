import React from 'react'
import BlankScreen from '../components/BlankScreen'
import DappLayout from '../containers/DappLayout'

const RewardsPage = () => {
  return (
    <DappLayout title={'rewards'}>
      <BlankScreen 
        path={'rewards'}
      />
    </DappLayout>
  )
}

export default RewardsPage
