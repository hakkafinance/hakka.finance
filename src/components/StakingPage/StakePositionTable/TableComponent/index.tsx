/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ITableData } from '../types';
import styles from '../styles';
import images from '../../../../images';
import { getDateFromBigNumber, getExpiredLeftStrFromBigNumber } from '../utils';

export const vaultImage = [
  images.iconVaultArchive,
  images.iconStaking,
  images.iconRedeem,
];

export function VaultIcon(props: {
  state: ITableData['state'];
  className?: string;
}) {
  return (
    <img
      src={vaultImage[props.state] ?? images.iconVaultArchive}
      alt=""
      className={props.className}
    />
  );
}

export function renderVaultIcon(_: unknown, record: ITableData) {
  return (
    <div sx={styles.imgWrapper}>
      <VaultIcon state={record.state} className="vault-icon" />
    </div>
  );
}

export function renderExpiryDate(_: unknown, record: ITableData) {
  const text = getExpiredLeftStrFromBigNumber(record.unlockTime);
  const date = getDateFromBigNumber(record.unlockTime);
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
