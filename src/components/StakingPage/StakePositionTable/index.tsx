/** @jsx jsx */
import { Box, Flex, jsx, Switch } from 'theme-ui';
import { memo } from 'react';
import Table from 'rc-table';
import { useCallback, useState, useMemo } from 'react';
import styles from './styles';
import type { ITableData, HakkaVaultState } from './types';
import { createRenderValue, renderExpiryDate, renderVaultIcon } from './TableComponent';
import { formatUnits } from 'ethers/lib/utils';
import { createBigNumberSort } from '../../../utils/sort';
import { VaultType } from '../../../hooks/staking/useStakingVault';
const { Column } = Table;

interface IProps {
  data: VaultType[];
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
    if (data.some(raw => !raw)) return []
    const archiveList: ITableData[] = [];
    const nonArchiveList: ITableData[] = [];
    data
      .forEach((raw, i) => {
        const state: HakkaVaultState =
          +(raw.unlockTime.mul(1000).lte(Date.now()) && !raw.hakkaAmount.isZero()) +
          +!raw.hakkaAmount.isZero();
        const _tmpRaw = {
          ...raw, state,
          stakedHakkaStr: (+formatUnits(raw.hakkaAmount)).toFixed(4),
          sHakkaReceivedStr: (+formatUnits(raw.wAmount)).toFixed(4),
          index: i
        };
        if (state) {
          nonArchiveList.push(_tmpRaw);
        } else {
          archiveList.push(_tmpRaw);
        }
      });
    archiveList.sort(createBigNumberSort('unlockTime', 'asc'));
    nonArchiveList.sort(createBigNumberSort('unlockTime', 'asc'));

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
      <div sx={{
        mb: '100px',
      }}>
        {tableData.length > 0 && (
          <Table rowKey="index" sx={styles.tableWrapper} data={tableData}>
            <Column<ITableData>
              title=""
              dataIndex="icon"
              key="icon"
              render={renderVaultIcon}
              width={72}
            ></Column>

            <Column<ITableData>
              title="Expiry date"
              dataIndex="index"
              key="unlockTime"
              render={renderExpiryDate}
              width={180}
            />

            <Column<ITableData> title="HAKKA staked" dataIndex="hakkaAmount" render={stakedHakkaRenderer}
              width={180}
            />
            <Column<ITableData>
              title="sHAKKA obtained"
              dataIndex="wAmount"
              key="wAmount"
              render={sHakkaObtainedRenderer}
              width={180}
            />
            <Column<ITableData>
              title=""
              dataIndex="index"
              key="hakkaAmount"
              render={actionButtonRender}
            />
          </Table>) || (<div sx={styles.emptySection}>
            No position
          </div>)
        }
      </div>
    </div>
  );
});
