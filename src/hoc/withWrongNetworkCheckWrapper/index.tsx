import React from 'react';
import useNetworkSwitcher from '../../hooks/useNetworkSwitcher';

export interface WrongNetworkCheckWrapperInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabledWhenNotPrepared?: boolean;
  isCorrectNetwork?: boolean;
}

const withWrongNetworkCheckWrapper = <T extends object>(WrappedComponent: React.ComponentType<T>) => (props: T & WrongNetworkCheckWrapperInterface) => {
  const {
    isDisabledWhenNotPrepared,
    isCorrectNetwork,
    onClick,
    disabled,
    children,
  } = props;

  const switchMethod = useNetworkSwitcher();
  const isDisabled = isCorrectNetwork ? disabled : isDisabledWhenNotPrepared;
  const handleClick = isCorrectNetwork ? onClick : () => window.ethereum.request(switchMethod);
  const childrenElement = !isCorrectNetwork && !isDisabledWhenNotPrepared ? 'Change Network' : children;

  const wrappedComponentProps = {
    ...props,
    children: childrenElement,
    disabled: isDisabled,
    onClick: handleClick,
  };
  
  return <WrappedComponent {...wrappedComponentProps} />;
};

export default withWrongNetworkCheckWrapper;