/** @jsx jsx */
import { jsx } from 'theme-ui';
import { VaultIcon } from '../TableComponent';
import { ITableData } from '../types';
import { getDateFromBigNumber, getExpiredLeftStrFromBigNumber } from '../utils';
import styles from './styles';
interface IProps {
  data: ITableData;
  actionButtonRender?: (_: unknown, record: ITableData) => React.ReactElement;
}

export default function PositionCard(props: IProps) {
  const { data, actionButtonRender } = props;
  return (
    <div sx={styles.cardContainer}>
      <div sx={styles.rowEle}>
        <div className="title">Expiry date</div>
        <strong className="value">
          <VaultIcon state={data.state} className="icon" />
          {getExpiredLeftStrFromBigNumber(data.unlockTime)}
        </strong>
        <span className="sub-title">
          {getDateFromBigNumber(data.unlockTime)}
        </span>
      </div>
      <div sx={styles.rowEle}>
        <div className="title">HAKKA staked</div>
        <strong className="value">{data.stakedHakkaStr}</strong>
        <span className="sub-title">HAKKA</span>
      </div>
      <div sx={styles.rowEle}>
        <div className="title">sHAKKA obtained</div>
        <strong className="value">{data.sHakkaReceivedStr}</strong>
        <span className="sub-title">sHAKKA</span>
      </div>
      {actionButtonRender?.(data, data)}
    </div>
  );
}
