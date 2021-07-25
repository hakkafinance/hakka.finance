/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useEffect, useState } from 'react';
import styles from './styles'
import MyButton from '../../Common/MyButton/index'
import { useActiveWeb3React } from '../../../hooks/index';
import {
  isAddress,
  isERC20Contract,
  getTokenDecimals,
  getTokenName,
  getTokenSymbol
} from '../../../utils/index'

interface NewTokenAddressInputProps {
  value: string;
  onUserInput: (input: string) => void;
  rewardTokens: any;
  setAddTokenError: (input: string) => void;
}

const NewTokenAddressInput = (props: NewTokenAddressInputProps) => {
  const { library } = useActiveWeb3React();
  const [addressInputValue, setAddressInputValue] = useState('');
  const [tokenInfo, setTokenInfo] = useState<(string | number)[]> (['']);
  const [addBtnDisabled, setAddBtnDisabled] = useState<boolean>(true);

  // const [isErc20, setIsErc20] = useState();
  // useEffect(() => {
  //   props.setAddTokenError('');
  //   if (addressInputValue && isAddress(addressInputValue)) {
  //     isERC20Contract(addressInputValue, library).then((result: any) => {
  //       setIsErc20(result);
  //       if (!result) {
  //         props.setAddTokenError('This address is not an ERC20 contract');
  //       }
  //     });
  //   }
  // }, [addressInputValue]);

  // console.log('isErc20', isErc20);
  console.log('addressInputValue', addressInputValue)


  return (
    <div sx={styles.container} >
      <div sx={styles.NewTokenAddressInputWrapper}>
        <input
          placeholder={'Token Address'}
          sx={styles.input}
          value={addressInputValue}
          onChange={(event) => { setAddressInputValue(event.target.value) }}
        />
      </div>
      <div sx={styles.addButton}>
        <MyButton
          type={'green'}
        >Add</MyButton>
      </div>
    </div>
  )
}

export default NewTokenAddressInput