/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Box } from 'rebass'
import images from 'src/images'
import styles from './styles'
import MyButton from 'src/components/Common/MyButton'
import { botSideBarItems } from '../../containers/SideBar/index'

const BlankScreen = (props) => {
  
  let productInfo = {};
  botSideBarItems.forEach((item) => {
    if (item.path === props.path) {
      productInfo['name'] = props.path === 'guildbank'? 'Token Burner V1' : item.name.charAt(0).toUpperCase() + item.name.slice(1)+ ' V1';
      productInfo['href'] = item.href;
    }
  })

  return (
    <Box sx={{textAlign:'center'}}>
      <img src={images.iconUnderConstruction} sx={styles.underConstructionIcon} alt="under construction icon" />
      <h2 sx={styles.title}>This page is processing</h2>
      <p sx={styles.contentText}>Please visit Hakka {productInfo['name']} for temporary</p>
      <div sx={styles.buttonSection}>
        <MyButton click={() => { window.open(productInfo['href'], '_blank').focus() }} type={'green'}>{productInfo['name']}</MyButton>
      </div>
    </Box>
  )
}

export default BlankScreen