/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import styles from './styles';
import useTokensPrice from '../../../hooks/useTokensPrice';
import { useCoingeckoTokenId } from '../../../hooks/useCoingeckoTokenId';
import { DEFAULT_TOKENS_COIN_GECKO_ID_BOOK } from '../../../constants/index';

interface RewardValueProps {
  localRewardAmount: { [key: string]: BigNumber };
  pickedRewardTokensAddress: string[];
  inputAmount: string;
  newRewardAddressInput: string;
}

const RewardValue = (props: RewardValueProps) => {
  const [tokensId, setTokensId] = useState(DEFAULT_TOKENS_COIN_GECKO_ID_BOOK);
  const newTokenId = useCoingeckoTokenId(props.newRewardAddressInput);

  useEffect(() => {
    if (props.newRewardAddressInput && newTokenId) {
      setTokensId((prevState: any) => ({
        ...prevState,
        [props.newRewardAddressInput]: newTokenId.id,
      }));
    }
  }, [newTokenId.id]);

  const tokensPrice = useTokensPrice(tokensId);
  const [rewardValue, setRewardValue] = useState<BigNumber>(new BigNumber(0));

  useEffect(() => {
    let rewardValueSum = new BigNumber(0);
    props.pickedRewardTokensAddress.map((address) => {
      if (props.localRewardAmount && tokensPrice) {
        const value = props.localRewardAmount[address]?.multipliedBy(new BigNumber(tokensPrice[address] ? tokensPrice[address] : 0));
        rewardValueSum = rewardValueSum.plus(value);
      }
    });
    setRewardValue(rewardValueSum);
  }, [props.inputAmount, props.pickedRewardTokensAddress]);

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
