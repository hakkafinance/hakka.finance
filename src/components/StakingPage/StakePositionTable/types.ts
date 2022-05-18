import { VaultType } from '../../../hooks/staking/useStakingVault';

export interface ITableData extends VaultType {
  /** `2 redeem and restake` `1 restake` `0 expired and 0 in vault` */
  state: number;

  stakedHakkaStr: string;
  sHakkaReceivedStr: string;
  index: number;
}

export enum HakkaVaultState {
  ARCHIVE = 0,
  STAKING = 1,
  REDEEM = 2,
}