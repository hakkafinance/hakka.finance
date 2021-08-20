import React from 'react';
import { Button, Box } from 'rebass';
import types from 'prop-types';
import styles from './styles';

const MyButton = (props) => {
  return (
    <Button disabled={props.disabled} onClick={() => { if (props.click) props.click(); }} sx={props.styleKit === 'green' ? styles.mybutton_green : styles.mybutton}>
      <Box>{props.children}</Box>
    </Button>
  );
};

MyButton.propTypes = {
  disabled: types.bool,
  styleKit: types.oneOf(['green','default']),
  click: types.func,
};

export default MyButton;
