import { Contract } from '@ethersproject/contracts';
import { getAddress } from '@ethersproject/address';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import {
  Currency, CurrencyAmount, JSBI, Percent, Token, TokenAmount,
} from '@uniswap/sdk';
import { ethers } from 'ethers';
import { parseUnits } from '@ethersproject/units';
import { ChainId } from '../constants';
import ERC20_ABI from '../constants/abis/erc20.json';
import ERC20_BYTES32_ABI from '../constants/abis/erc20_bytes32.json';

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

const ETHERSCAN_PREFIXES: { [chainId in ChainId]: string } = {
  1: '',
  42: 'kovan.',
  56: '',
  137: '',
  250: '',
};

export function getEtherscanLink(
  chainId: ChainId,
  data: string,
  type: 'transaction' | 'token' | 'address',
): string {
  const prefix = chainId === ChainId.BSC
    ? 'https://bscscan.com'
    : chainId === ChainId.POLYGON
    ? 'https://polygonscan.com'
    : chainId === ChainId.FANTOM
    ? 'https://ftmscan.com'
    : `https://${
      ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[1]
    }etherscan.io`;

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export function shortenTxId(address: string, chars = 6): string {
  return `${address.substring(0, chars + 2)}...${address.substring(64 - chars)}`;
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
    .div(BigNumber.from(10000));
}

// converts a basis points value to a sdk percent
export function basisPointsToPercent(num: number): Percent {
  return new Percent(JSBI.BigInt(num), JSBI.BigInt(10000));
}

// account is not optional
export function getSigner(
  library: Web3Provider,
  account: string,
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string,
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string,
): Contract {
  if (!isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any,
  );
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export function getNetworkName(networkId: number) {
  switch (networkId) {
    case 1: {
      return 'Main Network';
    }
    case 3: {
      return 'Ropsten';
    }
    case 4: {
      return 'Rinkeby';
    }
    case 5: {
      return 'Görli';
    }
    case 42: {
      return 'Kovan';
    }
    default: {
      return 'correct network';
    }
  }
}

// using a currency library here in case we want to add more in future
const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const formattedNum = (
  number: any,
  usd = false,
  acceptNegatives = false,
) => {
  if (isNaN(number) || number === '' || number === undefined) {
    return usd ? '$0' : 0;
  }
  const num = parseFloat(number);

  if (num > 500000000) {
    return (usd ? '$' : '') + toK(num.toFixed(0));
  }

  if (num === 0) {
    if (usd) {
      return '$0';
    }
    return 0;
  }

  if (num < 0.0001 && num > 0) {
    return usd ? '< $0.0001' : '< 0.0001';
  }

  if (num > 1000) {
    return usd
      ? `$${Number(parseFloat(num.toString()).toFixed(0)).toLocaleString()}`
      : `${Number(parseFloat(num.toString()).toFixed(0)).toLocaleString()}`;
  }

  if (usd) {
    if (num < 0.1) {
      return `$${Number(parseFloat(num.toString()).toFixed(4))}`;
    }
    const usdString = priceFormatter.format(num);
    return `$${usdString.slice(1, usdString.length)}`;
  }

  return Number(parseFloat(num.toString()).toFixed(5));
};

export function isERC20Contract(tokenAddress: string, library: any) {
  return getContract(tokenAddress, ERC20_ABI, library)
    .name()
    .catch(() => getContract(tokenAddress, ERC20_BYTES32_ABI, library)
      .name()
      .then((bytes32: any) => ethers.utils.parseBytes32String(bytes32)))
    .catch(() => false);
}

export const ERROR_CODES = [
  'TOKEN_NAME',
  'TOKEN_SYMBOL',
  'TOKEN_DECIMALS',
].reduce((accumulator: any, currentValue: string, currentIndex: number) => {
  accumulator[currentValue] = currentIndex;
  return accumulator;
}, {});

export async function getTokenName(tokenAddress: string, library: any) {
  if (!isAddress(tokenAddress)) {
    throw Error(`Invalid 'tokenAddress' parameter '${tokenAddress}'.`);
  }

  return getContract(tokenAddress, ERC20_ABI, library)
    .name()
    .catch(() => getContract(tokenAddress, ERC20_BYTES32_ABI, library)
      .name()
      .then((bytes32: any) => ethers.utils.parseBytes32String(bytes32)))
    .catch((error: any) => {
      error.code = ERROR_CODES.TOKEN_SYMBOL;
      throw error;
    });
}

export async function getTokenSymbol(tokenAddress: string, library: any) {
  if (!isAddress(tokenAddress)) {
    throw Error(`Invalid 'tokenAddress' parameter '${tokenAddress}'.`);
  }

  return getContract(tokenAddress, ERC20_ABI, library)
    .symbol()
    .catch(() => {
      const contractBytes32 = getContract(
        tokenAddress,
        ERC20_BYTES32_ABI,
        library,
      );
      return contractBytes32
        .symbol()
        .then((bytes32: any) => ethers.utils.parseBytes32String(bytes32));
    })
    .catch((error: any) => {
      error.code = ERROR_CODES.TOKEN_SYMBOL;
      throw error;
    });
}

export async function getTokenDecimals(tokenAddress: string, library: any) {
  if (!isAddress(tokenAddress)) {
    throw Error(`Invalid 'tokenAddress' parameter '${tokenAddress}'.`);
  }

  return getContract(tokenAddress, ERC20_ABI, library)
    .decimals()
    .catch((error: any) => {
      error.code = ERROR_CODES.TOKEN_DECIMALS;
      throw error;
    });
}

export function tryParseAmount(
  value?: string,
): CurrencyAmount | undefined {
  if (!value) {
    return CurrencyAmount.ether(JSBI.BigInt('0'));
  }
  try {
    const typedValueParsed = parseUnits(value, 18).toString();
    if (typedValueParsed !== '0') {
      return CurrencyAmount.ether(JSBI.BigInt(typedValueParsed));
    }
  } catch (error) {
    // should fail if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug(`Failed to parse input amount: "${value}"`, error);
  }
  // necessary for all paths to return a value
  return CurrencyAmount.ether(JSBI.BigInt('0'));
}

export function transferToYear(sec: number): string {
  // 365.25 days in a year
  // return BigNumber.from(sec)
  //   .div(BigNumber.from(31557600))
  //   .toString();

  // TODO: is this calculate correct or not
  const secOfYear = 31557600;
  return (sec / secOfYear).toString();
}
