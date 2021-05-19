/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import styles from './styles'
import { Box, Flex, Heading } from 'rebass'

function WhatHakka (props) {
  return (
    <>
      <Box id='whatHakka' sx={styles.whatHakkaHeading}>What is HAKKA Token</Box>
      <Box sx={styles.whatHakkaText} mt="4">
       <p> HAKKA is the protocol token that empowers the community governance of Hakka Finance.</p>
      </Box>
      <Flex sx={styles.listCoinHakka} mt="20px" alignItems="center">
        {props.renderCoin()}
      </Flex>
    </>
  )
}

export default WhatHakka
