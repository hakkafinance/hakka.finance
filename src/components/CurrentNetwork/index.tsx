/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useWeb3React } from '@web3-react/core';
import images from '../../images';
import styles from './styles';
import { ChainId, ChainName } from '../../constants';

const CurrentNetwork = ({ unsupported }: { unsupported?: boolean }) => {
  const { chainId } = useWeb3React();

  if (!chainId) {
    return <div />;
  } if (unsupported) {
    return (
      <div sx={styles.chainWrapper}>
        <img src={images.iconSnapshot} alt="Chain Icon" />
        <span sx={styles.chainNameWrapper}>Wrong Network</span>
      </div>
    );
  }

  return (
    <div sx={styles.chainWrapper}>
      <img sx={styles.imgChain} src={chainId && chainId === ChainId.BSC
        ? images.iconBinanceGold
        : chainId && chainId === ChainId.POLYGON
          ? images.iconPolygon
          : chainId && chainId === ChainId.FANTOM
            ? images.iconFantom
            : images.iconEthereumDark} alt="Chain Icon" />
      <span sx={styles.chainNameWrapper}>{ChainName[chainId]}</span>
    </div>
  );
};

export default CurrentNetwork;
