/** @jsx jsx */
import { jsx } from 'theme-ui';
import { ITableData } from '../types';
import styles from '../styles';
import images from '../../../../images';
import { getDateFromBigNumber } from '../utils';
import Countdown, { CountdownRendererFn } from 'react-countdown';

export const vaultImage = [
  images.iconVaultArchive,
  images.iconStaking,
  images.iconRedeem,
];

export const expiredCountdownRenderer: CountdownRendererFn = ({ days, completed }) => {
  if (completed) {
    return <span>Expired</span>;
  }
  return <span>{`${days} day(s) left`}</span>;
};

export function VaultIcon (props: {
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

export function renderVaultIcon (_: unknown, record: ITableData) {
  return (
    <div sx={styles.imgWrapper}>
      <VaultIcon state={record.state} className="vault-icon" />
    </div>
  );
}

export function renderExpiryDate (_: unknown, record: ITableData) {
  const date = getDateFromBigNumber(record.unlockTime);
  return (
    <div sx={styles.valueWrapper} className={!record.state ? 'disabled' : ''}>
      <strong className="title">
        <Countdown
          intervalDelay={30000}
          renderer={expiredCountdownRenderer}
          date={new Date(record.unlockTime.mul(1000).toNumber())}
        />
      </strong>
      <span className="sub-title">{date}</span>
    </div>
  );
}

export function createRenderValue (title: string, propsKey: keyof ITableData) {
  return function renderValue (_: unknown, record: ITableData) {
    return (
      <div sx={styles.valueWrapper} className={!record.state ? 'disabled' : ''}>
        <strong className="title">{record[propsKey]}</strong>
        <span className="sub-title">{title}</span>
      </div>
    );
  };
}
