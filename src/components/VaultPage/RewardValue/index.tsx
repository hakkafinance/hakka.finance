/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import styles from './styles';
import useTokensPriceByAddress from '../../../hooks/useTokensPriceByAddress';
import { useCoingeckoTokenId } from '../../../hooks/useCoingeckoTokenId';
import { DEFAULT_TOKENS_COIN_GECKO_ID_BOOK } from '../../../constants/index';

interface RewardValueProps {
  localRewardAmount: { [key: string]: BigNumber };
  pickedRewardTokensAddress: string[];
  inputAmount: string;
  newRewardAddressInput: string;
}

const RewardValue = (props: RewardValueProps) => {
  const {
    newRewardAddressInput,
    pickedRewardTokensAddress,
    localRewardAmount,
    inputAmount,
  } = props;
  const [tokensId, setTokensId] = useState(DEFAULT_TOKENS_COIN_GECKO_ID_BOOK);
  const newTokenId = useCoingeckoTokenId(newRewardAddressInput);

  useEffect(() => {
    if (newRewardAddressInput && newTokenId) {
      setTokensId((prevState: any) => ({
        ...prevState,
        [newRewardAddressInput]: newTokenId.id,
      }));
    }
  }, [newTokenId.id]);

  const tokensPrice = useTokensPriceByAddress(tokensId);
  const [rewardValue, setRewardValue] = useState<BigNumber>(new BigNumber(0));

  useEffect(() => {
    let rewardValueSum = new BigNumber(0);
    pickedRewardTokensAddress.map((address) => {
      if (localRewardAmount && tokensPrice) {
        const value = localRewardAmount[address]?.multipliedBy(new BigNumber(tokensPrice[address] ? tokensPrice[address] : 0));
        rewardValueSum = rewardValueSum.plus(value);
      }
    });
    setRewardValue(rewardValueSum);
  }, [inputAmount, pickedRewardTokensAddress]);

  return (
    <div sx={styles.totalValueWrapper}>
      <span>Total Value</span>
      <span sx={styles.totalValueAmount}>
        {rewardValue.isNaN() ? '0' : rewardValue.toFixed(3)}
        {' '}
        USD
      </span>
    </div>
  );
};

export default RewardValue;
