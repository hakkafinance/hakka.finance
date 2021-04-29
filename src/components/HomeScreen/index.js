/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useState } from 'react'
import { Box, Flex, Heading } from 'rebass'
import Layout from 'src/containers/Layout'
import images from 'src/images'
import styles from './styles'
import CardInfo from './component/CardInfo'
import TotalValueLock from './component/TotalValueLock'
import CoinComponent from '../Common/CoinComponent'
import WhatHakka from './component/WhatHakka'
import TokenMetrics from './component/TokenMetrics'
import UtilityHakka from './component/UtilityHakka'
import HakkaTeam from './component/HakkaTeam'

const HomeScreen = (props) => {
  const coins = [
    {
      imageCoin: 'iconCoingecko',
      coinName: 'Coingecko',
      link: 'https://www.coingecko.com/en/coins/hakka-finance'
    },
    {
      imageCoin: 'iconCoinmarketcap',
      coinName: 'CoinMarketCap',
      link: 'https://coinmarketcap.com/en/currencies/hakka-finance/'
    }
  ]

  // const chainTokens = [
  //   {
  //     imageCoin: 'iconInch',
  //     coinName: '1inch'
  //   },
  //   {
  //     imageCoin: 'iconUniswap',
  //     coinName: 'Uniswap'
  //   },
  //   {
  //     imageCoin: 'iconBalancer',
  //     coinName: 'Balancer'
  //   }
  // ]

  const partnersImg = [
    {
      img: 'imageChainlink'
    },
    {
      img: 'image1inch'
    },
    {
      img: 'imageSynthetix'
    }
  ]

  const renderCoin = () => {
    return coins.map((item, i) => {
      return <CoinComponent key={item.coinName} item={item} i={i} />
    })
  }

  const renderPartnersImg = () => {
    return partnersImg.map((item) => {
      return (
            <Flex sx={styles.imgPartner_wrapper} key={item.img} >
              <img sx={styles.imgPartner} src={images[item.img]} alt="" />
            </Flex>
      )
    })
  }

  return (
    <>
      <Box>
        <Box sx={styles.homescreenContainer}>
          <Flex alignItems="center" sx={styles.homescreenSubTitle}>
            <img src={images.iconFlower} alt="" />
            Hakka Finance is <span sx={styles.spanLink}>hiring</span>. Come join
            us!
          </Flex>

          <Box sx={styles.homeHeading} >
            The Most Diversified Decentralized <br/> Finance Ecosystem
          </Box>

          <Box sx={styles.homeDescription} >
            <p>Hakka Finance is a set of Decentralized Derivatives & Original Financial Instruments,
            forming an all-inclusive ecosystem of tools that allow users to pursue financial sovereignty.</p>
          </Box>

          <Box
            // justifyContent="flex-start"
            // flexWrap="wrap"
            sx={styles.homeCardTop}
            mt="4"
          >
            <CardInfo />
          </Box>
        </Box>

        <Box sx={styles.homeTotalValue} >
          <TotalValueLock />
        </Box>

        <Box sx={styles.homescreenContainer}>
          <Box sx={styles.whatHakka} >
            <WhatHakka renderCoin={renderCoin} />
          </Box>

          <Box sx={styles.tokenMetrics} >
            <TokenMetrics
              // renderChainToken={renderChainToken}
            />
          </Box>

          <Box sx={styles.blur_img_blue_section}>
            <Box sx={styles.blur_img_blue}></Box>
          </Box>

          <Box sx={styles.blur_img_green_section_mobile}>
            <Box sx={styles.blur_img_green_mobile}></Box>
          </Box>

          <Box sx={styles.utilityHakka}>
            <UtilityHakka />
          </Box>

          <Box sx={styles.partners} >
            <Box sx={styles.partnersHead}>Partners &amp; Integrators</Box>

            <Flex sx={styles.img_partners_responsive}flexWrap="wrap">{renderPartnersImg()}</Flex>
          </Box>

          <Box sx={styles.blur_img_green_section}>
            <Box sx={styles.blur_img_green}></Box>
          </Box>

          <Box sx={styles.blur_img_blue_section_mobile}>
            <Box sx={styles.blur_img_blue_mobile}></Box>
          </Box>
          <Box ><HakkaTeam /></Box>
        </Box>
      </Box>
    </>
  )
}
export default HomeScreen
