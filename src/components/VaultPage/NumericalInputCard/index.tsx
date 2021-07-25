/** @jsx jsx */
import { jsx } from 'theme-ui'
import styles from './styles'
import NumercialInput from '../../NumericalInput' 
import images from '../../../images/index'
import { ApprovalState } from '../../../hooks/useApproveCallback'


interface InputCard {
  value: string | number;
  onUserInput: (input: any) => void;
  hakkaBalance: string | number;
  approveCallback: any;
  approveState: ApprovalState;
}

const NumericalInputCard = (props: InputCard) => {

  return (
    <div sx={styles.InputCardWrapper}>
      <NumercialInput
        value={props.value}
        onUserInput={props.onUserInput}
        sx={styles.input}
      />
      <div sx={styles.activeArea}>
        {(props.approveState !== ApprovalState.APPROVED) ? 
          <img
            src={images.iconLock}
            alt='Unlock token to continue'
            sx={styles.iconLock}
            onClick={()=>props.approveCallback()}
          /> 
          : ''}
        <button
          sx={styles.maxButton}
          onClick={() => { props.onUserInput(props.hakkaBalance) }}
        >MAX</button>
      </div>
    </div>
  )
}

export default NumericalInputCard