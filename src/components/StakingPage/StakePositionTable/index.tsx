/** @jsx jsx */
import { jsx, Switch } from 'theme-ui';
import Table from 'rc-table';
import { CurrencyAmount } from '@uniswap/sdk';
import { BigNumber } from 'ethers';
import images from '../../../images';
import { useCallback } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';

const { Column } = Table;
interface StakePositionItem {
  index: number;
  sHakkaBalance?: CurrencyAmount;
  stakedHakka: BigNumber;
  sHakkaReceived: BigNumber;
  until: BigNumber;
}

interface ITableData extends StakePositionItem {
  /** `2 redeem and restake` `1 restake` `0 expired and 0 in vault` */
  state: number;
}

interface IProps {
  data: StakePositionItem[];
  onRedeem: (index: number) => void;
  onRestake: (index: number) => void;
}

function ExpiryDate(_: unknown, record: StakePositionItem) {
  const isExpired = record.until.mul(1000).lt(Date.now());

  const text = isExpired
    ? 'Expired'
    : `Left ${record.until.mul(1000)
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
    <div>
      <strong>{text}</strong>
      <span>{date}</span>
    </div>
  );
}

export default function StakePositionTable(props: IProps) {
  const { data, onRedeem, onRestake } = props;

  const [showArchive, setShowArchive] = useState(false);

  const handleArchive = useCallback(() => {
    setShowArchive((state) => !state);
  }, []);

  const tableData: ITableData[] = useMemo(() => {
    const result = data
      .map((raw) => {
        const state =
          +(raw.until.mul(1000).lte(Date.now()) && !raw.stakedHakka.isZero()) +
          +!raw.stakedHakka.isZero();
        return { ...raw, state };
      })
      .sort((a, b) => b.until.sub(a.until).toNumber());

    return showArchive ? result : result.filter((item) => item.state !== 0);
  }, [showArchive, data]);

  const actionButtonRender = useCallback(
    (_: unknown, record: ITableData) => {
      const state = record.state;
      return (
        <div>
          {state > 1 && (
            <button onClick={() => onRedeem(record.index)}>redeem</button>
          )}
          {state > 0 && (
            <button onClick={() => onRestake(record.index)}>restake</button>
          )}
          {!state && <button disabled>redeemed</button>}
        </div>
      );
    },
    [onRedeem, onRestake]
  );

  return (
    <div>
      <div className="header">
        <h2>Stake Position</h2>
        <Switch label="Show archive" onChange={handleArchive}></Switch>
      </div>
      <div>
        <Table data={tableData}>
          <Column<ITableData>
            title=""
            dataIndex="icon"
            render={(_, record) => {
              if (record.state === 2) {
                return <img src={images.iconRedeem} alt="vault" />;
              }
              if (record.state === 1) {
                return <img alt="staking" src={images.iconStaking} />;
              }
              return <img alt="" src={images.iconVaultArchive} />;
            }}
          ></Column>

          <Column<ITableData>
            title="Expiry date"
            dataIndex="index"
            render={ExpiryDate}
          />

          <Column<ITableData> title="HAKKA staked" dataIndex="stakedHakka" />
          <Column<ITableData>
            title="sHAKKA obtained"
            dataIndex="sHakkaReceived"
          />
          <Column<ITableData>
            title=""
            dataIndex="index"
            render={actionButtonRender}
          />
        </Table>
      </div>
    </div>
  );
}
