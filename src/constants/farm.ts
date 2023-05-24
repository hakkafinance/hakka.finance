import { ChainId } from ".";
import images from "../images";

export const CHAIN_SWITCH_TAB_INFO: {[chainId in ChainId]: { displayName: string, img: string, imgGray: string }} = {
    [ChainId.MAINNET]: {
      displayName: 'Ethereum',
      img: images.iconTabEthWithBgColor,
      imgGray: images.iconTabEthGray,
    },
    [ChainId.BSC]: {
      displayName: 'BNB Chain',
      img: images.iconTabBscWithBgColor,
      imgGray: images.iconTabBscGray,
    },
    [ChainId.POLYGON]: {
      displayName: 'Polygon',
      img: images.iconTabPolygonWithBgColor,
      imgGray: images.iconTabPolygonGray,
    },
    [ChainId.FANTOM]: {
      displayName: 'Fantom',
      img: images.iconTabFantomWithBgColor,
      imgGray: images.iconTabFantomGray,
    },
  };