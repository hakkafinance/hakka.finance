/** @jsx jsx */
import { Flex, jsx } from 'theme-ui';
import { memo } from 'react';
import Table from 'rc-table';
import { useCallback, useState, useMemo } from 'react';
import styles from './styles';
import type { ITableData, HakkaVaultState } from './types';
import { createRenderValue, renderExpiryDate, renderVaultIcon } from './TableComponent';
import { formatUnits } from 'ethers/lib/utils';
import { createBigNumberSort } from '../../../utils/sort';
import { VaultType } from '../../../hooks/staking/useStakingVault';
import { isMobile } from 'react-device-detect';
import PositionCard from './PositionCard';

import _cond from 'lodash/cond';
import _matches from 'lodash/matches';
import _stubTrue from 'lodash/stubTrue';

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
    if (data.some(raw => !raw)) return [];
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
        <div className="button-group">
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

  const TableWrap = useCallback(_cond<{tableLength: number, isMobile: boolean}, React.ReactElement>([
    [
      _matches({ tableLength: 0 }),
      () => <div sx={styles.emptySection}>
        No position
      </div>
    ],
    [
      _matches({ isMobile: true }),
      () => <div sx={styles.cardWrapper}>
        {tableData.map(raw => <PositionCard data={raw} key={raw.index} actionButtonRender={actionButtonRender} />)}
      </div>
    ],
    [
      _stubTrue,
      () => 
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

          <Column<ITableData> title="HAKKA staked" dataIndex="hakkaAmount" render={stakedHakkaRenderer}
            width={180}
          />
          <Column<ITableData>
            title="sHAKKA obtained"
            dataIndex="wAmount"
            render={sHakkaObtainedRenderer}
            width={180}
          />
          <Column<ITableData>
            title=""
            dataIndex="index"
            render={actionButtonRender}
          />
        </Table>
    ]
  ]), [tableData, actionButtonRender]);

  return (
    <div sx={{pb: '100px'}}>
      <Flex sx={styles.headerWrapper}>
        <h2>Staking Position</h2>
        <div sx={styles.switchWrapper}>
          <label sx={styles.switchBtn}>
            <input type="checkbox" checked={showArchive} onChange={handleArchive} />
            <span className="slider"></span>
          </label>
          <span sx={styles.switchLabel}>Show archive</span>
        </div>
      </Flex>
      <TableWrap tableLength={tableData.length} isMobile={isMobile} />
    </div>
  );
});
