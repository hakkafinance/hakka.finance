import React from 'react'
// import BlankScreen from '../components/BlankScreen'
import Layout from '../containers/Layout'
import VestingPage from '../components/VestingPage'

const RewardsPage = () => {
  return (
    <Layout title={'rewards'}>
      {/* <BlankScreen 
        path={'rewards'}
      /> */}
      <VestingPage />
    </Layout>
  )
}

export default RewardsPage
