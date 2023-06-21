import React from 'react';

export interface ApproveTokenCheckWrapperInterface extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabledWhenNotPrepared?: boolean;
  isApproved?: boolean;
  approveToken?: () => void;
}

const withApproveTokenCheckWrapper = <T extends object>(WrappedComponent: React.ComponentType<T>) => (props: T & ApproveTokenCheckWrapperInterface) => {
  const {
    isDisabledWhenNotPrepared,
    isApproved,
    approveToken,
    onClick,
    children,
    disabled
  } = props;

  const isDisabled = isApproved ? disabled : isDisabledWhenNotPrepared;
  const handleClick = isApproved ? onClick : approveToken;
  const childrenElement = !isApproved && !isDisabledWhenNotPrepared ? 'Unlock Token' : children;

  const wrappedComponentProps = {
    ...props,
    onClick: handleClick,
    children: childrenElement,
    disabled: isDisabled
  };

  return <WrappedComponent {...wrappedComponentProps} />;
};

export default withApproveTokenCheckWrapper;

