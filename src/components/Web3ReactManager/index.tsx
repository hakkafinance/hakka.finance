/** @jsx jsx */
import { Spinner, jsx } from 'theme-ui';
import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { network, networkHooks } from '../../connectors';
import { useEagerConnect, useInactiveListener } from '../../hooks/web3Manager';
import styles from './styles';
const { useIsActive } = networkHooks;
export default function Web3ReactManager({
  children,
}: {
  children: JSX.Element;
}) {
  const { isActive: active } = useWeb3React();

  const networkActive = useIsActive();
  const activateNetwork = () => network.activate();
  const triedEager = useEagerConnect();

  useEffect(() => {
    if (triedEager && !networkActive && !active) {
      activateNetwork();
    }
  }, [triedEager, networkActive, activateNetwork, active]);

  useInactiveListener(!triedEager);
  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) {
    return null;
  }

  if (!active) {
    return (
      <div sx={styles.messageWrapper} >
        <Spinner />
      </div>
    );
  }

  return children;
}
