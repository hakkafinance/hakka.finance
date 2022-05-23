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

export function renderVaultIcon(_: unknown, record: ITableData) {
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

export function renderExpiryDate(_: unknown, record: ITableData) {
  const isExpired = record.unlockTime.mul(1000).lt(Date.now());

  const text = isExpired
    ? 'Expired'
    : `Left ${record.unlockTime
        .mul(1000)
        .sub(Date.now())
        .div(86400000)
        .toNumber()
        .toString()} days`;
  const date = new Date(record.unlockTime.mul(1000).toNumber()).toLocaleString(
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

export function createRenderValue(title: string, propsKey: keyof ITableData) {
  return function renderValue(_: unknown, record: ITableData) {
    return (
      <div sx={styles.valueWrapper} className={!record.state ? 'disabled' : ''}>
        <strong className="title">{record[propsKey]}</strong>
        <span className="sub-title">{title}</span>
      </div>
    );
  };
}
