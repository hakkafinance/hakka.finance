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
      info: 'By integrating lending protocols to leverage the excess supply while borrowing on the inadequate side, BlackHoleSwap can therefore process transactions far exceeding its existing liquidity. Compared to other AMMs, BlackHoleSwap provides nearly infinite liquidity with the lowest price slippage, maximizing capital utilization.',
      whitepaper: 'https://blackholeswap.com/documents/en.pdf',
      vist: 'https://blackholeswap.com/',
      id: 1
    },
    {
      icon: images.icon3FMutual,
      cardName: '3F Mutual',
      info: '3F Mutual employs a rainy day fund like mechanism that allows for one to hedge against MakerDAO collapse risk. It exists as neither an option nor a short position of ETH/DAI/MKR. The 3F Mutual rainy day fund-like design means it acts more like collective insurance.',
      whitepaper: 'https://3fmutual.com/whitepaper.pdf',
      vist: 'https://3fmutual.com/',
      id: 2
    },
    {
      icon: images.iconIgain,
      cardName: 'iGain',
      info: 'iGain is a decentralized financial instrument protocol that provides the options for investors to hedge/profit/speculate on certain targeting underlying assets with a synthetic, tokenized position.',
      whitepaper: 'https://hakkafinance.gitbook.io/igain/',
      vist: 'http://igain.hakka.finance/',
      id: 3
    },
    {
      icon: images.iconHakkaIntel,
      cardName: 'Hakka Intelligence',
      info: 'Hakka Intelligence is a prediction market platform with different mechanisms from general options. There will be no call and put options in this platform but requires the submission of predictions. The payoff is based on the accuracy of the prediction.',
      whitepaper: 'https://medium.com/hakkafinance/hakka-intelligence-handbook-d77a80f44ac6',
      vist: 'https://intelligence.hakka.finance/',
      id: 4
    },
    {
      icon: images.iconDefiHandbook,
      cardName: 'DeFi Handbook',
      info: 'DeFi Handbook make easier for you to dive into DeFi protocols',
      vist: 'https://defihandbook.cc/',
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
  const [dataInfo, setDataInfo] = useState({})
  const [selectedCard, setSelectedCard] = useState('BlackHoleSwap')
  const [selectedCardId, setSelectedCardId] = useState(1)
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
    setSelectedCard('')
  }
  // active selected Card
  const handleGetSelectedCard = (item) => () => {
    setSelectedCard(item.cardName)
    setSelectedCardId(item.id)
    setDataInfo(item)
  }
  const handleShowInfo = (value) => {
    setIsShowInfoProduct(value)
  }

  // render
  const renderCardProduct = () => {
    if (screenWidth < 1195) {
      return topArr.slice(0, 2).map((item) => {
        return (
          <Box key={item.cardName} onClick={handleGetSelectedCard(item)}>
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
          <Box key={item.cardName} onClick={handleGetSelectedCard(item)}>
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
          <Box key={item.cardName} onClick={handleGetSelectedCard(item)}>
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
          <Box key={item.cardName} onClick={handleGetSelectedCard(item)}>
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
        <Box key={item.cardName} onClick={handleGetSelectedCard(item)}>
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

        <Box>
          {selectedCardId < 3
            ? <InfoProduct
                onClose={handleCloseInfo}
                dataInfo={dataInfo}
                isShowInfoProduct={isShowInfoProduct}
              />
            : ''}
        </Box>

        <Box sx={styles.responsive_cards} mt="48px">
          {renderCardProductResponsive()}
        </Box>

        <Box>
          {selectedCardId > 2
            ? <InfoProduct
              onClose={handleCloseInfo}
              dataInfo={dataInfo}
              isShowInfoProduct={isShowInfoProduct}
            />
            : ''
          }
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
