/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Box, Flex, Text } from 'rebass'
import images from 'src/images'
import styles from './styles'
const CardPorduct = props => {
  const { icon, cardName } = props
  return (
        <>
            <Box sx={styles.card} >
                <Flex justifyContent="space-between">
                    <Box >
                        <img sx={styles.img_icon} src={icon}/>
                    </Box>
                    <Box >
                        <Flex alignItems="center">
                            <Text sx={styles.text_visit} className="text-visit" mr="1"> Visit</Text>
                            <img className="top-left-icon" src={images.iconLinkNormal}/>
                        </Flex>
                    </Box>
                </Flex>

                <Flex sx={styles.card_content} mt="auto" >
                    <Text sx={styles.card_text}>{cardName}</Text>
                    <Flex justifyContent="space-between">
                        <Box sx={styles.dropdown_text}>Learn more</Box>
                        <img src={images.iconDown} />
                    </Flex>
                </Flex>
            </Box>
        </>
  )
}
export default CardPorduct
