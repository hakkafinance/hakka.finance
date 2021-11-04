/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import { jsx } from 'theme-ui';
import { Box, Text } from 'rebass';
import CardPorduct from './CardProduct';
import images from '../../images';
import styles from './styles';
import InfoProduct from './InfoProduct';

const ProductScreen = (props) => {
  const topArr = [
    {
      icon: images.iconBlackhole,
      cardName: 'BlackHoleSwap',
      info: 'By integrating lending protocols to leverage the excess supply while borrowing on the inadequate side, BlackHoleSwap can therefore process transactions far exceeding its existing liquidity. Compared to other AMMs, BlackHoleSwap provides nearly infinite liquidity with the lowest price slippage, maximizing capital utilization.',
      whitepaper: 'https://blackholeswap.com/documents/en.pdf',
      vist: 'https://blackholeswap.com/',
      id: 1,
      infoTag: ['DEX', 'Stablecoin'],
    },
    {
      icon: images.icon3FMutual,
      cardName: '3F Mutual',
      info: '3F Mutual employs a rainy day fund like mechanism that allows for one to hedge against MakerDAO collapse risk. It exists as neither an option nor a short position of ETH/DAI/MKR. The 3F Mutual rainy day fund-like design means it acts more like collective insurance.',
      whitepaper: 'https://3fmutual.com/whitepaper.pdf',
      vist: 'https://3fmutual.com/',
      id: 2,
      infoTag: ['Insurance', 'MutualFund'],

    },
    {
      icon: images.iconIgain,
      cardName: 'iGain',
      info: 'iGain is a decentralized financial instrument protocol that provides the options for investors to hedge/profit/speculate on certain targeting underlying assets with a synthetic, tokenized position.',
      whitepaper: 'https://hakkafinance.gitbook.io/igain/',
      vist: 'https://igain.finance/',
      id: 3,
      infoTag: ['Options', 'PredictionMarket'],
      visitButtonContent: 'Visit',
    },
    {
      icon: images.iconHakkaIntel,
      cardName: 'Hakka Intelligence',
      info: 'Hakka Intelligence is a prediction market platform with different mechanisms from general options. There will be no call and put options in this platform but requires the submission of predictions. The payoff is based on the accuracy of the prediction.',
      whitepaper: 'https://medium.com/hakkafinance/hakka-intelligence-handbook-d77a80f44ac6',
      vist: 'https://intelligence.hakka.finance/',
      id: 4,
      infoTag: ['PredictionMarket', 'PricePrediction'],
    },
    {
      icon: images.iconDefiHandbook,
      cardName: 'DeFi Handbook',
      info: 'DeFi Handbook make easier for you to dive into DeFi protocols.',
      vist: 'https://defihandbook.cc/',
      id: 5,
      infoTag: ['Dev', 'Tool'],
    },
    {
      icon: images.iconHarvester,
      cardName: 'Hakka Harvester',
      info: 'Hakka Harvester is a yield farming portal for those who are chasing farms with high-APY and show more willingness to hold $HAKKA instead of other tokens.',
      whitepaper: 'https://medium.com/hakkafinance/hakka-harvester-born-for-chad-hakka-farmers-83c37f0170b9',
      vist: 'https://harvesters.hakka.finance/pools',
      id: 6,
      infoTag: ['Aggregator', 'YieldFarming'],
    },
  ];

  const botArr = [
    {
      icon: images.iconCryptoStructure,
      cardName: 'Crypto Structured Fund',
      info: 'Crypto Structured Fund (CSF) is a decentralized financial instrument providing a "moderate risk with higher return" way to let conservative investors get involved in the growth of cryptocurrencies.',
      vist: 'https://csf-v2.netlify.app/',
      comingProductId: 1,
      infoTag: ['Futures', 'Fund'],
      visitButtonContent: 'Visit Alpha CSF',
    },
    {
      icon: images.iconTcdp,
      cardName: 'tCDP',
      info: 'tCDP is tokenized CDP (Collateral Debt Position) that is fungible and tradable on exchanges.',
      comingProductId: 2,
      infoTag: ['Collateral', 'Tool'],
    },
  ];

  const [screenWidth, setScreenWidth] = useState(null);
  const [isShowInfoProduct, setIsShowInfoProduct] = useState(false);
  const [dataInfo, setDataInfo] = useState();
  const [selectedInfoTag, setSelectedInfoTag] = useState([]);
  const [selectedCard, setSelectedCard] = useState('');
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedComingProductCardId, setSelectedComingProductCardId] = useState(null);
  const [closeInfo, setCloseInfo] = useState(true);

  const handleResize = () => {
    const width = window.innerWidth;
    setScreenWidth(width);
    console.log('window is resized', width);
  };
  // toggle Info
  const handleCloseInfo = (value) => {
    setIsShowInfoProduct(value);
    setCloseInfo(value);
    setSelectedCard('');
  };
  // active selected Card
  const handleGetSelectedCard = (item) => () => {
    console.log('item.infoTag', item.infoTag);
    setSelectedCard(item.cardName);
    setSelectedCardId(item.id);
    setSelectedComingProductCardId(item.comingProductId);
    setDataInfo(item);
    setSelectedInfoTag(item.infoTag);
  };
  const handleShowInfo = (value) => {
    setIsShowInfoProduct(value);
  };

  console.log('isShowInfoProduct', isShowInfoProduct);

  // render
  const renderCardProduct = () => {
    if (screenWidth < 1195) {
      return topArr.slice(0, 2).map((item) => (
        <Box key={item.cardName} onClick={handleGetSelectedCard(item)}>
          <CardPorduct
            isShowInfoProduct={closeInfo}
            selectedCard={selectedCard}
            onShowInfo={handleShowInfo}
            cardData={item}
          />
        </Box>
      ));
    }
    return topArr.slice(0, 3).map((item) => (
      <Box key={item.cardName} onClick={handleGetSelectedCard(item)}>
        <CardPorduct
          isShowInfoProduct={closeInfo}
          selectedCard={selectedCard}
          onShowInfo={handleShowInfo}
          cardData={item}
        />
      </Box>
    ));
  };
  const renderCardProductResponsive = () => {
    if (screenWidth < 1195) {
      return topArr.slice(2, 4).map((item) => (
        <Box key={item.cardName} onClick={handleGetSelectedCard(item)}>
          <CardPorduct
            selectedCard={selectedCard}
            onShowInfo={handleShowInfo}
            cardData={item}
          />
        </Box>
      ));
    }
    return topArr.slice(3, 6).map((item) => (
      <Box key={item.cardName} onClick={handleGetSelectedCard(item)}>
        <CardPorduct
          selectedCard={selectedCard}
          onShowInfo={handleShowInfo}
          cardData={item}
        />
      </Box>
    ));
  };

  const renderCardProductResponsive2 = () => {
    if (screenWidth < 1195) {
      return topArr.slice(4, 6).map((item) => (
        <Box key={item.cardName} onClick={handleGetSelectedCard(item)}>
          <CardPorduct
            selectedCard={selectedCard}
            onShowInfo={handleShowInfo}
            cardData={item}
          />
        </Box>
      ));
    }
  };

  const renderComingProduct = () => botArr.map((item) => (
    <Box key={item.cardName} onClick={handleGetSelectedCard(item)}>
      <CardPorduct
        selectedCard={selectedCard}
        onShowInfo={handleShowInfo}
        cardData={item}
      />
    </Box>
  ));

  // problem 1
  const width = typeof window !== 'undefined' ? window.innerWidth : '';
  useEffect(() => {
    setScreenWidth(width);
  }, []);

  return (
    <div>
      <Box sx={styles.productScreenContainer}>
        <Text sx={styles.heading}>Products</Text>
        <Box sx={styles.normal_text} mt="3">
          Diversified DeFi Derivatives and Instruments Powered by HAKKA
        </Box>

        <Box sx={styles.responsive_cards} mt="48px">
          {renderCardProduct()}
        </Box>

        <Box>
          {selectedCardId <= (screenWidth < 1195 ? 2 : 3)
            ? (
              <InfoProduct
                onClose={handleCloseInfo}
                dataInfo={dataInfo}
                isShowInfoProduct={isShowInfoProduct}
                infoTag={selectedInfoTag}
              />
            )
            : ''}
        </Box>

        <Box sx={styles.responsive_cards} mt="48px">
          {renderCardProductResponsive()}
        </Box>

        <Box>
          {selectedCardId > (screenWidth < 1195 ? 2 : 3) && selectedCardId < (screenWidth < 1195 ? 5 : 7)
            ? (
              <InfoProduct
                onClose={handleCloseInfo}
                dataInfo={dataInfo}
                isShowInfoProduct={isShowInfoProduct}
                infoTag={selectedInfoTag}
              />
            )
            : ''}
        </Box>

        <Box sx={styles.responsive_cards} mt="48px">
          {renderCardProductResponsive2()}
        </Box>

        <Box>
          {(screenWidth < 1195 && selectedCardId >= 5 && selectedCardId <= 6)
            ? (
              <InfoProduct
                onClose={handleCloseInfo}
                dataInfo={dataInfo}
                isShowInfoProduct={isShowInfoProduct}
                infoTag={selectedInfoTag}
              />
            )
            : ''}
        </Box>

        <Text sx={styles.sub_heading} mt="60px">
          Coming Soon
        </Text>

        <Box sx={styles.responsive_coming_cards} mt="36px">
          {renderComingProduct()}
        </Box>
        <Box sx={styles.coming_InfoProduct}>
          {selectedComingProductCardId <= 3
            ? (
              <InfoProduct
                onClose={handleCloseInfo}
                dataInfo={dataInfo}
                isShowInfoProduct={isShowInfoProduct}
                infoTag={selectedInfoTag}
              />
            )
            : ''}
        </Box>
      </Box>
    </div>
  );
};
export default ProductScreen;
