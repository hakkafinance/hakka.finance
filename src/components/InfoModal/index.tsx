/** @jsx jsx */
import { jsx } from 'theme-ui'
import {
  JSBI,
  TokenAmount,
} from '@uniswap/sdk';
import { useWeb3React } from '@web3-react/core';
import { Interface } from '@ethersproject/abi';
import { AddressZero } from '@ethersproject/constants';
import { useStakingBalance } from '../../data/StakingBalance'
import ERC20_ABI from '../../constants/abis/erc20.json';
import {
  ChainId,
  HAKKA,
  VESTING_ADDRESSES
} from '../../constants';
import {
  useInfoModalOpen,
  useInfoModalToggle,
} from '../../state/application/hooks';
import { useMultipleContractMultipleData } from '../../state/multicall/hooks';
import useTokenPrice from '../../hooks/useTokenPrice'

import images from '../../images';
import Modal from '../Modal';
import styles from './styles';

export default function WalletModal() {
  const { chainId, account } = useWeb3React();
  const hakkaPrice = useTokenPrice('hakka-finance')

  const ERC20_INTERFACE = new Interface(ERC20_ABI);
  const hakkaBalances = useMultipleContractMultipleData(
    [
      HAKKA[chainId as ChainId]?.address,
      VESTING_ADDRESSES[chainId as ChainId],
    ],
    ERC20_INTERFACE,
    'balanceOf',
    [[account], [account]],
  );

  const [
    hakkaValueAmount,
    vestingValueAmount,
  ] = hakkaBalances?.map((balance) => new TokenAmount(
    HAKKA[chainId as ChainId || 1],
    JSBI.BigInt(balance?.result?.[0] ?? 0)
  ));

  const stakingValueAmount = useStakingBalance();

  const infoModalOpen = useInfoModalOpen();
  const toggleInfoModal = useInfoModalToggle();

  function getModalContent() {
    return (
      <div sx={styles.upperSection}>
        <div sx={styles.closeIcon} onClick={toggleInfoModal}>
          <img src={images.iconDeleteRound} />
        </div>
        <div sx={styles.headerRow}>
          <div sx={styles.hoverText}>Your HAKKA breakdown</div>
        </div>
        <div sx={styles.contentWrapper}>
          <div>
            <div>{hakkaValueAmount?.toFixed(2)} HAKKA</div>
            <div>{hakkaPrice} USD</div>
          </div>
          <div>
            <div>Staking balance</div>
            <div>{stakingValueAmount?.toFixed(2)} HAKKA</div>
          </div>
          <div>
            <div>Vesting balance</div>
            <div>{vestingValueAmount?.toFixed(2)} HAKKA</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={infoModalOpen}
      onDismiss={toggleInfoModal}
    >
      <div sx={styles.wrapper}>{getModalContent()}</div>
    </Modal>
  );
}
