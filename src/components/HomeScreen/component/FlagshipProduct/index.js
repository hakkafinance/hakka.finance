/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Flex, Box } from 'rebass'
import images from 'src/images'
import styles from './styles'

function FlagshipProduct (props) {
  const { item, i } = props
  return (
    <Flex alignItems="center" key={i} sx={styles.product} mt="2">
      <img sx={styles.imageProduct} src={images[item.image]} alt="" />
      <Box sx={styles.productHeading} ml="3">{item.title}</Box>
    </Flex>
  )
}

export default FlagshipProduct
