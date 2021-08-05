/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Box } from 'rebass'
import images from '../../../images/index'
import styles from './styles'

const DappHeader = (props) => {
  
  const { toggleSidebar } = props

  const handleToggleSidebar = () => {
    toggleSidebar()
  }

  return (
    <>
      <Box sx={styles.headerContainer} width="100%" >
        <Box>
          <img sx={styles.headerBg} src={images.dappHeaderLogo} />
        </Box>
      </Box>

      <Box sx={styles.mobile_header} justifyContent="space-between">
        <img sx={styles.headerBg} src={images.dappHeaderLogo3x} />
        <img sx={styles.logoRespon} src={images.hakkaLogo} alt="" />
        <img onClick={handleToggleSidebar} sx={styles.iconMenu} src={images.iconMenu} alt="" />
      </Box>
    </>
  )
}
export default DappHeader
