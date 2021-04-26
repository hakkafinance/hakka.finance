/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { jsx } from 'theme-ui'
import { Box, Text } from 'rebass'
import Layout from 'src/containers/Layout'
import CardPorduct from './CardProduct'
import images from 'src/images'
import styles from './styles'
import InfoProduct from './InfoProduct'

const ProductScreen = (props) => {
  const topArr = [
    {
      icon: images.iconBlackhole,
      cardName: 'BlackHoleSwap',
      id: 1
    },
    {
      icon: images.icon3FMutual,
      cardName: '3F Mutual',
      id: 2
    },
    {
      icon: images.iconIgain,
      cardName: 'iGain',
      id: 3
    },
    {
      icon: images.iconHakkaIntel,
      cardName: 'Hakka Intelligence',
      id: 4
    },
    {
      icon: images.iconDefiHandbook,
      cardName: 'DeFi Handbook',
      id: 5
    }
  ]

  const botArr = [
    {
      icon: images.iconCryptoStructure,
      cardName: `Crypto
      Structured Fund`
    },
    {
      icon: images.iconTcdp,
      cardName: 'tCDP'
    }
  ]
  const width = typeof window !== 'undefined' ? window.outerWidth : ''
  const [screenWidth, setScreenWidth] = useState(width)
  const [isShowInfoProduct, setIsShowInfoProduct] = useState(true)
  // const [dataInfo, setDataInfo] = useState('BlackHoleSwap')
  const [selectedCard, setSelectedCard] = useState('BlackHoleSwap')
  const [closeInfo, setCloseInfo] = useState(true)
  const handleResize = () => {
    const width = window.outerWidth
    setScreenWidth(width)
    console.log('window is resized', width)
  }
  // toggle Info
  const handleCloseInfo = (value) => {
    setIsShowInfoProduct(value)
    setCloseInfo(value)
  }
  const handleShowInfo = (value) => {
    setIsShowInfoProduct(value)
  }
  // active selected Card
  const handleGetSelectedCard = (value) => () => {
    setSelectedCard(value)
  }

  // render
  const renderCardProduct = () => {
    if (screenWidth < 1195) {
      return topArr.slice(0, 2).map((item) => {
        return (
          <Box key={item.cardName} onClick={handleGetSelectedCard(item.cardName)}>
            <CardPorduct
              isShowInfoProduct = {closeInfo}
              selectedCard={selectedCard}
              onShowInfo={handleShowInfo}
              cardData={item}
            />
          </Box>
        )
      })
    } else {
      return topArr.slice(0, 3).map((item) => {
        return (
          <Box key={item.cardName} onClick={handleGetSelectedCard(item.cardName)}>
            <CardPorduct
              isShowInfoProduct = {closeInfo}
              selectedCard={selectedCard}
              onShowInfo={handleShowInfo}
              cardData={item}
            />
          </Box>
        )
      })
    }
  }
  const renderCardProductResponsive = () => {
    if (screenWidth < 1195) {
      return topArr.slice(2, 6).map((item) => {
        return (
          <Box key={item.cardName} onClick={handleGetSelectedCard(item.cardName)}>
            <CardPorduct
              selectedCard={selectedCard}
              onShowInfo={handleShowInfo}
              cardData={item}
            />
          </Box>
        )
      })
    } else {
      return topArr.slice(3, 6).map((item) => {
        return (
          <Box key={item.cardName} onClick={handleGetSelectedCard(item.cardName)}>
            <CardPorduct
              selectedCard={selectedCard}
              onShowInfo={handleShowInfo}
              cardData={item}
            />
          </Box>
        )
      })
    }
  }
  const renderComingProduct = () => {
    return botArr.map((item) => {
      return (
        <Box key={item.cardName} onClick={handleGetSelectedCard(item.cardName)}>
            <CardPorduct
              selectedCard={selectedCard}
              onShowInfo={handleShowInfo}
              cardData={item}
            />
          </Box>
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
        <Text sx={styles.heading}>Products</Text>
        <Box sx={styles.normal_text} mt="3">
          Diversified DeFi Derivatives and Instruments Powered by HAKKA
        </Box>

        <Box sx={styles.responsive_cards} mt="48px">
          {renderCardProduct()}
        </Box>

        <Box>{isShowInfoProduct ? <InfoProduct onClose={handleCloseInfo} dataInfo={selectedCard}/> : ''}</Box>

        <Box sx={styles.responsive_cards} mt="48px">
          {renderCardProductResponsive()}
        </Box>

        <Text sx={styles.sub_heading} mt="60px">
          Coming Soon
        </Text>

        <Box sx={styles.responsive_coming_cards} mt="36px">
          {renderComingProduct()}
        </Box>
      </Box>
    </div>
  )
}
export default ProductScreen
