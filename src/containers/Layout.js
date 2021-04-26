/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Box, Flex } from 'rebass'
import SideBar from './SideBar'
import Header from './Header'
import Footer from './Footer'
import styles from './styles'
const Layout = ({ children, title }) => {
  const [isShowSideBar, setIsShowSideBar] = useState(true)
  const width = typeof window !== 'undefined' ? window.outerWidth : ''
  const [screenWidth, setScreenWidth] = useState(width)
  // const [isShowSideBar, setIsShowSideBar] = useState(screenWidth > 590)

  const toggleSideBar = () => {
    setIsShowSideBar(!isShowSideBar)
  }
  const handleClose = (value) => {
    setIsShowSideBar(value)
  }
  const handleResize = () => {
    const width = window.outerWidth
    setScreenWidth(width)
    console.log('window is resized', width)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    if (screenWidth < 590) {
      setIsShowSideBar(!isShowSideBar)
    }
    console.log('screenwidth', screenWidth)
  }, [screenWidth])

  useEffect(() => {
    console.log('showSidebar', isShowSideBar)
  }, [isShowSideBar])

  return (
    <div onresize={handleResize}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title || 'Hakka'}</title>
      </Helmet>
      <Flex>
        { isShowSideBar ? <SideBar onCloseSideBar={handleClose}/> : ''}
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
