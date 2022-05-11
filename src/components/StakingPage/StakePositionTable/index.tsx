/** @jsx jsx */
import { Box, Flex, jsx, Switch } from 'theme-ui';
import { memo } from 'react';
import Table from 'rc-table';
import { useCallback, useState, useMemo } from 'react';
import styles from './styles';
import type { ITableData, IStakePositionItem, HakkaVaultState } from './types';
import { createRenderValue, renderExpiryDate, renderVaultIcon } from './TableComponent';
import { formatUnits } from 'ethers/lib/utils';
import { createBigNumberSort } from '../../../utils/sort';
const { Column } = Table;

interface IProps {
  data: IStakePositionItem[];
  onRedeem: (index: number) => void;
  onRestake: (index: number) => void;
}

export default memo(function StakePositionTable(props: IProps) {
  const { data, onRedeem, onRestake } = props;

  const [showArchive, setShowArchive] = useState(false);

  const handleArchive = useCallback(() => {
    setShowArchive((state) => !state);
  }, []);

  const tableData: ITableData[] = useMemo(() => {
    const archiveList: ITableData[] = [];
    const nonArchiveList: ITableData[] = [];
    data
      .forEach((raw) => {
        const state: HakkaVaultState =
          +(raw.until.mul(1000).lte(Date.now()) && !raw.stakedHakka.isZero()) +
          +!raw.stakedHakka.isZero();
        const _tmpRaw = {
          ...raw, state,
          stakedHakkaStr: (+formatUnits(raw.stakedHakka)).toFixed(4),
          sHakkaReceivedStr: (+formatUnits(raw.sHakkaReceived)).toFixed(4),
        };
        if (state) {
          nonArchiveList.push(_tmpRaw);
        } else {
          archiveList.push(_tmpRaw);
        }
      });
    archiveList.sort(createBigNumberSort('until', 'asc'));
    nonArchiveList.sort(createBigNumberSort('until', 'asc'));

    return showArchive ? nonArchiveList.concat(archiveList) : nonArchiveList;
  }, [showArchive, data]);

  const actionButtonRender = useCallback(
    (_: unknown, record: ITableData) => {
      const state = record.state;
      return (
        <div>
          {state > 1 && (
            <button sx={styles.button} onClick={() => onRedeem(record.index)}>
              Redeem
            </button>
          )}
          {state > 0 && (
            <button sx={styles.button} onClick={() => onRestake(record.index)}>
              Restake
            </button>
          )}
          {!state && (
            <button sx={styles.button} disabled>
              Redeemed
            </button>
          )}
        </div>
      );
    },
    [onRedeem, onRestake]
  );

  const stakedHakkaRenderer = useCallback(createRenderValue('HAKKA', 'stakedHakkaStr'), []);

  const sHakkaObtainedRenderer = useCallback(createRenderValue('sHAKKA', 'sHakkaReceivedStr'), []);

  return (
    <div>
      <Flex sx={styles.headerWrapper}>
        <h2>Stake Position</h2>
        <Box>
          <Switch id="stake-position-switch" className="switch" label="Show archive" checked={showArchive} onChange={handleArchive}></Switch>
        </Box>
      </Flex>
      <div>
        <Table rowKey="index" sx={styles.tableWrapper} data={tableData}>
          <Column<ITableData>
            title=""
            dataIndex="icon"
            render={renderVaultIcon}
            width={72}
          ></Column>

          <Column<ITableData>
            title="Expiry date"
            dataIndex="index"
            render={renderExpiryDate}
            width={180}
          />

          <Column<ITableData> title="HAKKA staked" dataIndex="stakedHakka" render={stakedHakkaRenderer}
            width={180}
          />
          <Column<ITableData>
            title="sHAKKA obtained"
            dataIndex="sHakkaReceived"
            render={sHakkaObtainedRenderer}
            width={180}
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
});
