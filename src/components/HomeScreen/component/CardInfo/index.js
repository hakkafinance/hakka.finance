/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { Box, Card, Flex, Heading } from 'rebass'
import styles from './styles'
import images from 'src/images'

function CardInfo (props) {
  const cardHeadContent = [
    {
      imageTop: '',
      title: 'Learn More <br/> About HAKKA',
      subContent: 'View wiki',
      imageBot: 'iconLinkNormal'
    },

    {
      imageTop: 'iconToken',
      title: 'What’s <br/> HAKKA Token',
      subContent: 'Scroll down',
      imageBot: 'iconScrollDown'
    }
  ]

  const renderCard = () => {
    return cardHeadContent.map((item, i) => {
      return (
        <Box
          key={item.title}
          flexDirection="column"
          justifyContent="space-between"
          sx={styles.cardContainer}
        >
          <Flex justifyContent="flex-end">
            <img sx={styles.cardImg} src={images[item.imageTop]} alt="" />
          </Flex>
          <Box>
            <Box sx={styles.cardHeading} mt="3" dangerouslySetInnerHTML={{ __html: item.title }}></Box>

            <Flex
              sx={styles.subContent}
              className="sub-content"
              mt="3"
              justifyContent="space-between"
              alignItems="center"
            >
              <span className="text" sx={styles.subTextGreen}>
                {item.subContent}
              </span>
              <img sx={styles.forwardImg} src={images[item.imageBot]} alt="" />
            </Flex>
          </Box>
        </Box>
      )
    })
  }
  return (
    <Box>
      <Box sx={styles.card_responsive}>
        <Box>
          <Card sx={styles.cardFirstContainer}>
            <Flex justifyContent="flex-end">
              <img sx={styles.cardFirstImg} src={images.iconLight} alt="" />
            </Flex>
            <Box sx={styles.cardFirstHeading} mt="3">Roam Around <br/> Hakka Ecosystem</Box>
            <Flex
              sx={styles.subContent}
              mt="3"
              className="sub-content"
              justifyContent="space-between"
              alignItems="center"
            >
              <span sx={styles.subText} className="text" >Check out unique HAKKA products</span>
              <img sx={styles.forwardImg} src={images.iconForward} alt="" />
            </Flex>
          </Card>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridGap: 3,
            gridTemplateColumns: '1fr 1fr'
          }}
        >
          {renderCard()}
        </Box>
      </Box>
    </Box>
  )
}

export default CardInfo
