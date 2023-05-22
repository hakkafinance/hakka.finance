import { ChainId } from '.';

const NETWORK_URL = process.env.GATSBY_NETWORK_URL;
const BSC_NETWORK_URL = process.env.GATSBY_BSC_NETWORK_URL;
const POLYGON_NETWORK_URL = process.env.GATSBY_POLYGON_NETWORK_URL;
const FANTOM_NETWORK_URL = process.env.GATSBY_FANTOM_NETWORK_URL;
if (
  typeof NETWORK_URL === 'undefined' ||
  typeof BSC_NETWORK_URL === 'undefined' ||
  typeof POLYGON_NETWORK_URL === 'undefined' ||
  typeof FANTOM_NETWORK_URL === 'undefined'
) {
  throw new Error(
    'GATSBY_NETWORK_URL and GATSBY_BSC_NETWORK_URL and POLYGON_NETWORK_URL must be a defined environment variable'
  );
}

export const NETWORK_CHAIN_ID: number = parseInt(
  process.env.GATSBY_CHAIN_ID ?? '1'
);

export const chainUrlMap: Record<number, string | string[]> = {
  [ChainId.MAINNET]: NETWORK_URL,
  [ChainId.BSC]: BSC_NETWORK_URL,
  [ChainId.POLYGON]: POLYGON_NETWORK_URL,
  [ChainId.FANTOM]: FANTOM_NETWORK_URL,
  [NETWORK_CHAIN_ID]: NETWORK_URL,
};
