import React from 'react'
import BlankScreen from 'src/components/BlankScreen'
import Layout from 'src/containers/Layout'
import Staking from '../components/StakingPage'

const StakingPage = () => {
  return (
    <Layout>
      {/* <BlankScreen 
        path = {'staking'}
      /> */}
      <Staking />
    </Layout>
  )
}

export default StakingPage