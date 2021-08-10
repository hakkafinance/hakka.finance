/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import styles from './styles';

type SnackbarProps = {
  children: React.ReactNode
}

export default function Snackbar(props: SnackbarProps): JSX.Element {
  const { children } = props;

  return (
    <div sx={styles.wrapper}>
      <div sx={styles.message}>{children}</div>
    </div>
  );
}
