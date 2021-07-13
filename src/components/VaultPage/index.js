/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Box } from 'rebass'
import images from 'src/images'
import styles from './styles'
import MyButton from 'src/components/Common/MyButton'

const BlankScreen = (props) => {

  return (
    <Box sx={styles.container}>
      <div sx={styles.header}>
        <h1 sx={styles.title}>Guild Bank</h1>
        <div sx={{
          display: 'flex',
          alignItems: 'center',
          '@media screen and (max-width: 576px)': {
            position: 'fixed',
            bottom: '0',
            padding: '12px 16px 12px 16px',
            marginLeft: '-16px',
            width: '100vw',
            backgroundColor: '#f7fbfc',
            boxShadow: '0 -4px 16px 0 rgba(123, 135, 148, 0.25)',
            justifyContent: 'space-between',
          },
        }}>
          <div sx={{ display: 'flex', paddingRight: '12px', '@media screen and (max-width: 576px)': { paddingRight: '0' } }}>
            <img src={images.iconEthereumDark} alt='Ethereum Icon' />
            <span sx={{
              whiteSpace: 'nowrap',
              color: '#253e47',
              fontWeight: 'bold',
              marginLeft: '4px',
            }}>
              Ethereum
            </span>
          </div>
          <div sx={{
            width: '153px',
            '@media screen and (max-width: 576px)': {
              width: '176px',
              order: '-1',
            }
          }}>
            <MyButton click={() => { }}>0x1234…1234</MyButton>
          </div>
          <img sx={{ padding: '12px', marginLeft: '12px', borderRadius: '8px', backgroundColor: 'rgba(62, 189, 147, 0.1)', '@media screen and (max-width: 576px)': { marginLeft: '0' } }} src={images.iconAccount} alt='Account Icon' />
        </div>
      </div>
      <div sx={styles.body}>
        <div sx={styles.infomationArea}>
          <h3 sx={styles.subTitle}>Burn to get value</h3>
          <div sx={styles.contract}>
            <span>Contract</span>
            <span sx={styles.contractAddress}>0x0E29e5Ab…47dE3bcd</span>
          </div>
          <p>Description Description Description Description Description Description</p>
          <div sx={styles.hakkaBalance}>
            <span>Burn</span>
            <span>HAKKA Balance: 5699.3228</span>
          </div>
          <hr sx={styles.hr} />
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '11px',fontWeight:'600'}}>
            <span style={{color: 'rgba(37, 62, 71, 0.5)'}}> Know more</span>
            <div style={styles.wikiLinkArea} onClick={()=>{window.open('https://hakka-finance.gitbook.io/hakka-wiki', '_blank').focus()}}>
              <span style={{color: '#2da287'}}>Visit Wiki</span>
              <img src={images.iconForwardGreen} alt='link' />
            </div>
          </div>
        </div>
        <div>
         {/* 表單區 */}
        </div>
      </div>
    </Box >
  )
}

export default BlankScreen