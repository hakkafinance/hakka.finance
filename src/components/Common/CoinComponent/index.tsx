/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Box, Flex, Link } from 'rebass';
import images from '../../../images';
import styles from './styles';

function CoinComponent(props) {
  const { item } = props;
  return (
    <Link sx={styles.custom_link} href={item.link} target="_blank">
      <Flex
        key={item.coinName}
        sx={styles.coinContainer}
        mr="3"
        mb="12px"
        alignItems="center"
      >
        <img sx={styles.coinImg} src={images[item.imageCoin]} alt="" />
        <Box ml="2"><span sx={styles.coinName}>{item.coinName}</span></Box>
      </Flex>
    </Link>
  );
}

export default CoinComponent;
