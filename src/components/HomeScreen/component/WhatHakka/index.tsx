/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';
import { Box, Flex, Heading } from 'rebass';
import fetch from 'cross-fetch';
import styles from './styles';

function WhatHakka(props) {
  const [circulatingSupplyValue, setCirculatingSupplyValue] = useState(0);
  fetch('https://api.hakka.finance/').then((res) => res.text()).then((res) => {
    const value = Math.floor(res * 10000) / 10000;
    setCirculatingSupplyValue(`${value} HAKKA`);
  });

  return (
    <>
      <Box id="whatHakka" sx={styles.whatHakkaHeading}>What is HAKKA Token</Box>
      <Box sx={styles.whatHakkaText} mt="4">
        <p> HAKKA is the protocol token that empowers the community governance of Hakka Finance.</p>
      </Box>
      <Box sx={styles.circulatingSupplyText}>
        <span>Circulating Supply: </span>
        <span>{circulatingSupplyValue}</span>
      </Box>
      <Flex sx={styles.listCoinHakka} mt="20px" alignItems="center">
        {props.renderCoin()}
      </Flex>
    </>
  );
}

export default WhatHakka;
