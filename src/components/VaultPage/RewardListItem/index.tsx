/** @jsx jsx */
import { jsx } from 'theme-ui'
import images from '../../../images/index'
import styles from './styles'
import types from 'prop-types'
import BigNumber from 'bignumber.js'

const RewardItem = (props) => {
  const handleTokenDeleteClick = () => {
    let newObj =  JSON.parse(JSON.stringify(props.rewardTokens));
    delete newObj[props.tokenAddress];
    props.setRewardTokens(newObj);
  }

  return (
    <div sx={styles.rewardItemWrapper}>
      <div sx={styles.itemInfo}>
        <label sx={styles.checkBoxLabel}>
          <input
            sx={styles.checkBox}
            type='checkbox'
            // id={label}
            // name={label}
            // checked={checked}
            onChange={props.onChange}
          />
          {props.checked ? <img  src={images.iconChekBoxChecked} /> : <img src={images.iconChekBoxUnchecked} />}
          <span sx={styles.tokenName}>{props.tokenName}</span>
        </label>
        {props.isDefaultToken ||
          <img sx={styles.iconTrash} src={images.iconTrash} onClick={()=>handleTokenDeleteClick()} alt='delete this reward' />}
          
      </div>
      {props.checked
        ? <div>
            <span sx={styles.receiveAmount}>{props.receiveAmount?.isEqualTo(new BigNumber(0)) ? '0' : props.receiveAmount?.toFixed(4)  }</span>
            /
            <span sx={styles.bankBalance}>{props.bankBalance}</span>
          </div>
        : <span sx={styles.unselectedReward}>Unselected Reward</span>
      }
    </div>
  )
}

RewardItem.propTypes = {
  tokenAddress: types.string,
  tokenName: types.string,
  receiveAmount: types.any, // BigNumber not exists
  bankBalance: types.string,
  isDefaultToken: types.bool,
  checked: types.bool,
  onChange: types.func,
  rewardTokens: types.object,
  setRewardTokens:types.func,
}

export default RewardItem;