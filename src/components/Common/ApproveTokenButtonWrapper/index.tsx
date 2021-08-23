import React from "react";

export interface HocButtonWrapperPropsInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabledWhenNotPrepared?: boolean;
  isApproved?: boolean;
  approveToken?: () => void;
  isConnected?: boolean;
  connectWallet?: ()=> void;
  click?: ()=> void;
  exceptionHandlingDisabled?: boolean;
  styleKit?: 'green' | 'default';
  unsupported?: boolean;
}

const ApproveTokenButtonWrapper = (WrappedComponent: React.ComponentType) => (props:HocButtonWrapperPropsInterface) => {
  const {
    isDisabledWhenNotPrepared,
    isApproved,
    approveToken,
    isConnected,
    onClick,
    exceptionHandlingDisabled,
    children,
    disabled
  } = props;

  const disabledProps = disabled || (isDisabledWhenNotPrepared ? !isApproved : false);
  const exceptionHandlingDisabledProps = (typeof(isConnected) === "undefined" ? isApproved : (isApproved && isConnected)) && exceptionHandlingDisabled;
  const clickProps = !isDisabledWhenNotPrepared && !isApproved ? approveToken : onClick;
  const childrenProps = !isDisabledWhenNotPrepared && !isApproved ? 'Unlock Token' : children;

  const wrappedComponentProps = {
    ...props,
    click: clickProps,
    children: childrenProps,
    disabled: disabledProps || exceptionHandlingDisabledProps,
  };

  return <WrappedComponent {...wrappedComponentProps} />;
};

export default ApproveTokenButtonWrapper;

