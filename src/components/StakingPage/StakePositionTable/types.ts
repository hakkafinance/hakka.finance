import type { CurrencyAmount } from '@uniswap/sdk';
import type { BigNumber } from 'ethers';

export interface IStakePositionItem {
  index: number;
  sHakkaBalance?: CurrencyAmount;
  hakkaAmount: BigNumber;
  wAmount: BigNumber;
  unlockTime: BigNumber;
}

export interface ITableData extends IStakePositionItem {
  /** `2 redeem and restake` `1 restake` `0 expired and 0 in vault` */
  state: number;

  stakedHakkaStr: string;
  sHakkaReceivedStr: string;
}

export enum HakkaVaultState {
  ARCHIVE = 0,
  STAKING = 1,
  REDEEM = 2,
}