/** @jsx jsx */
import { jsx } from 'theme-ui';
import { CurrencyAmount } from '@uniswap/sdk';
import styles from './styles';
import NumercialInput from '../NumericalInput';
import images from '../../images/index';
import { ApprovalState } from '../../hooks/useApproveCallback';

interface NumericalInputCardProps {
  value: string | number;
  onUserInput: (input: any) => void;
  tokenBalance: CurrencyAmount;
  approveCallback: any;
  approveState: ApprovalState;
  amountError?: string;
  totalSupplyError?: string;
}

const NumericalInputCard = (props: NumericalInputCardProps) => (
  <div sx={props.amountError || props.totalSupplyError ? styles.InputCardErrorWrapper : styles.InputCardWrapper}>
    <NumercialInput
      value={props.value}
      onUserInput={props.onUserInput}
      sx={styles.input}
    />
    <div sx={styles.activeArea}>
      {(props.approveState !== ApprovalState.APPROVED)
        ? (
          <img
            src={images.iconLock}
            alt="Unlock token to continue"
            sx={styles.iconLock}
            onClick={() => props.approveCallback()}
          />
        )
        : ''}
      <button
        sx={styles.maxButton}
        onClick={() => { props.onUserInput(props.tokenBalance?.toSignificant(1000)); }}
      >
        MAX
      </button>
    </div>
  </div>
);

export default NumericalInputCard;
