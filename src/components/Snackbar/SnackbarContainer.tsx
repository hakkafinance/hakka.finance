/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useRef } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import styles from './styles';

const defaultStyle = {
  transition: 'all 0.6s ease-in-out',
  opacity: 0,
  transform: 'translateX(200px)',
};

const transitionStyles = {
  entering: { opacity: 0, transform: 'translateX(200px)' },
  entered: { opacity: 1, transform: 'translateX(0)' },
  exiting: { opacity: 0, transform: 'translateX(200px)' },
  exited: { opacity: 0, transform: 'translateX(200px)' },
};

type SnackbarContainerProps = {
  children: JSX.Element[]
}

export default function SnackbarContainer(props: SnackbarContainerProps): JSX.Element {
  const { children } = props;

  const nodeRef = useRef();

  return (
    <div sx={styles.container}>
      <TransitionGroup component={null}>
        {React.Children.map(children, (child: JSX.Element, index: number) => (
          <Transition
            key={child.key}
            nodeRef={nodeRef}
            timeout={300}
          >
            {(state: string) => React.cloneElement(child, {
              style: {
                ...defaultStyle,
                ...child.props.style,
                ...(transitionStyles as any)[state],
              },
            })}
          </Transition>
        ))}
      </TransitionGroup>
    </div>
  );
}
