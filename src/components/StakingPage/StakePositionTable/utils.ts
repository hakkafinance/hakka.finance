import { BigNumber } from '@ethersproject/bignumber';
export function getExpiredLeftStrFromBigNumber(time: BigNumber) {
  const isExpired = time.mul(1000).lt(Date.now());

  const text = isExpired
    ? 'Expired'
    : `Left ${time
        .mul(1000)
        .sub(Date.now())
        .div(86400000)
        .toNumber()
        .toString()} days`;
  return text;
}

export function getDateFromBigNumber(time: BigNumber) {
  return new Date(time.mul(1000).toNumber()).toLocaleString('en-us', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}
