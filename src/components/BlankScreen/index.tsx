/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Box } from 'rebass';
import images from '../../images';
import { MyButton } from '../../components/Common';
import styles from './styles';
import { botSideBarItems } from '../../containers/SideBar/index';

const BlankScreen = (props) => {
  const { path:currentPath } = props;
  const productInfo = {};
  botSideBarItems.forEach((item) => {
    if (item.path === currentPath) {
      productInfo.name = currentPath === 'guildbank' ? 'Token Burner V1' : `${item.name.charAt(0).toUpperCase() + item.name.slice(1)} V1`;
      productInfo.href = item.href;
    }
  });

  return (
    <Box sx={{ textAlign: 'center' }}>
      <img src={images.iconUnderConstruction} sx={styles.underConstructionIcon} alt="under construction icon" />
      <h2 sx={styles.title}>This page is processing</h2>
      <p sx={styles.contentText}>
        Please visit Hakka
        {' '}
        {productInfo.name}
        {' '}
        for temporary
      </p>
      <div sx={styles.buttonSection}>
        <MyButton onClick={() => { window.open(productInfo.href, '_blank', 'noopener, noreferrer'); }} styleKit="green">{productInfo.name}</MyButton>
      </div>
    </Box>
  );
};

export default BlankScreen;
