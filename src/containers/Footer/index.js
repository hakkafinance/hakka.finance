/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Box, Flex, Text } from 'rebass'
import images from 'src/images'
import styles from './styles'

function Footer () {
  const listIcon = [
    {
      url: 'iconTelegram'
    },
    {
      url: 'iconTwitter'
    },
    {
      url: 'iconDiscord'
    },
    {
      url: 'iconMedium'
    },
    {
      url: 'iconGithub'
    }
  ]

  const renderListIcon = () => {
    return listIcon.map((item, i) => {
      return (
        <Box key={i}>
          <img sx={styles.imgIcon} src={images[item.url]} />
        </Box>
      )
    })
  }
  return (
    <Box sx={styles.footerContainer}>
      <Flex
        sx={styles.footerContent}
      >
        <Box><img sx={styles.logoFooter} src={images.logoGray} alt="" /></Box>
        <Flex sx={styles.footer_icons}>{renderListIcon()}</Flex>
      </Flex>

      <Text sx={styles.textCopy}>© Copyright 2021 HAKKA FINANCE</Text>
    </Box>
  )
}

export default Footer
