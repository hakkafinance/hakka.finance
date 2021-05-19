/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text } from 'rebass'
import styles from './styles'
import { upperCaseFirstLetter } from 'src/common/functions'

const SideBarItem = (props, { location, data }) => {
  const { icon, text, path, subIcon, href } = props
  const [selectedNavPath, setSelectedNavPath] = useState();
  const isBrowser = typeof window !== 'undefined'
  const currentPath = isBrowser ? window.location.pathname.replace(/\//g, "") : ''


  useEffect(() => {
    setSelectedNavPath(currentPath)
  }, [])

  return (
    <Box onClick={() => { if (props.href) window.open(props.href, '_blank').focus() }} sx={selectedNavPath === path ? styles.sidebar_item_active : styles.sidebar_item}>
      <Flex sx={{ width: '100%' }} justifyContent="space-between">
        <Flex>
          <img src={icon} alt />
          <Text sx={styles.sidebar_text} className="sidebar-text" ml='12px'>
            {upperCaseFirstLetter(text)}
          </Text>
        </Flex>
        <img src={subIcon} alt />
      </Flex>
    </Box>
  )
}
export default SideBarItem
