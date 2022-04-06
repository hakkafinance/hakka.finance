/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import images from '../../images';
import { HAKKA } from '../../constants';
import styles from './styles';

const AddToMetamaskBtn = ({ address = null, selectedChainId }) => {
  const { chainId } = useWeb3React();
  const addToMetamask = useCallback(() => {
    const _ethereum = window.ethereum;
    _ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: address || HAKKA[chainId || 1].address,
          symbol: 'HAKKA',
          decimals: 18,
          image:
            'https://assets.coingecko.com/coins/images/12163/small/Hakka-icon.png?1597746776',
        },
      },
    });
  }, [address, chainId]);

  return (
    <button
      onClick={addToMetamask}
      sx={styles.addMetamaskBtn}
      disabled={(selectedChainId && selectedChainId !== chainId) || !HAKKA[chainId]}
    >
      <img src={images.iconAdd} sx={styles.iconAdd} />
      <img src={images.iconMetamask} />
    </button>
  );
};

export default AddToMetamaskBtn;
