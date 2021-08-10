/** @jsx jsx */
import { jsx } from 'theme-ui';
import { TokenAmount } from '@uniswap/sdk';
import styles from './styles';
import NumercialInput from '../../NumericalInput';
import images from '../../../images/index';
import { ApprovalState } from '../../../hooks/useApproveCallback';

interface NumericalInputCardInputCard {
  value: string;
  onUserInput: (input: any) => void;
  hakkaBalance: TokenAmount;
  approveCallback: any;
  approveState: ApprovalState;
  amountError?: string;
  totalSupplyError?: string;
}

const NumericalInputCard = (props: NumericalInputCardInputCard) => (
  <div sx={props.amountError || props.totalSupplyError ? styles.InputCardErrorWrapper : styles.InputCardWrapper}>
    <NumercialInput
      value={props.value || '0'}
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
        onClick={() => { props.onUserInput(props.hakkaBalance?.toSignificant(1000)); }}
      >
        MAX
      </button>
    </div>
  </div>
);

export default NumericalInputCard;
