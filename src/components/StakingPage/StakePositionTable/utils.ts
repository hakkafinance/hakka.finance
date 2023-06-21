import { BigNumber } from '@ethersproject/bignumber';
export function getExpiredLeftStrFromBigNumber(time: BigNumber) {
  const secs = time.mul(1000)
  const isExpired = secs.lt(Date.now());

  const text = isExpired
    ? 'Expired'
    : `Left ${secs
        .sub(Date.now())
        .div(86400000)
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
