/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Flex, Box } from 'rebass'
import styles from './styles'
import images from 'src/images'

function UtilityHakka () {
  const detailsInfo = [
    {
      image: 'iconParliament',
      title: 'Governance Power',
      text: `Voting Power in Governance <br/>
      Depends on the amount of wHAKKA Mintage`
    },
    {
      image: 'iconMoneyBox',
      title: 'Beneficiary Right',
      text:
        'wHAKKA is Tradable in Secondary Market & Beneficial in Reward Contract'
    }
  ]

  const renderDetailsInfo = () => {
    return detailsInfo.map((item, i) => {
      return (
        <Flex sx={styles.utilityInfoContainer} flexDirection="column" key={i}>
          <img sx={styles.utilityImgInfo} src={images[item.image]} alt="" />
          <Box sx={styles.utilityTitle} mt="20px" mb="4px">{item.title}</Box>
          <p
            sx={styles.utilityText}
            dangerouslySetInnerHTML={{ __html: item.text }}
          ></p>
        </Flex>
      )
    })
  }

  return (
    <>
      <Box sx={styles.utilityHead} mb="20px">Utility of HAKKA</Box>
      <Flex
        justifyContent="space-between"
        sx={styles.utilityTextLink}
      >
        <Flex sx={styles.utilityText}>
          <p>Stake HAKKA to get wHAKKA and bestowed below rights</p>
        </Flex>
        <Flex
          sx={styles.utilityLink}
          alignItems="center"
        >
          <Box>Stake Here</Box>
          <Flex ml="1" mt="1px"><img sx={styles.imgForward} src={images.iconForwardGreen} alt="" /></Flex>
        </Flex>
      </Flex>
      <Flex sx={styles.detailsInfo} mt="4">{renderDetailsInfo()}</Flex>
    </>
  )
}

export default UtilityHakka
