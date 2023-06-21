import React, { Context } from 'react';
import { useContextSelector } from 'use-context-selector';

import ApplicationContextProvider from './application/context';
import MulticallContextProvider from './multicall/context';

export function useContextStateSelector<
  S,
  T extends { state: S },
  K extends keyof S
>(context: Context<T>, selector: K): S[K] {
  return useContextSelector(context, (v) => v.state[selector]);
}

export const ContextProviders: React.FC = ({ children }) => (
  <ApplicationContextProvider>
    <MulticallContextProvider>{children}</MulticallContextProvider>
  </ApplicationContextProvider>
);
