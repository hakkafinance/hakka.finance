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
    href: 'https://snapshot.org/#/hakka.eth',
    // subIcon: images.iconSnapshot

  },
  {
    name: 'forum',
    icon: images.iconForum,
    href: 'https://forum.hakka.finance/',
    path: 'forum',
    // subIcon: images.iconLinkSmall,
  },
  {
    name: 'rewards',
    icon: images.iconReward,
    href: 'https://rewards.hakka.finance/',
    path: 'rewards'

  },
  {
    name: 'vesting',
    icon: images.iconVesting,
    href: 'https://vesting.hakka.finance/',
    path: 'vesting'

  },
  // {
  //   name: 'Guild Bank',
  //   icon: images.iconVault,
  //   href: 'https://burner.hakka.finance/',
  //   path: 'vault'

  // },
]

function SideBar (props) {
  const { onCloseSideBar, isShowSideBar } = props
  const [selectedNav, setSelectedNav] = useState('')

  // const href = typeof window !== 'undefined' ? window.location.pathname.replace(/\//g, "") : ''
  // useEffect(() => {
  //   console.log('useEffect is working')
  //   console.log('href', href)
  //   setSelectedNav(href)
  // }, [])

  const onSelectNavItem = (path) => () => {  
    navigate(`/${path}`)
    setSelectedNav(path)

    console.log(path)
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
            href={it.href}
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
            <Box sx={styles.custom_padding}>
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
                  <Flex onClick={() => { window.open('https://medium.com/hakkafinance', '_blank').focus() }} alignItems="center">
                    <img sx={styles.left_icon} src={images.iconMedium} alt />
                    <Box sx={styles.bold_text} ml="2">Medium</Box>
                  </Flex>
                  <Flex onClick={() => { window.open('https://medium.com/hakkafinance', '_blank').focus() }}>
                  <img src={images.iconLinkSmall} />
                  </Flex>
                </Box>
            </Box>
          </Box>

          <Box>
            <Box sx={styles.hl} mt="2" pr="0"></Box>
            <Box p="12px">
              <MyButton click={() => { window.open('https://hakka-finance.gitbook.io/hakka-wiki/', '_blank').focus() }}>
                <Box sx={{ fontFamily: 'system-ui', fontWeight: '700' }}>Learn More</Box>
              </MyButton>
            </Box>
            <Box sx={styles.bold_text_link} mb="12px" p="2" textAlign="center">
              or{' '}
              <Link sx={styles.bold_text_link} href="mailto:admin@hakka.finance">
                contact us
              </Link>
            </Box>
          </Box>
        </Flex>
      </Box>
  )
};
export default React.memo(SideBar)
