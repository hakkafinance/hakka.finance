/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text } from 'rebass'
import styles from './styles'
import { upperCaseFirstLetter } from 'src/common/functions'

const SideBarItem = (props, { location, data }) => {
  const { icon, text, path } = props
  //   console.log('selectedNav', selectedNav)

  const isBrowser = typeof window !== 'undefined'
  const currentPath = isBrowser ? window.location.href.split('/').reverse()[0] : undefined
  console.log(currentPath)

  return (
        <Box sx={currentPath === path ? styles.sidebar_item_active : styles.sidebar_item}>

            <Flex>
                <img src={icon} alt/>
            </Flex>

            <Text sx={styles.sidebar_text} className="sidebar-text" ml='12px'>
                {upperCaseFirstLetter(text)}
            </Text>
        </Box>
  )
}
export default SideBarItem
