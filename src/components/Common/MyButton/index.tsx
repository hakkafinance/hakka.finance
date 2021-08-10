import React from 'react';
import { Button, Box } from 'rebass';
import types from 'prop-types';
import styles from './styles';

const MyButton = (props) => {
  const { type, click, disabled } = props;

  return (
    <Button disabled={disabled} onClick={() => { if (props.click) props.click(); }} sx={type === 'green' ? styles.mybutton_green : styles.mybutton}>
      <Box>{props.children}</Box>
    </Button>
  );
};

MyButton.propTypes = {
  children: types.any,
  title: types.string,
  disabled: types.bool,
};

export default MyButton;
