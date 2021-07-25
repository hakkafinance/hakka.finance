/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import useCopyClipboard from '../../hooks/useCopyClipboard';
import { CheckCircle, Copy } from 'react-feather';
import styles from './styles';

export default function CopyHelper(props: {
  toCopy: string;
  children?: React.ReactNode;
}) {
  const [isCopied, setCopied] = useCopyClipboard();

  return (
    <button sx={styles.copyIcon} onClick={() => setCopied(props.toCopy)}>
      {isCopied ? (
        <CheckCircle size={'16'} />
      ) : (
        <Copy size={'16'} />
      )}
      {isCopied ? <span style={{ marginLeft: '4px' }}>Copied</span> : props.children}
    </button>
  );
}
