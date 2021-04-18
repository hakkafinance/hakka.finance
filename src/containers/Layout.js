/** @jsx jsx */
import { ThemeProvider, jsx } from 'theme-ui'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { theme } from 'src/theme'
import { Box, Flex } from 'rebass'
import SideBar from './SideBar'
import Header from './Header'
import HomeScreen from 'src/components/HomeScreen'
import Footer from './Footer'
import styles from './styles'
const Layout = ({ children, title }) => {
  const [isShowSideBar, setIsShowSideBar] = useState(false)

  const toggleSideBar = () => {
    setIsShowSideBar(!isShowSideBar)
  }
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title || 'Hakka'}</title>
      </Helmet>
      <Flex>
        <SideBar toggleSideBar={toggleSideBar} isShowSideBar={isShowSideBar} />
        <Box
          width="100%"
          sx={styles.custom_scroll_bar}
        >
          <Header sx={styles.content_wrapper} toggleSideBar={toggleSideBar} />
          <Box
            sx={styles.content}
          >
            {children}
          </Box>
          <Footer />
        </Box>
      </Flex>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string
}

export default React.memo(Layout)
