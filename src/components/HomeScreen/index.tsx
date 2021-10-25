/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { Box, Flex } from 'rebass';
import images from '../../images';
import styles from './styles';
import CardInfo from './component/CardInfo';
import TotalValueLock from './component/TotalValueLock';
import { CoinComponent } from '../Common';
import WhatHakka from './component/WhatHakka';
import TokenMetrics from './component/TokenMetrics';
import UtilityHakka from './component/UtilityHakka';

const HomeScreen = (props) => {
  const coins = [
    {
      imageCoin: 'iconCoingecko',
      coinName: 'Coingecko',
      link: 'https://www.coingecko.com/en/coins/hakka-finance',
    },
    {
      imageCoin: 'iconCoinmarketcap',
      coinName: 'CoinMarketCap',
      link: 'https://coinmarketcap.com/en/currencies/hakka-finance/',
    },
  ];

  const partnersImg = [
    {
      img: 'imageChainlink',
    },
    {
      img: 'image1inch',
    },
    {
      img: 'imageSynthetix',
    },
    {
      img: 'imageCompound',
    },
    {
      img: 'imageMaker',
    },
    {
      img: 'imageKyberNetwork',
    },
    {
      img: 'imageImtoken',
    },
    {
      img: 'imageTrustWallet',
    },
    {
      img: 'imageDelta',
    },
  ];

  const renderCoin = () => coins.map((item, i) => <CoinComponent key={item.coinName} item={item} i={i} />);

  const renderPartnersImg = () => partnersImg.map((item) => (
    <Flex sx={styles.imgPartner_wrapper} key={item.img}>
      {item.img === 'imageDelta'
        ? <img sx={styles.imgPartnerBiggerIcon} src={images[item.img]} alt="" />
        : <img sx={styles.imgPartner} src={images[item.img]} alt="" />}
    </Flex>
  ));

  return (
    <>
      <Box>
        <Box sx={styles.homescreenContainer}>
          <Flex alignItems="center" sx={styles.homescreenSubTitle} onClick={() => { window.open('https://www.cakeresume.com/companies/pelith/jobs', '_blank').focus(); }}>
            <img src={images.iconFlower} alt="" />
            <span>
              Hakka Finance is
              {' '}
              <span sx={{ textDecoration: 'underline' }}>hiring</span>
              . Come join
              us!
            </span>
          </Flex>

          <Box sx={styles.homeHeading}>
            The Most Diversified Decentralized
            {' '}
            <br />
            {' '}
            Finance Ecosystem
          </Box>

          <Box sx={styles.homeDescription}>
            <p>
              Hakka Finance is a set of decentralized derivatives & original financial instruments,
              forming an all-inclusive ecosystem of tools that allow users to pursue financial sovereignty.
            </p>
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

        <Box sx={styles.homeTotalValue}>
          <TotalValueLock />
        </Box>

        <Box sx={styles.homescreenContainer}>
          <Box sx={styles.whatHakka}>
            <WhatHakka renderCoin={renderCoin} />
          </Box>

          <Box sx={styles.tokenMetrics}>
            <TokenMetrics />
          </Box>

          <Box sx={styles.blur_img_blue_section}>
            <Box sx={styles.blur_img_blue} />
          </Box>

          <Box sx={styles.blur_img_green_section_mobile}>
            <img sx={styles.blur_img_green_mobile} src={images.blurBall} alt="" />
          </Box>

          <Box sx={styles.utilityHakka}>
            <UtilityHakka />
          </Box>

          <Box sx={styles.partners}>
            <Box sx={styles.partnersHead}>Partners &amp; Integrators</Box>

            <Flex sx={styles.img_partners_responsive} flexWrap="wrap">{renderPartnersImg()}</Flex>
          </Box>

          <Box sx={styles.blur_img_green_section}>
            <img sx={styles.blur_img_green} src={images.blurBall} alt="" />
          </Box>

          <Box sx={styles.blur_img_blue_section_mobile}>
            <Box sx={styles.blur_img_blue_mobile} />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default HomeScreen;
