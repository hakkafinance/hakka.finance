/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Box, Flex, Text } from 'rebass'
import images from 'src/images'
import styles from './styles'
import MyButton from 'src/components/Common/MyButton'
import types from 'prop-types'
const InfoProduct = props => {
  const { dataInfo, infoTag, onClose, isShowInfoProduct } = props

  // console.log('dataInfo', dataInfo)

  const onCloseInfo = () => {
    onClose(false)
  }
  return (
    <>
      <Flex sx={isShowInfoProduct ? styles.info_section_show : styles.info_section}>
        <Box sx={styles.infoTitle}>
          <Flex sx={styles.infoTitle_name} mt="32px" justifyContent="space-between">
            <Box>{dataInfo.cardName ?? 'BlackHoleSwap'}</Box>
            <Box sx={styles.icon_delete_title} onClick={onCloseInfo}>
              <img src={images.iconDeleteRound} />
            </Box>
          </Flex>
          <Flex flexWrap='wrap' mt="20px">
            <Box sx={styles.tag_box} mr='8px' mt='8px'>#{infoTag[0]}</Box>
            <Box sx={styles.tag_box} mt='8px'>#{infoTag[1]}</Box>
          </Flex>
        </Box>

        <Box sx={styles.infoContent} mt="16px">
          <Box >
            <Flex alignItems="flex-start" justifyContent="space-between">
              <p sx={styles.infoContent_text}>
                {dataInfo.info ?? 'By integrating lending protocols to leverage the excess supply while borrowing on the inadequate side, BlackHoleSwap can therefore process transactions far exceeding its existing liquidity. Compared to other AMMs, BlackHoleSwap provides nearly infinite liquidity with the lowest price slippage, maximizing capital utilization.'}
              </p>
              <img onClick={onCloseInfo} sx={styles.icon_delete} src={images.iconDeleteRound} />
            </Flex>
          </Box>
          <Box mt="32px">
            <Flex sx={styles.btn_section} >
              <MyButton disabled={!dataInfo.whitepaper} click={() => { window.open(dataInfo.whitepaper, '_blank').focus() }}>Whitepaper</MyButton>
              <Box ml="28px" mt="12px"></Box>
              <MyButton disabled={!dataInfo.vist} click={() => { window.open(dataInfo.vist, '_blank').focus() }} type="green">{dataInfo.cardName==='Crypto Structured Fund'?'Visit Alpha CSF':'Visit'}</MyButton>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  )
}
InfoProduct.propTypes = {
  dataInfo: {},
  // infoTag:{},
  onClose: types.func,
  isShowInfoProduct: types.bool
}
export default InfoProduct
