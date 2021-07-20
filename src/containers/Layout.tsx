/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Box, Flex } from 'rebass'
import SideBar from './SideBar'
import Header from './Header'
import Footer from './Footer'
import styles from './styles'
import images from '../images'

const Layout = ({ children, title }) => {
  const [isShowSideBar, setIsShowSideBar] = useState(false)

  const toggleSideBar = () => {
    setIsShowSideBar(!isShowSideBar)
  }
  const handleClose = (value) => {
    setIsShowSideBar(value)
  }

  useEffect(() => {
    console.log('showSidebar', isShowSideBar)
  }, [isShowSideBar])

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title || 'Hakka Finance'}</title>
        <meta property='og:image' content={ images.iconOgImage } />
      </Helmet>
      <Flex>
        <SideBar isShowSideBar={isShowSideBar} onCloseSideBar={handleClose}/>

        <Box
          width="100%"
          sx={styles.custom_scroll_bar}
        >
          <Header sx={styles.content_wrapper} toggleSidebar={toggleSideBar} />
          <Box
            sx={styles.content}
          >
            {children}
          </Box>
          <Footer />
        </Box>
      </Flex>
    </div>
  )
}

export default React.memo(Layout)
