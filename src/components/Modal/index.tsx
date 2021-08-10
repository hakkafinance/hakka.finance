/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { animated, useTransition } from 'react-spring';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import { isMobile } from 'react-device-detect';
import '@reach/dialog/styles.css';
import styles from './styles';

const AnimatedDialogOverlay = animated(DialogOverlay);
const AnimatedDialogContent = animated(DialogContent);

interface ModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  initialFocusRef?: React.RefObject<any>;
  children?: React.ReactNode;
}

export default function Modal({
  isOpen,
  onDismiss,
  initialFocusRef,
  children,
}: ModalProps) {
  const fadeTransition = useTransition(isOpen, null, {
    config: { duration: 200 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <>
      {fadeTransition.map(
        ({ item, key, props }) => item && (
        <AnimatedDialogOverlay
          sx={styles.dialogOverlay}
          key={key}
          style={props}
          onDismiss={onDismiss}
          initialFocusRef={initialFocusRef}
        >
          <AnimatedDialogContent
            sx={styles.dialogContent}
            aria-label="dialog content"
          >
            {!initialFocusRef && isMobile ? <div tabIndex={1} /> : null}
            {children}
          </AnimatedDialogContent>
        </AnimatedDialogOverlay>
        ),
      )}
    </>
  );
}
