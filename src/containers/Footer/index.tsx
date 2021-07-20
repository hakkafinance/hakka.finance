/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Box, Flex, Text } from 'rebass'
import images from '../../images/index'
import styles from './styles'

function Footer () {
  const listIcon = [
    {
      url: 'iconTelegram',
      href: 'https://t.me/hakkafinance'
    },
    {
      url: 'iconTwitter',
      href: 'https://twitter.com/hakkafinance'
    },
    {
      url: 'iconDiscord',
      href: 'https://discord.com/invite/zYfqpUQ'
    },
    {
      url: 'iconMedium',
      href: 'https://medium.com/hakkafinance'
    },
    {
      url: 'iconGithub',
      href: 'https://github.com/hakkafinance'
    }
  ]

  const renderListIcon = () => {
    return listIcon.map((item, i) => {
      return (
        <Box key={i}>
          <a target="_blank" href={item.href} rel="noreferrer">
            <img sx={styles.imgIcon} src={images[item.url]} />
          </a>
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
