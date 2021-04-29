/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Button, Flex, Link, Text } from 'rebass'
import styles from './styles'
import images from 'src/images'
import SideBarItem from './SideBarItem'
import MyButton from 'src/components/Common/MyButton'
import { navigate } from 'gatsby'
import { get } from 'lodash'

const topSideBarItems = [
  {
    name: 'home',
    icon: images.iconHome,
    path: ''
  },
  {
    name: 'products',
    icon: images.iconProduct,
    path: 'products'

  }
]

const botSideBarItems = [
  {
    name: 'governance',
    icon: images.iconGovernance,
    path: 'governance',
    subIcon: images.iconSnapshot

  },
  {
    name: 'rewards',
    icon: images.iconReward,
    path: 'rewards'

  },
  {
    name: 'vesting',
    icon: images.iconVesting,
    path: 'vesting'

  },
  {
    name: 'vault',
    icon: images.iconVault,
    path: 'vault'

  }
]

function SideBar (props) {
  const { onCloseSideBar, isShowSideBar } = props
  const [selectedNav, setSelectedNav] = useState('')

  const onSelectNavItem = (path) => () => {
    navigate(`/${path}`)
    setSelectedNav(path)

    // console.log(path);
  }
  const handleCloseSideBar = () => {
    onCloseSideBar(false)
  }
  const renderTopSideBar = () => {
    return topSideBarItems.map((it, idx) => {
      return (
        <Box key={it.name} onClick={onSelectNavItem(it.path)}>
              <SideBarItem
                selectedNav={selectedNav}
                icon={it.icon}
                text={it.name}
                path={it.path}
              />
            </Box>
      )
    })
  }

  const renderBotSideBar = () => {
    return botSideBarItems.map((it, idx) => {
      return (
        <Box key={it.name} >
          <SideBarItem
            selectedNav={selectedNav}
            icon={it.icon}
            text={it.name}
            path={it.path}
            subIcon={get(it, 'subIcon')}
          />
        </Box>
      )
    })
  }
  return (
      <Box sx={ isShowSideBar ? styles.sidebar_responsive_show : styles.sidebar_responsive} >
        <Flex flexDirection="column" justifyContent="space-between" sx={styles.sidebar}>
          <Box>
            <Box sx={styles.custom_header_padding}>
              <Box sx={styles.sidebar_header}>
                <img src={images.hakkaLogo} />
                <img onClick={handleCloseSideBar} sx={styles.sidebar_closeBtn} src={images.iconDeleteRound}/>
              </Box>
              <Box mt="3">{renderTopSideBar()}</Box>
            </Box>

            <Box sx={styles.hl} ml="25px" mt="2" pr="0"></Box>

            <Box sx={styles.custom_padding}>
              <Box sx={styles.sidebar_subText} pl="3">DAO</Box>
              <Box mt="2">{renderBotSideBar()}</Box>
            </Box>

            <Box sx={styles.hl} ml="25px" mt="2" pr="0"></Box>

            <Box sx={styles.custom_padding}>
              <Box sx={styles.sidebar_subText} pl="3">News</Box>

                <Box sx={styles.medium_content}>
                  <Flex alignItems="center">
                    <img sx={styles.left_icon} src={images.iconMedium} alt />
                    <Box sx={styles.bold_text} ml="2">Medium</Box>
                  </Flex>
                  <Flex>
                    <img src={images.iconLinkSmall} />
                  </Flex>
                </Box>
            </Box>
          </Box>

          <Box>
            <Box sx={styles.hl} mt="2" pr="0"></Box>
            <Box p="12px">
              <MyButton>
                <Box sx={{ fontFamily: 'system-ui', fontWeight: '700' }}>Learn More</Box>
              </MyButton>
            </Box>
            <Box sx={styles.bold_text_link} mb="12px" p="2" textAlign="center">
              or{' '}
              <Link sx={styles.bold_text_link} href="">
                contact us
              </Link>
            </Box>
          </Box>
        </Flex>
      </Box>
  )
};
export default React.memo(SideBar)
