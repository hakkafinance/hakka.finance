/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';
import {
  Box, Flex, Link,
} from 'rebass';
import images from '../../../../images';
import { CoinComponent } from '../../../../components/Common';
import styles from './styles';
import AddToMetamaskBtn from '../../../AddToMetamaskBtn';

const TokenMetricContent = (props) => {
  const { tokenMetrics } = props;
  return (
    <Box sx={styles.tokenMetricsInfoChain} ml="2">
      <Box sx={styles.tokenMetricsSubHead}>Token Metrics</Box>

      <Box sx={styles.tokenMetricsInfoContainer} mt="20px">
        <Box sx={styles.tokenMetricsInfo}>
          <Flex sx={{ alignItems: 'center' }}>
            <span sx={styles.info}>{`NAME: ${tokenMetrics.name}`}</span>
            <AddToMetamaskBtn address={tokenMetrics.address} />
          </Flex>
        </Box>
        <Box sx={styles.tokenMetricsInfo} mt="1">
          TYPE:
          {' '}
          <span sx={styles.info}>{tokenMetrics.type}</span>
        </Box>
        <Box sx={styles.tokenMetricsInfo} mt="2">
          CONTRACT ADDRESS:
          {' '}
          <br />
          {' '}

          <Flex sx={styles.tokenMetricsInfoAddress} alignItems="center">
            <Link variant="nav" href={tokenMetrics.addressLink} target="_blank" sx={styles.info_link}>
              {tokenMetrics.address}
              <img
                sx={styles.iconScan}
                className="icon-scan"
                src={tokenMetrics.addressIcon}
                alt=""
              />
            </Link>

          </Flex>

        </Box>
      </Box>
      { tokenMetrics.id !== 'polygon' &&
      <Box sx={styles.tokenMetricsChainList} mt="20px">
        Get HAKKA Token on
        {' '}
        {tokenMetrics.shortName}
        :
      </Box>}
      { tokenMetrics.id === 'bsc'
        ? (
          <Flex sx={styles.token_metric_responsive} mt="2">
            <Flex>
              <Box className="left-bot-token">
                <CoinComponent
                  item={{ imageCoin: 'iconPancakeSwap', coinName: 'PancakeSwap', link: 'https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x1D1eb8E8293222e1a29d2C0E4cE6C0Acfd89AaaC' }}
                />
              </Box>
              <Box className="right-bot-token">
                <CoinComponent
                  item={{ imageCoin: 'iconInch', coinName: '1inch', link: 'https://app.1inch.io/#/56/swap/BNB/HAKKA' }}
                />
              </Box>
            </Flex>
          </Flex>
        ) : tokenMetrics.id === 'polygon'
        ? <></> : (
          <Flex sx={styles.token_metric_responsive} mt="2">
            <Box>
              <CoinComponent
                item={{ imageCoin: 'iconInch', coinName: '1inch', link: 'https://app.1inch.io/#/1/swap/ETH/HAKKA' }}
              />
            </Box>
            <Flex>
              <Box className="left-bot-token">
                <CoinComponent
                  item={{ imageCoin: 'iconUniswap', coinName: 'Uniswap', link: 'https://app.uniswap.org/#/swap?outputCurrency=0x0e29e5abbb5fd88e28b2d355774e73bd47de3bcd' }}
                />
              </Box>
              <Box className="right-bot-token">
                <CoinComponent
                  item={{ imageCoin: 'iconBalancer', coinName: 'Balancer', link: 'https://app.balancer.fi/#/trade/ether/0x0E29e5AbbB5FD88e28b2d355774e73BD47dE3bcd' }}
                />
              </Box>
            </Flex>
          </Flex>
        )}
    </Box>
  );
};

function TokenMetrics(props) {
  const chains = [
    {
      id: 'eth',
      imgChain: 'iconEthereum',
      chainName: 'Ethereum Mainnet',
      imgBg: '#f2f2f2',
    },
    {
      id: 'bsc',
      imgChain: 'iconBinanceGold',
      chainName: 'Binance Smart Chain',
      imgBg: '#fcf7de',
    },
    {
      id: 'polygon',
      imgChain: 'iconPolygon',
      chainName: 'Polygon Netwrok',
      imgBg: '#f2ebff',
    },
  ];

  const tokenMetrics = [
    {
      id: 'eth',
      shortName: 'Ethereum',
      name: 'Hakka Finance (HAKKA)',
      type: 'ERC-20',
      address: '0x0E29e5AbbB5FD88e28b2d355774e73BD47dE3bcd',
      addressLink: 'https://etherscan.io/token/0x0E29e5AbbB5FD88e28b2d355774e73BD47dE3bcd',
      addressIcon: images.iconEtherscan,
    },
    {
      id: 'bsc',
      shortName: 'BSC',
      name: ' Hakka Finance on xDai on BSC (HAKKA)',
      type: 'BEP-20',
      address: '0x1D1eb8E8293222e1a29d2C0E4cE6C0Acfd89AaaC',
      addressLink: 'https://bscscan.com/token/0x1D1eb8E8293222e1a29d2C0E4cE6C0Acfd89AaaC',
      addressIcon: images.iconBSCScan,
    },
    {
      id: 'polygon',
      shortName: 'Polygon',
      name: ' Hakka Finance (HAKKA)',
      type: 'ERC-20',
      address: '0x978338A9d2d0aa2fF388d3dc98b9bF25bfF5efB4',
      addressLink: 'https://polygonscan.com/token/0x978338A9d2d0aa2fF388d3dc98b9bF25bfF5efB4',
      addressIcon: images.iconPolygon,
    },
  ];

  const [selectedCoin, setSelectedCoin] = useState('eth');
  const [selectedTokenMetric, setSelectedTokenMetric] = useState(tokenMetrics[0]);

  // functions
  const handleSelectCoin = (value) => () => {
    setSelectedCoin(value);
    const obj = tokenMetrics.find((it) => it.id === value);
    setSelectedTokenMetric(obj);
  };
  // render
  const renderChain = () => chains.map((chain, i) => (
    <Flex
      sx={selectedCoin === chain.id ? styles.chainContent_active : styles.chainContent}
      className="border-top-active"
      alignItems="center"
      justifyContent="space-between"
      key={chain.id}
          // mb="4"
      onClick={handleSelectCoin(chain.id)}
    >
      <Flex className="chain-left-content" alignItems="center">
        <Box sx={{
          backgroundColor: chain.imgBg, width: '40px', height: '40px', borderRadius: '8px',
        }}
        >
          <img sx={selectedCoin === chain.id ? styles.imgChain : styles.imgChain_gray} src={images[chain.imgChain]} alt="" />
        </Box>
        <Box sx={selectedCoin === chain.id ? styles.chainName_active : styles.chainName} className="chain-text">
          {chain.chainName}
        </Box>
      </Flex>
      <Box className="icon-right" ml="3">
        <img sx={styles.iconRight} src={selectedCoin === chain.id ? images.iconRight : images.iconRightGrey} alt="" />
        {' '}
      </Box>
    </Flex>
  ));
  return (
    <>

      <Box sx={styles.tokenMetrics_responsive}>

        <Box sx={styles.tokenMetricsChain}>{renderChain()}</Box>
        <TokenMetricContent tokenMetrics={selectedTokenMetric} />
      </Box>
    </>
  );
}

export default TokenMetrics;
