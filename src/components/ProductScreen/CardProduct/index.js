/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { jsx } from 'theme-ui'
import { Box, Flex, Text } from 'rebass'
import images from 'src/images'
import styles from './styles'
import types from 'prop-types'

const CardPorduct = props => {
  const { cardData, onShowInfo, selectedCard, isShowInfoProduct } = props
  const { icon, cardName } = cardData
  const [isShowInfo, setIsShowInfo] = useState(false)
  // console.log('is close when click x', !!isShowInfoProduct)
  const handleIsShowInfo = () => {
    onShowInfo(!isShowInfo)
    setIsShowInfo(!isShowInfo)
  }

  const handleCheckSelectedCard = () => {
    const result = cardName === selectedCard
    setIsShowInfo(result)
    // console.log(result)
  }
  useEffect(() => {
    handleCheckSelectedCard()
  }, [selectedCard])
  return (
        <>
            <Box sx={isShowInfo ? styles.card_active : styles.card} className="card-active" >
                <Flex sx={styles.card_link} justifyContent="space-between">
                    <Box>
                        <img sx={styles.img_icon} src={icon}/>
                    </Box>
                    <Box >
                        <Flex alignItems="center">
                            <Text sx={styles.text_visit} className="text-visit" mr="1"> Visit</Text>
                            <img className="top-left-icon" src={images.iconLinkNormal}/>
                        </Flex>
                    </Box>
                </Flex>

                <Flex onClick={handleIsShowInfo} sx={styles.card_content} pt="0px" mt="auto" >
                    <Text sx={styles.card_text} className="card-text" dangerouslySetInnerHTML={{ __html: cardName.replace(/\n/gmi, '<br/>') }}></Text>
                    <Flex justifyContent="space-between">
                        <Box sx={styles.dropdown_text} className="dropdown-text">Learn more</Box>
                        <Flex alignItems="flex-end">
                            <img className="bottom-right-icon" src={ isShowInfo ? images.iconUp : images.iconDown} />
                        </Flex>
                    </Flex>
                </Flex>
            </Box>
        </>
  )
}
CardPorduct.propTypes = {
  cardData: types.object,
  onShowInfo: types.bool,
  selectedCard: types.string
}
export default CardPorduct
