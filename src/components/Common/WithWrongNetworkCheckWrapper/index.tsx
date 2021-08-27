import React from "react";
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import { HocButtonWrapperPropsInterface } from "../ApproveTokenButtonWrapper/index"

const WithWrongNetworkCheckWrapper = (WrappedComponent: React.ComponentType) => (props:HocButtonWrapperPropsInterface) => {
  const {
    isDisabledWhenNotPrepared, 
    unsupported,
    children,  
  } = props;
  
  const { error } = useWeb3React();
  const disabledProps = error instanceof UnsupportedChainIdError || unsupported;
  const childrenProps = (disabledProps && !isDisabledWhenNotPrepared) ? 'Wrong Network': children;
  const wrappedComponentProps = {  
    ...props,
    children: childrenProps,
    disabled: disabledProps, 
  };

  return <WrappedComponent {...wrappedComponentProps}/>;
};

export default WithWrongNetworkCheckWrapper;