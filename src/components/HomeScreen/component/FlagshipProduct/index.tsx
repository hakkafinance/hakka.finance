/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Flex, Box } from 'rebass';
import images from '../../../../images';
import types from 'prop-types';
import styles from './styles';

function FlagshipProduct(props) {
  const { item, i, link } = props;
  return (
    <Flex onClick={() => { window.open(link, '_blank').focus(); }} alignItems="center" key={i} sx={styles.product} mt="2">
      <img sx={styles.imageProduct} src={images[item.image]} alt="" />
      <Box sx={styles.productHeading} ml="3">{item.title}</Box>
    </Flex>
  );
}

FlagshipProduct.propTypes = {
  item: types.object,
  i: types.number,
  link: types.string,
};

export default FlagshipProduct;
