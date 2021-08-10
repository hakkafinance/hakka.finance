/** @jsx jsx */
import { jsx } from 'theme-ui'
import styles from './styles'
import React from 'react';
import { escapeRegExp } from '../../utils/index'
import { parseUnits } from '@ethersproject/units'

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

export const NumercialInput = React.memo(function InnerInput({
  value,
  onUserInput,
  placeholder,
  ...rest
}: {
  value: string | number;
  onUserInput: (input: string) => void;
  error?: number; // for escape Warning: Received `false` for a non-boolean attribute `error`. When use error?: boolean;
  fontSize?: string;
  align?: 'right' | 'left';
} & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) {
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      // Parse the valueString representation of units into a BigNumber instance of the amount of wei.
      // escape from underflow shutdown
      try {
        parseUnits(nextUserInput, 18);
      } catch (error) {
        nextUserInput = nextUserInput.substring(0, nextUserInput.length - 1);
      }
      onUserInput(nextUserInput);
    }
  };

  const propsStyle = {
    fontSize: rest.fontSize,
  };

  return (
    <input
      {...rest}
      value={value}
      onChange={(event) => {
        // replace commas with periods, because uniswap exclusively uses period as the decimal separator
        enforcer(event.target.value.replace(/,/g, '.'));
      }}
      // universal input options
      inputMode="decimal"
      title="Token Amount"
      autoComplete="off"
      autoCorrect="off"
      // text-specific options
      type="text"
      pattern="^[0-9]*[.,]?[0-9]*$"
      placeholder={placeholder || '0'}
      minLength={1}
      maxLength={79}
      spellCheck="false"
      sx={styles.input}
      style={propsStyle}
    />
  );
});

export default NumercialInput;

