import images from '../images';

export const chainsInfo = [
  {
    id: 'eth',
    chainId: 1,
    imgChain: 'iconEthereum',
    chainName: 'Ethereum Mainnet',
    imgBg: '#f2f2f2',
    nativeTokenSymbol: 'ETH',
    shortName: 'Ethereum',
  },
  {
    id: 'bsc',
    chainId: 56,
    imgChain: 'iconBinanceGold',
    chainName: 'BNB Chain',
    imgBg: '#fcf7de',
    nativeTokenSymbol: 'BNB',
    shortName: 'BNB Chain',
  },
  {
    id: 'polygon',
    chainId: 137,
    imgChain: 'iconPolygon',
    chainName: 'Polygon Network',
    imgBg: '#f2ebff',
    nativeTokenSymbol: 'MATIC',
    shortName: 'Polygon',
  },
  {
    id: 'fantom',
    chainId: 250,
    imgChain: 'iconFantom',
    chainName: 'Fantom',
    imgBg: '#CFDFFC',
    nativeTokenSymbol: 'FTM',
    shortName: 'Fantom',
  },
];

export const tokenMetrics = [
  {
    id: 'eth',
    chainId: 1,
    shortName: 'Ethereum',
    name: 'Hakka Finance (HAKKA)',
    type: 'ERC-20',
    address: '0x0E29e5AbbB5FD88e28b2d355774e73BD47dE3bcd',
    addressLink: 'https://etherscan.io/token/0x0E29e5AbbB5FD88e28b2d355774e73BD47dE3bcd',
    addressIcon: images.iconEtherscan,
  },
  {
    id: 'bsc',
    chainId: 56,
    shortName: 'BNB Chain',
    name: ' Hakka Finance on xDai on BNB Chain (HAKKA)',
    type: 'BEP-20',
    address: '0x1D1eb8E8293222e1a29d2C0E4cE6C0Acfd89AaaC',
    addressLink: 'https://bscscan.com/token/0x1D1eb8E8293222e1a29d2C0E4cE6C0Acfd89AaaC',
    addressIcon: images.iconBSCScan,
  },
  {
    id: 'polygon',
    chainId: 137,
    shortName: 'Polygon',
    name: ' Hakka Finance (HAKKA)',
    type: 'ERC-20',
    address: '0x978338A9d2d0aa2fF388d3dc98b9bF25bfF5efB4',
    addressLink: 'https://polygonscan.com/token/0x978338A9d2d0aa2fF388d3dc98b9bF25bfF5efB4',
    addressIcon: images.iconPolygon,
  },
  {
    id: 'fantom',
    chainId: 250,
    shortName: 'Fantom',
    name: 'Hakka Finance (HAKKA)',
    type: 'ERC-20',
    address: '0xda803c6AD8078c51c5334B51aA4Cc3f440d56D5F',
    addressLink: 'https://ftmscan.com/address/0xda803c6ad8078c51c5334b51aa4cc3f440d56d5f',
    addressIcon: images.iconFantom,
  }
];