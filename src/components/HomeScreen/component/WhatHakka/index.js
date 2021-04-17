/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import styles from './styles'
import { Box, Flex, Heading } from 'rebass'

function WhatHakka (props) {
  return (
    <>
      <Box sx={styles.whatHakkaHeading}>What is HAKKA Token</Box>
      <Box sx={styles.whatHakkaText} mt="4">
       <p> Colorful Hakka ecosystem is administered and governed by a homonymous
        protocol token, which goes by the ticker of HAKKA.</p>
      </Box>
      <Flex sx={styles.listCoinHakka} mt="20px" alignItems="center">
        {props.renderCoin()}
      </Flex>
    </>
  )
}

export default WhatHakka
