import { BigNumber } from '@ethersproject/bignumber';
export function createBigNumberSort<T>(key: keyof T, sorter: 'asc' | 'desc') {
  return (a: T, b: T) => {
    if (sorter === 'desc') [a, b] = [b, a];
    return BigNumber.from(a[key]).sub(BigNumber.from(b[key])).toNumber();
  };
}
