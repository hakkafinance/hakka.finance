import React from 'react'
import { ContextProviders } from './src/state/'
import ApplicationUpdater from './src/state/application/updater'
import MulticallUpdater from './src/state/multicall/updater'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { NetworkContextName } from './src/constants'
import getLibrary from './src/utils/getLibrary'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

function Updaters() {
  return (
    <>
      <ApplicationUpdater />
      <MulticallUpdater />
    </>
  )
}

export default function RootLayout({ children }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <ContextProviders>
          <Updaters />
          {children}
        </ContextProviders>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}