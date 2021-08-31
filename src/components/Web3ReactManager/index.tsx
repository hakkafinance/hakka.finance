/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { network } from '../../connectors';
import { useEagerConnect, useInactiveListener } from '../../hooks/web3Manager';
import { NetworkContextName } from '../../constants';
import styles from './styles';

export default function Web3ReactManager({
  children,
}: {
  children: JSX.Element;
}) {
  const { active } = useWeb3React();
  const {
    active: networkActive,
    error: networkError,
    activate: activateNetwork,
  } = useWeb3React(NetworkContextName);

  const triedEager = useEagerConnect();

  useEffect(() => {
    if (triedEager && !networkActive && !networkError && !active) {
      activateNetwork(network);
    }
  }, [triedEager, networkActive, networkError, activateNetwork, active]);

  useInactiveListener(!triedEager);

  // on page load, do nothing until we've tried to connect to the injected connector
  if (!triedEager) {
    return null;
  }

  if (!active && networkError) {
    return (
      <div sx={styles.messageWrapper}>
        <h2>
          Oops! An unknown error occurred.
        </h2>
      </div>
    );
  }

  return children;
}
