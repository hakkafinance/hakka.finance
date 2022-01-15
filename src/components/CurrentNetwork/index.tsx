/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core';
import images from '../../images';
import styles from './styles';
import { ChainId, ChainName } from '../../constants';

const CurrentNetwork = ({ unsupported }: { unsupported?: boolean }) => {
  const { chainId, error } = useWeb3React();

  if (!chainId && !error) {
    return <div />;
  } if (error instanceof UnsupportedChainIdError || unsupported) {
    return (
      <div sx={styles.chainWrapper}>
        <img src={images.iconSnapshot} alt="Chain Icon" />
        <span sx={styles.chainNameWrapper}>Wrong Network</span>
      </div>
    );
  }

  return (
    <div sx={styles.chainWrapper}>
      <img src={chainId && chainId === ChainId.BSC ? images.iconBinanceGold
        : chainId && chainId === ChainId.POLYGON ? images.iconPolygon
        : images.iconEthereumDark} alt="Chain Icon" />
      <span sx={styles.chainNameWrapper}>{ChainName[chainId]}</span>
    </div>
  );
};

export default CurrentNetwork;
