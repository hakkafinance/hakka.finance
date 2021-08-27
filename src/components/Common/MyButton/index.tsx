import React from 'react';
import { Button, Box } from 'rebass';
import types from 'prop-types';
import styles from './styles';

const MyButton = (props) => {
  return (
    <Button disabled={props.disabled} onClick={props.onClick} sx={props.styleKit === 'green' ? styles.mybutton_green : styles.mybutton}>
      <Box>{props.children}</Box>
    </Button>
  );
};

MyButton.propTypes = {
  disabled: types.bool,
  styleKit: types.oneOf(['green','default']),
  onClick: types.func,
};

export default MyButton;
