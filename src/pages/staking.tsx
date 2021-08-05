import React from 'react'
// import BlankScreen from 'src/components/BlankScreen'
import DappLayout from '../containers/DappLayout'
import Staking from '../components/StakingPage'

const StakingPage = () => {
  return (
    <DappLayout
      title ={'staking'}
    >
      {/* <BlankScreen 
        path = {'staking'}
      /> */}
      <Staking />
    </DappLayout>
  )
}

export default StakingPage