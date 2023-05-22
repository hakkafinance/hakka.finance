import React, { ReactNode } from 'react';
import { ContextProviders } from './src/state/';
import ApplicationUpdater from './src/state/application/updater';
import MulticallUpdater from './src/state/multicall/updater';
import { Web3ReactProvider } from '@web3-react/core';
import { CONNECTORS } from './src/connectors';

function Updaters () {
  return (
    <>
      <ApplicationUpdater />
      <MulticallUpdater />
    </>
  );
}

export default function RootLayout ({ children }: { children?: ReactNode }) {
  return (
    <Web3ReactProvider connectors={CONNECTORS}>
      <ContextProviders>
        <Updaters />
        {children}
      </ContextProviders>
    </Web3ReactProvider>
  );
}
