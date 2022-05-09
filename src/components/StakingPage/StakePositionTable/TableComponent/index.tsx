/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ITableData } from '../types';
import styles from '../styles';
import images from '../../../../images';

const vaultImage = [
  images.iconVaultArchive,
  images.iconStaking,
  images.iconRedeem,
];

export function vaultIconsRenderer(_: unknown, record: ITableData) {
  return (
    <div sx={styles.imgWrapper}>
      <img
        src={vaultImage[record.state] ?? images.iconVaultArchive}
        alt=""
        className="icon"
      />
    </div>
  );
}

export function expiryDateRenderer(_: unknown, record: ITableData) {
  const isExpired = record.until.mul(1000).lt(Date.now());

  const text = isExpired
    ? 'Expired'
    : `Left ${record.until
        .mul(1000)
        .sub(Date.now())
        .div(24 * 60 * 60 * 1000)
        .toNumber()
        .toString()} days`;
  const date = new Date(record.until.mul(1000).toNumber()).toLocaleString(
    'en-us',
    {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }
  );
  return (
    <div sx={styles.valueWrapper} className={!record.state ? 'disabled' : ''}>
      <strong className="title">{text}</strong>
      <span className="sub-title">{date}</span>
    </div>
  );
}

export function createValueRenderer(title: string, propsKey: keyof ITableData) {
  return function valueRenderer(_: unknown, record: ITableData) {
    return (
      <div sx={styles.valueWrapper} className={!record.state ? 'disabled' : ''}>
        <strong className="title">{record[propsKey]}</strong>
        <span className="sub-title">{title}</span>
      </div>
    );
  };
}
