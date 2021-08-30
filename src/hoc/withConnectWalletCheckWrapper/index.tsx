import React from 'react';

export interface ConnectWalletCheckWrapperInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabledWhenNotPrepared?: boolean;
  isConnected?: boolean;
  connectWallet?: ()=> void;
}

const withConnectWalletCheckWrapper = <T extends object>(WrappedComponent: React.ComponentType<T>) => (props: T & ConnectWalletCheckWrapperInterface) => {
  const {
    isDisabledWhenNotPrepared, 
    isConnected, 
    connectWallet, 
    onClick,
    children, 
    disabled, 
  } = props;
  
  const isDisabled = isConnected ? disabled : isDisabledWhenNotPrepared;
  const handleClick = isConnected ? onClick : connectWallet; 
  const childrenElement = !isConnected && !isDisabledWhenNotPrepared ? 'Connect Wallet' : children;

  const wrappedComponentProps = {  
    ...props,
    onClick: handleClick, 
    children: childrenElement,
    disabled: isDisabled, 
  };

  return <WrappedComponent {...wrappedComponentProps}/>;
};

export default withConnectWalletCheckWrapper;