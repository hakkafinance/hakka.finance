/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { jsx } from 'theme-ui'
import { Box, Text } from 'rebass'
import Layout from 'src/containers/Layout'
import CardPorduct from './CardProduct'
import images from 'src/images'
import styles from './styles'
import InfoProduct from './InfoProduct'

const ProductScreen = props => {
  const topArr = [
    {
      icon: images.iconBlackhole,
      cardName: 'BlackHoleSwap'
    },
    {
      icon: images.icon3FMutual,
      cardName: '3F Mutual'
    },
    {
      icon: images.iconIgain,
      cardName: 'iGain'
    },
    {
      icon: images.iconHakkaIntel,
      cardName: 'Hakka Intelligence'
    },
    {
      icon: images.iconDefiHandbook,
      cardName: 'DeFi Handbook'
    }

  ]

  const botArr = [
    {
      icon: images.iconCryptoStructure,
      cardName: 'Crypto Structured Fund'
    },
    {
      icon: images.iconTcdp,
      cardName: 'tCDP'
    }
  ]

  const [screenWidth, setScreenWidth] = useState()

  const handleResize = () => {
    const width = window.outerWidth
    setScreenWidth(width)
    console.log('window is resized', width)
  }
  const renderCardProduct = () => {
    if (screenWidth < 1195) {
      return topArr.slice(0, 2).map(item => {
        return (
                  <CardPorduct
                    key={item.cardName}
                    icon={item.icon}
                    cardName={item.cardName}
                  />
        )
      })
    } else {
      return topArr.slice(0, 3).map(item => {
        return (
                    <CardPorduct
                      key={item.cardName}
                      icon={item.icon}
                      cardName={item.cardName}
                    />
        )
      })
    }
  }
  const renderCardProductResponsive = () => {
    if (screenWidth < 1195) {
      return topArr.slice(2, 6).map(item => {
        return (
                  <CardPorduct
                    key={item.cardName}
                    icon={item.icon}
                    cardName={item.cardName}
                  />
        )
      })
    } else {
      return topArr.slice(3, 6).map(item => {
        return (
                  <CardPorduct
                    key={item.cardName}
                    icon={item.icon}
                    cardName={item.cardName}
                  />
        )
      })
    }
  }
  const renderComingProduct = () => {
    return botArr.map(item => {
      return (
                <CardPorduct
                  key={item.cardName}
                  icon={item.icon}
                  cardName={item.cardName}
                />
      )
    })
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    console.log('screenwidth', screenWidth)
  }, [screenWidth])

  return (
    <div onresize={handleResize}>
      <Box sx={styles.productScreenContainer}>
        <Text sx={styles.heading}>
          Products
        </Text>
        <Box sx={styles.normal_text} mt="3">
          Diversified DeFi Derivatives and Instruments Powered by HAKKA
        </Box>

        <Box
          sx={styles.responsive_cards}
          mt="48px"
        >
          {renderCardProduct()}
        </Box>
        <Box>
          <InfoProduct/>
        </Box>

        <Box
          sx={styles.responsive_cards}
          mt="48px"
        >
          {renderCardProductResponsive()}
        </Box>

        <Text sx={styles.sub_heading} mt="60px">
          Coming Soon
        </Text>

        <Box
          sx={styles.responsive_coming_cards}
          mt="36px"
        >
          {renderComingProduct()}
        </Box>
      </Box>

    </div>
  )
}
export default ProductScreen
