/** @jsx jsx */
import { useState, useEffect } from 'react';
import { CurrencyAmount } from '@uniswap/sdk';
import { WeiPerEther } from '@ethersproject/constants';
import { jsx } from 'theme-ui';
import BigNumber from 'bignumber.js';
import styles from './styles';
import NumercialInput from '../NumericalInput';
import images from '../../images/index';
import { ApprovalState } from '../../hooks/useTokenApprove';
import { useActiveWeb3React } from '../../hooks/web3Manager';

interface NumericalInputFieldProps {
  value: string ;
  onUserInput: (input: string) => void;
  tokenBalance: CurrencyAmount;
  approve: any;
  approveState: ApprovalState;
  setIsCorrectInput: any;
  decimal?: number;
}

const NumericalInputField = (props: NumericalInputFieldProps) => {
  const {
    value,
    onUserInput,
    tokenBalance,
    approve,
    approveState,
    setIsCorrectInput,
    decimal,
  } = props;
  
  // check amount, balance
  const { chainId } = useActiveWeb3React();
  const tokenDecimal = new BigNumber(decimal ? 10 ** decimal : WeiPerEther.toString());
  const [amountError, setAmountError] = useState<string>('');

  useEffect(() => {
    if (value && tokenBalance) {
      const bigNumberInputAmount = new BigNumber(new BigNumber(value).isNaN() ? 0 : value)
      const bigNumberHakkaBalance = new BigNumber(tokenBalance.raw.toString()).dividedBy(tokenDecimal)

      if (bigNumberInputAmount.isGreaterThan(bigNumberHakkaBalance)) {
        console.log(
          `the amount ${bigNumberInputAmount.toString()} is more than your balance ${bigNumberHakkaBalance.toString()}`,
        );
        setAmountError('Insufficient balance');
      } else {
        setAmountError('');
      }
    } else {
      setAmountError('');
    }
  }, [tokenBalance, value, approveState, chainId]);


  useEffect(()=>{
    if (amountError || parseFloat(value) === 0 || !value) {
      setIsCorrectInput(false);
    } else {
      setIsCorrectInput(true);
    }
  },[value, amountError])

  return(
    <div sx={amountError ? styles.InputCardErrorWrapper : styles.InputCardWrapper}>
      <NumercialInput
        value={value}
        onUserInput={onUserInput}
        sx={styles.input}
      />
      <div sx={styles.activeArea}>
        {(approveState !== ApprovalState.APPROVED)
          ? (
            <img
              src={images.iconLock}
              alt="Unlock token to continue"
              sx={styles.iconLock}
              onClick={() => approve()}
            />
          )
          : ''}
        <button
          sx={styles.maxButton}
          onClick={() => { onUserInput(tokenBalance?.toSignificant(1000) || ''); }}
        >
          MAX
        </button>
      </div>
    </div>
  );
}

export default NumericalInputField;
