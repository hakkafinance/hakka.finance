/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Box, Flex } from 'rebass'
import images from 'src/images'
import styles from './styles'
import SideBar from '../SideBar'

const Header = (props) => {
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
  const { toggleSidebar } = props

  const handleToggleSidebar = () => {
    toggleSidebar()
  }
  const renderListIcon = () => {
    return listIcon.map((item, i) => {
      return (
        <a key={i} target="_blank" href={item.href} rel="noreferrer">
          <img sx={styles.imgIcon} src={images[item.url]} />
        </a>
      )
    })
  }

  return (
    <>
      <Box sx={styles.headerContainer} width="100%" >
        {/* <Flex ><img sx={styles.iconMenuLeft} src={images.iconMenu} alt="" /></Flex> */}
        <Box>
          <img sx={styles.headerBg} src={images.headerLogo} />
        </Box>
        <Flex mr="28px">{renderListIcon()}</Flex>
      </Box>

      <Box sx={styles.mobile_header} justifyContent="space-between">
        <img sx={styles.headerBg} src={images.headerLogo3x} />
        <img sx={styles.logoRespon} src={images.hakkaLogo} alt="" />
        <img onClick={handleToggleSidebar} sx={styles.iconMenu} src={images.iconMenu} alt="" />
      </Box>
      {/* </Box> */}
    </>
  )
}
export default Header
