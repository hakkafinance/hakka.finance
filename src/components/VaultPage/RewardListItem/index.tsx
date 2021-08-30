/** @jsx jsx */
import { jsx } from 'theme-ui';
import types from 'prop-types';
import BigNumber from 'bignumber.js';
import images from '../../../images/index';
import styles from './styles';

const RewardItem = (props) => {
  const {
    rewardTokens,
    tokenAddress,
    setRewardTokens,
    onChange,
    checked,
    tokenName,
    isDefaultToken,
    receiveAmount,
    bankBalance,

  } = props;
  const handleTokenDeleteClick = () => {
    const newObj = JSON.parse(JSON.stringify(rewardTokens));
    delete newObj[tokenAddress];
    setRewardTokens(newObj);
  };

  return (
    <div sx={styles.rewardItemWrapper}>
      <div sx={styles.itemInfo}>
        <label sx={styles.checkBoxLabel}>
          <input
            sx={styles.checkBox}
            type="checkbox"
            // id={label}
            // name={label}
            // checked={checked}
            onChange={onChange}
          />
          {checked ? <img src={images.iconChekBoxChecked} /> : <img src={images.iconChekBoxUnchecked} />}
          <span sx={styles.tokenName}>{tokenName}</span>
        </label>
        {isDefaultToken
          || <img sx={styles.iconTrash} src={images.iconTrash} onClick={() => handleTokenDeleteClick()} alt="delete this reward" />}

      </div>
      {checked
        ? (
          <div>
            <span sx={styles.receiveAmount}>{receiveAmount?.isEqualTo(new BigNumber(0)) ? '0' : receiveAmount?.toFixed(4) }</span>
            /
            <span sx={styles.bankBalance}>{bankBalance}</span>
          </div>
        )
        : <span sx={styles.unselectedReward}>Unselected Reward</span>}
    </div>
  );
};

RewardItem.propTypes = {
  tokenAddress: types.string,
  tokenName: types.string,
  receiveAmount: types.any, // BigNumber not exists
  bankBalance: types.string,
  isDefaultToken: types.bool,
  checked: types.bool,
  onChange: types.func,
  rewardTokens: types.object,
  setRewardTokens: types.func,
};

export default RewardItem;
