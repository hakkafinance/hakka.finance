/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';
import { Box, Flex } from 'rebass';
import images from '../../images';
import styles from './styles';
import CardInfo from './component/CardInfo';
import TotalValueLock from './component/TotalValueLock';
import { CoinComponent } from '../Common';
import WhatHakka from './component/WhatHakka';
import TokenMetrics from './component/TokenMetrics';
import UtilityHakka from './component/UtilityHakka';
import SecuritySection from './component/Security';

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
    {
      img: 'imageHashCloak',
    },
    {
      img: 'imageBnbChain',
    },
    {
      img: 'imagePolygon',
    },
    {
      img: 'imageAave',
    },
    {
      img: 'imageEns',
    },
    {
      img: 'imageGelato',
    },
    {
      img: 'imageImmunefiGray',
    },
    {
      img: 'imageProjectGalaxy',
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

  const [subscribeEmailAddress, setSubscribeEmailAddress] = useState('');

  return (
    <>
      <Box>
        <Box sx={styles.homescreenContainer}>
          <Box sx={{ display: 'inline-block' }} > 
            <Flex  alignItems="center" sx={styles.homescreenSubTitle} onClick={() => { window.open('https://pelith.notion.site/pelith/Hakka-Finance-Pelith-is-hiring-27bfdd1991bc46019f69f5c7926b69fb', '_blank').focus(); }}>
              <img src={images.iconFlower} alt="" />
              <span>
                Hakka Finance is&nbsp;
                <span sx={{ textDecoration: 'underline' }}>hiring</span>
                . Come join
                us!
              </span>
            </Flex>
          </Box>

          <Box sx={styles.homeHeading}>
            The Most Diversified Decentralized
            <br />
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

          <Box sx={styles.securitySection}>
            <SecuritySection />
          </Box>

          <Box sx={styles.partners}>
            <Box sx={styles.partnersHead}>Partners &amp; Integrators</Box>

            <Flex sx={styles.img_partners_responsive} flexWrap="wrap">{renderPartnersImg()}</Flex>
          </Box>

          <Box>
            <h3 sx={styles.subscribeTitle}>Sign Up To The Hakka Newsletter</h3>
            <p sx={styles.subscribeSubtitle}>Don't Miss Out On The Future of DeFi & Get $HAKKA Rewards Before Everyone</p>
            {/* Begin Mailchimp Signup Form */}
            <form action="https://finance.us2.list-manage.com/subscribe/post?u=95f3e0652dfcf25540fb560b5&amp;id=944615c8c1" method="post" name="mc-embedded-subscribe-form" target="_blank" noValidate>
              <div sx={styles.subscribeInputArea}>
            	  <input 
                  value={subscribeEmailAddress}
                  onChange={(event) => setSubscribeEmailAddress(event.target.value)}
                  type="email" 
                  name="EMAIL" 
                  placeholder="Your Email" 
                  required 
                  sx={styles.emailInput}
                />
                {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
                <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                  <input type="text" name="b_95f3e0652dfcf25540fb560b5_944615c8c1" tabIndex={-1} value="" />
                </div>
                {/* ----------end---------- */}
                <button sx={styles.subscribeButton} type="submit" value="Subscribe">Subscribe</button>
              </div>
            </form>
            {/* End mc_embed_signup */}
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
