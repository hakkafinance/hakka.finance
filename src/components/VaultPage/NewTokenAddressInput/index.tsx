/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useEffect, useState } from 'react';
import styles from './styles';
import { MyButton } from '../../Common';
import { useActiveWeb3React } from '../../../hooks/web3Manager';
import {
  isAddress,
  isERC20Contract,
  getTokenDecimals,
  getTokenName,
  getTokenSymbol,
} from '../../../utils/index';

interface NewTokenAddressInputProps {
  addressInputValue: string;
  setAddressInputValue: (input: string) => void;
  rewardTokens: any;
  setRewardTokens: any;
  setIsShowNewTokenArea: (input: boolean) => void;
}

const NewTokenAddressInput = (props: NewTokenAddressInputProps) => {
  const {
    addressInputValue,
    setIsShowNewTokenArea,
    setRewardTokens,
    setAddressInputValue,
    rewardTokens
  } = props;
  const { provider: library } = useActiveWeb3React();
  const [tokenInfo, setTokenInfo] = useState<(string | number)[]>(['']);
  const [isAddBtnDisabled, setIsAddBtnDisabled] = useState<boolean>(true);
  // const [addTokenError, setAddTokenError] = useState<string>('');

  const [isErc20, setIsErc20] = useState();
  useEffect(() => {
    // setAddTokenError('');
    if (addressInputValue && isAddress(addressInputValue) && library) {
      isERC20Contract(addressInputValue, library).then((result: any) => {
        setIsErc20(result);
        if (!result) {
          // setAddTokenError('This address is not an ERC20 contract');
          setAddressInputValue('');
        }
      });
    }
  }, [addressInputValue]);

  // get the TokenName TokenSymbol TokenDecimals of the new token
  useEffect(() => {
    if (addressInputValue && isAddress(addressInputValue) && !!isErc20) {
      Promise.all([
        getTokenName(addressInputValue, library),
        getTokenSymbol(addressInputValue, library),
        getTokenDecimals(addressInputValue, library),
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
    if (isAddress(addressInputValue)) {
      setIsShowNewTokenArea(false);

      const newTokenInfo = {
        name: tokenInfo[0],
        symbol: tokenInfo[1],
        decimals: tokenInfo[2],
      };

      // Check the address is duplicate or not
      const tokensInfoValue: { decimals: number, name: string, symbol: string }[] = Object.values(rewardTokens);
      let duplicateTokens: (string | number)[];

      for (let i = 0; i < tokensInfoValue.length; i++) {
        const tokenInfo = Object.values(tokensInfoValue[i]);
        duplicateTokens = tokenInfo.filter((value) => value === newTokenInfo.name);
        if (duplicateTokens.length !== 0) {
          break;
        }
      }

      // Add token information to RewardTokenList
      if (duplicateTokens.length === 0) {
        setRewardTokens((prevState: any) => ({
          ...prevState,
          [addressInputValue]: newTokenInfo,
        }));
      }
      setIsAddBtnDisabled(true);
    } else {
      console.log('It is not a address');
    }
    setAddressInputValue('');
  };

  return (
    <div sx={styles.container}>
      <div sx={styles.NewTokenAddressInputWrapper}>
        <input
          placeholder="Token Address"
          sx={styles.input}
          value={addressInputValue}
          onChange={(event) => setAddressInputValue(event.target.value)}
        />
      </div>
      <div sx={styles.addButton}>
        <MyButton
          styleKit="green"
          disabled={isAddBtnDisabled}
          onClick={handleAddBtnClick}
        >
          Add
        </MyButton>
      </div>
    </div>
  );
};

export default NewTokenAddressInput;
