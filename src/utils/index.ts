import { Contract } from '@ethersproject/contracts';
import { getAddress } from '@ethersproject/address';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import { ChainId } from '../constants';
import { JSBI, Percent } from '@uniswap/sdk';

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
};

export function getEtherscanLink(
  chainId: ChainId,
  data: string,
  type: 'transaction' | 'token' | 'address'
): string {
  const prefix =
    chainId === ChainId.BSC
      ? 'https://bscscan.com'
      : `https://${
          ETHERSCAN_PREFIXES[chainId] || ETHERSCAN_PREFIXES[1]
        }etherscan.io`

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
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string
): Contract {
  if (!isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any
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
var priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const formattedNum = (
  number: any,
  usd = false,
  acceptNegatives = false
) => {
  if (isNaN(number) || number === '' || number === undefined) {
    return usd ? '$0' : 0;
  }
  let num = parseFloat(number);

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
      ? '$' + Number(parseFloat(num.toString()).toFixed(0)).toLocaleString()
      : '' + Number(parseFloat(num.toString()).toFixed(0)).toLocaleString();
  }

  if (usd) {
    if (num < 0.1) {
      return '$' + Number(parseFloat(num.toString()).toFixed(4));
    } else {
      let usdString = priceFormatter.format(num);
      return '$' + usdString.slice(1, usdString.length);
    }
  }

  return Number(parseFloat(num.toString()).toFixed(5));
};
