import React from 'react';
import { Button, Box } from 'rebass';
import types from 'prop-types';
import styles from './styles';

const MyButton = (props) => {
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
