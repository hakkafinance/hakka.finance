import React from "react";
import { HocButtonWrapperPropsInterface } from "../ApproveTokenButtonWrapper/index"

// React.ComponentType
const ConnectWalletButtonWrapper = (WrappedComponent) => (props:HocButtonWrapperPropsInterface) => {
  const { 
    isDisabledWhenNotPrepared, 
    isApproved, 
    isConnected, 
    connectWallet, 
    onClick,
    exceptionHandlingDisabled,
    click,
    children, 
    disabled, 
  } = props;
  
  
  const disabledProps = disabled || (isDisabledWhenNotPrepared ? !isConnected : false) ;
  const exceptionHandlingDisabledProps = (typeof(isApproved) === "undefined" ? isConnected : (isConnected && isApproved)) && exceptionHandlingDisabled ;
  const clickProps = !isDisabledWhenNotPrepared && !isConnected ? connectWallet : (click || onClick);
  const childrenProps = !isDisabledWhenNotPrepared && !isConnected ? 'Connect Wallet'  : children;

  const wrappedComponentProps = {  
    ...props,
    click: clickProps, 
    children: childrenProps,
    disabled: disabledProps || exceptionHandlingDisabledProps, 
  };

  return <WrappedComponent {...wrappedComponentProps}/>;
};

export default ConnectWalletButtonWrapper;