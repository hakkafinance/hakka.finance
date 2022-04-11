import images from '../images';

export const chainsInfo = [
  {
    id: 'eth',
    chainId: 1,
    imgChain: 'iconEthereum',
    chainName: 'Ethereum Mainnet',
    imgBg: '#f2f2f2',
  },
  {
    id: 'bsc',
    chainId: 56,
    imgChain: 'iconBinanceGold',
    chainName: 'Binance Smart Chain',
    imgBg: '#fcf7de',
  },
  {
    id: 'polygon',
    chainId: 137,
    imgChain: 'iconPolygon',
    chainName: 'Polygon Network',
    imgBg: '#f2ebff',
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
    shortName: 'BSC',
    name: ' Hakka Finance on xDai on BSC (HAKKA)',
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
];