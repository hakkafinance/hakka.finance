/** @jsx jsx */
import { jsx } from 'theme-ui'
import styles from './styles'
import NumercialInput from '../../NumericalInput' 
import { ApprovalState } from '../../../hooks/useApproveCallback'
import { CurrencyAmount } from '@uniswap/sdk';


interface NumericalInputCardInputCard {
  value: string;
  onUserInput: (input: any) => void;
  hakkaBalance: CurrencyAmount;
  approveCallback: any;
  approveState: ApprovalState;
  amountError?: string;
  totalSupplyError?: string;
}

const NumericalInputCard = (props: NumericalInputCardInputCard) => {
  return (
    <div sx={ props.amountError||props.totalSupplyError ? styles.InputCardErrorWrapper : styles.InputCardWrapper}>
      <NumercialInput
        value={props.value || '0'}
        onUserInput={props.onUserInput}
        sx={styles.input}
      />
      <div sx={styles.activeArea}>
        <button
          sx={styles.maxButton}
          onClick={() => { props.onUserInput(props.hakkaBalance?.toSignificant(1000)) }}
        >MAX</button>
      </div>
    </div>
  )
}

export default NumericalInputCard