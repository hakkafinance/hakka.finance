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
      icon: images.iconIgainIRS,
      cardName: 'iGain - Interest Rate Synth',
      info: 'iGain - Interest Rate Synth (IRS) is an interest rate derivative providing lenders and borrowers a platform to hedge against the risk of future changing interest rates. It empowers users to lock future interest rates, by purchasing Long and Short tokens.',
      whitepaper: 'https://hakkafinance.gitbook.io/igain/igain-universe/interest-rate-synth',
      vist: 'https://igain.finance/irs',
      id: 1,
      infoTag: ['Options', 'Derivatives'],
      visitButtonContent: 'Visit',
    },
    {
      icon: images.iconIgainIG,
      cardName: 'iGain - Impermanent Gain',
      info: 'iGain - Impermanent Gain (IG) can be regarded as the antimatter of impermanent loss. iGain IG consists of two tokens: Long token and Short token, which are empowered to long or short the IL. By holding the Long token, it will be able to offset the IL of holding a certain size of LP position.',
      whitepaper: 'https://hakkafinance.gitbook.io/igain/igain-universe/impermanent-loss',
      vist: 'https://igain.finance/ig',
      id: 2,
      infoTag: ['Options', 'Derivatives'],
      visitButtonContent: 'Visit',
    },
    {
      icon: images.iconIntelligence,
      cardName: 'Hakka Intelligence',
      info: 'Hakka Intelligence is a prediction market platform with different mechanisms from general options. There will be no call and put options in this platform but requires the submission of predictions. The payoff is based on the accuracy of the prediction.',
      whitepaper: 'https://medium.com/hakkafinance/hakka-intelligence-handbook-d77a80f44ac6',
      vist: 'https://intelligence.hakka.finance/',
      id: 3,
      infoTag: ['PredictionMarket', 'PricePrediction'],
    },
    {
      icon: images.icon3FMutual,
      cardName: '3F Mutual',
      info: '3F Mutual employs a rainy day fund like mechanism that allows for one to hedge against MakerDAO collapse risk. It exists as neither an option nor a short position of ETH/DAI/MKR. The 3F Mutual rainy day fund-like design means it acts more like collective insurance.',
      whitepaper: 'https://3fmutual.com/whitepaper.pdf',
      vist: 'https://3fmutual.com/',
      id: 4,
      infoTag: ['Insurance', 'MutualFund'],

    },
    {
      icon: images.iconBlackhole,
      cardName: 'BlackHoleSwap',
      info: 'By integrating lending protocols to leverage the excess supply while borrowing on the inadequate side, BlackHoleSwap can therefore process transactions far exceeding its existing liquidity. Compared to other AMMs, BlackHoleSwap provides nearly infinite liquidity with the lowest price slippage, maximizing capital utilization.',
      whitepaper: 'https://blackholeswap.com/documents/en.pdf',
      vist: 'https://blackholeswap.com/',
      id: 5,
      infoTag: ['DEX', 'Stablecoin'],
    },
    {
      icon: images.iconDefiHandbook,
      cardName: 'DeFi Handbook',
      info: 'DeFi Handbook make easier for you to dive into DeFi protocols.',
      vist: 'https://defihandbook.cc/',
      id: 6,
      infoTag: ['Dev', 'Tool'],
    },
    {
      icon: images.iconHarvester,
      cardName: 'Hakka Harvester',
      info: 'Hakka Harvester is a yield farming portal for those who are chasing farms with high-APY and show more willingness to hold $HAKKA instead of other tokens.',
      whitepaper: 'https://medium.com/hakkafinance/hakka-harvester-born-for-chad-hakka-farmers-83c37f0170b9',
      vist: 'https://harvesters.hakka.finance/pools',
      id: 7,
      infoTag: ['Aggregator', 'YieldFarming'],
    },
    {
      icon: images.iconShitcoinmon,
      cardName: 'Shitcoinmon',
      info: 'The crappier your token, the stronger your Shitcoinmon! \nComing Soon',
      // TODO: Shitcoinmon website is not ready
      vist: '',
      id: 8,
      infoTag: ['Shitcoin', 'Gaming'],
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
    return topArr.slice(6, 9).map((item) => (
      <Box key={item.cardName} onClick={handleGetSelectedCard(item)}>
        <CardPorduct
          selectedCard={selectedCard}
          onShowInfo={handleShowInfo}
          cardData={item}
        />
      </Box>
    ));
  };

  const renderCardProductResponsive3 = () => {
    if (screenWidth < 1195) {
      return topArr.slice(6, 8).map((item) => (
        <Box key={item.cardName} onClick={handleGetSelectedCard(item)}>
          <CardPorduct
            selectedCard={selectedCard}
            onShowInfo={handleShowInfo}
            cardData={item}
          />
        </Box>
      ));
    }
    return topArr.slice(9, 12).map((item) => (
      <Box key={item.cardName} onClick={handleGetSelectedCard(item)}>
        <CardPorduct
          selectedCard={selectedCard}
          onShowInfo={handleShowInfo}
          cardData={item}
        />
      </Box>
    ));
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
          {selectedCardId > (screenWidth < 1195 ? 4 : 6) && selectedCardId < (screenWidth < 1195 ? 7 : 9)
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
          {renderCardProductResponsive3()}
        </Box>

        <Box>
          {screenWidth < 1195 && selectedCardId > 6
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
