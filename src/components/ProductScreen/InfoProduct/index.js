/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Box, Flex, Text } from 'rebass'
import images from 'src/images'
import styles from './styles'
import MyButton from 'src/components/Common/MyButton'
const InfoProduct = props => {
  const { icon, cardName } = props
  return (
        <>
          <Flex sx={styles.info_section}>
            <Box sx={styles.infoTitle}>
                <Flex sx={styles.infoTitle_name} justifyContent="space-between" mt="32px">
                    <Box>BlackholeSwap</Box>
                    <img sx={styles.icon_delete_title} src={images.iconDelete}/>
                </Flex>
                <Flex mt="20px">
                    <Box sx={styles.tag_box}>#DEX</Box>
                    <Box sx={styles.tag_box} ml="8px">#Stablecoin</Box>
                </Flex>
            </Box>

            <Box sx={styles.infoContent} mt="16px">
                    <Box >
                        <Flex alignItems="flex-start">
                            <p sx={styles.infoContent_text}>
                                By integrating lending protocols to leverage the excess supply while borrowing on the inadequate side,
                                BlackHoleSwap can therefore process transactions far exceeding its existing liquidity. Compared to other AMMs,
                                BlackHoleSwap provides nearly infinite liquidity with the lowest price slippage, maximizing capital utilization.
                            </p>
                            <img sx={styles.icon_delete} src={images.iconDelete}/>
                        </Flex>
                    </Box>
                <Box mt="56px">
                    <Flex sx={styles.btn_section} >
                        <MyButton>Whitepaper</MyButton>
                        <Box ml="28px" mt="12px"></Box>
                        <MyButton type="green">Visit</MyButton>
                    </Flex>
                </Box>
            </Box>
          </Flex>
        </>
  )
}
export default InfoProduct
