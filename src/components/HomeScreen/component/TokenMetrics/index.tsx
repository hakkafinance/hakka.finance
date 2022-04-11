/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Box, Flex, Link,
} from 'rebass';
import images from '../../../../images';
import { CoinComponent } from '../../../../components/Common';
import styles from './styles';
import AddToMetamaskBtn from '../../../AddToMetamaskBtn';
import { useWeb3React } from '@web3-react/core';
import { chainsInfo, tokenMetrics } from '../../../../constants/tokenMetrics';

const TokenMetricContent = (props) => {
  const { tokenMetrics } = props;
  return (
    <Box sx={styles.tokenMetricsInfoChain} ml="2">
      <Box sx={styles.tokenMetricsSubHead}>Token Metrics</Box>

      <Box sx={styles.tokenMetricsInfoContainer} mt="20px">
        <Box sx={styles.tokenMetricsInfo}>
          <Flex sx={{ alignItems: 'center' }}>
            <span sx={styles.info}>{`NAME: ${tokenMetrics.name}`}</span>
            <AddToMetamaskBtn selectedChainId={tokenMetrics.chainId} />
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
      <Box sx={styles.tokenMetricsChainList} mt="20px">
        Get HAKKA Token on
        {' '}
        {tokenMetrics.shortName}
        :
      </Box>
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
        ? (
          <Flex sx={styles.token_metric_responsive} mt="2">
            <Box>
              <CoinComponent
                item={{ imageCoin: 'quickswap', coinName: 'Quickswap', link: 'https://quickswap.exchange/#/swap?outputCurrency=0x978338A9d2d0aa2fF388d3dc98b9bF25bfF5efB4' }}
              />
            </Box>
          </Flex>
        ) : (
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
  const { chainId } = useWeb3React();
  const [selectedCoin, setSelectedCoin] = useState('eth');
  const [selectedTokenMetric, setSelectedTokenMetric] = useState(tokenMetrics[0]);

  // functions
  const handleSelectCoin = (value) => () => {
    setSelectedCoin(value);
    const obj = tokenMetrics.find((it) => it.id === value);
    setSelectedTokenMetric(obj);
  };

  useEffect(() => {
    const currentChain = chainsInfo.find((chain) => 
      chain.chainId === chainId
    )
    handleSelectCoin(currentChain.id)();
  }, [chainId]);

  // render
  const renderChain = () => chainsInfo.map((chain) => (
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
