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
  const { toggleSidebar } = props

  const handleToggleSidebar = () => {
    toggleSidebar()
  }
  const renderListIcon = () => {
    return listIcon.map((item, i) => {
      return (
        <Box mr="0" key={i}>
          <img sx={styles.imgIcon} src={images[item.url]} />
        </Box>
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
        <img sx={styles.logoRespon} src={images.hakkaLogo} alt="" />
        <img onClick={handleToggleSidebar} sx={styles.iconMenu} src={images.iconMenu} alt="" />
      </Box>
      {/* </Box> */}
    </>
  )
}
export default Header
