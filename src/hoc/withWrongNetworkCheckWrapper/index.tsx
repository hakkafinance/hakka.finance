import React from 'react';
import useRequestNetworkConfig from '../../hooks/useRequestNetworkConfig';

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

  const networkConfig = useRequestNetworkConfig();
  const isDisabled = isCorrectNetwork ? disabled : isDisabledWhenNotPrepared;
  const handleClick = isCorrectNetwork ? onClick : () => window.ethereum.request(networkConfig);
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