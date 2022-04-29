import React from 'react';
import { Button, Box } from 'rebass';
import types from 'prop-types';
import styles from './styles';

interface IProps {
  disabled?: boolean;
  onClick: () => void;
  styleKit?: 'green' | 'default';
  children?: React.ReactNode;
}

const MyButton = (props: IProps) => {
  const {
    disabled,
    onClick,
    styleKit,
    children
  } = props;
  
  return (
    <Button 
      disabled={disabled} 
      onClick={onClick} 
      sx={styleKit === 'green' 
          ? styles.mybutton_green 
          : styles.mybutton
      }>
      <Box>{children}</Box>
    </Button>
  );
};

MyButton.propTypes = {
  disabled: types.bool,
  styleKit: types.oneOf(['green','default']),
  onClick: types.func,
};

export default MyButton;
