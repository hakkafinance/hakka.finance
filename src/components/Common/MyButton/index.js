import React from 'react'
import { Button, Box } from 'rebass'
import styles from './styles'
import types from 'prop-types'

const MyButton = (props) => {
  const { type } = props

  return (
  <Box sx={type === 'green' ? styles.mybutton_green : styles.mybutton}>
    <Box>{props.children}</Box>
  </Box>
  )
}

MyButton.propTypes = {
  children: types.any,
  title: types.string
}

export default MyButton
