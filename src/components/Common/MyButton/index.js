import React from 'react'
import { Button, Box } from 'rebass'
import styles from './styles'
import types from 'prop-types'

const MyButton = (props) => {
  const { type, click } = props

  return (
  <Button onClick={() => { if (props.click) props.click() }} sx={type === 'green' ? styles.mybutton_green : styles.mybutton}>
    <Box>{props.children}</Box>
  </Button>
  )
}

MyButton.propTypes = {
  children: types.any,
  title: types.string
}

export default MyButton
