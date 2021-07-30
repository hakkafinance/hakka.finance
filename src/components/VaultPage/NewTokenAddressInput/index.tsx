/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useEffect, useState } from 'react';
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
  addressInputValue: string;
  setAddressInputValue: (input: string) => void;
  rewardTokens: any;
  setRewardTokens: any;
  setIsShowNewTokenArea: (input: boolean) => void;
}

const NewTokenAddressInput = (props: NewTokenAddressInputProps) => {
  const { library } = useActiveWeb3React();
  const [tokenInfo, setTokenInfo] = useState<(string | number)[]>(['']);
  const [isAddBtnDisabled, setIsAddBtnDisabled] = useState<boolean>(true);
  // const [addTokenError, setAddTokenError] = useState<string>('');

  const [isErc20, setIsErc20] = useState();
  useEffect(() => {
    // setAddTokenError('');
    if (props.addressInputValue && isAddress(props.addressInputValue) && library) {
      isERC20Contract(props.addressInputValue, library).then((result: any) => {
        setIsErc20(result);
        if (!result) {
          // setAddTokenError('This address is not an ERC20 contract');
          props.setAddressInputValue('');
        }
      });
    }
  }, [props.addressInputValue]);

  // get the TokenName TokenSymbol TokenDecimals of the new token
  useEffect(() => {
    if (props.addressInputValue && isAddress(props.addressInputValue) && !!isErc20) {
      Promise.all([
        getTokenName(props.addressInputValue, library),
        getTokenSymbol(props.addressInputValue, library),
        getTokenDecimals(props.addressInputValue, library),
      ])
        .then((value) => {
          setTokenInfo(value);
          setIsAddBtnDisabled(false);
        })
        .catch((error: string) => {
          throw error;
        });
    }
  }, [isErc20]);

  const handleAddBtnClick = () => {
    if (isAddress(props.addressInputValue)) {
      props.setIsShowNewTokenArea(false);

      const newTokenInfo = {
        name: tokenInfo[0],
        symbol: tokenInfo[1],
        decimals: tokenInfo[2],
      };

      // Check the address is duplicate or not
      let tokensInfoValue: { decimals: number, name: string, symbol: string }[] = Object.values(props.rewardTokens);
      let duplicateTokens: (string | number)[];

      for (let i = 0; i < tokensInfoValue.length; i++) {
        let tokenInfo = Object.values(tokensInfoValue[i]);
        duplicateTokens = tokenInfo.filter((value) => {
          return value === newTokenInfo.name;
        });
        if (duplicateTokens.length !== 0) {
          break;
        }
      }

      // Add token information to RewardTokenList
      if (duplicateTokens.length === 0) {
        props.setRewardTokens((prevState: any) => ({
          ...prevState,
          [props.addressInputValue]: newTokenInfo,
        }));
      }
      setIsAddBtnDisabled(true);
    } else {
      console.log('It is not a address');
    }
    props.setAddressInputValue('');
  };

  return (
    <div sx={styles.container} >
      <div sx={styles.NewTokenAddressInputWrapper}>
        <input
          placeholder={'Token Address'}
          sx={styles.input}
          value={props.addressInputValue}
          onChange={(event) => { props.setAddressInputValue(event.target.value) }}
        />
      </div>
      <div sx={styles.addButton}>
        <MyButton
          type={'green'}
          disabled={isAddBtnDisabled}
          click={handleAddBtnClick}
        >Add</MyButton>
      </div>
    </div>
  )
}

export default NewTokenAddressInput