/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Box, Card, Flex } from 'rebass';
import images from '../../../../images';
import styles from './styles';

function CardInfo(props) {
  const cardHeadContent = [
    {
      imageTop: 'iconForwardGray',
      title: 'Roam Around <br/> Hakka Ecosystem',
      subContent: 'Check out unique HAKKA products',
      click: () => { location.href = 'products' },
      icon: 'iconLight',
    },

    {
      imageTop: 'iconArrowDown',
      title: 'What’s <br/> HAKKA Token',
      subContent: 'Check to learn more about HAKKA',
      click: () => { location.href = '#whatHakka'; },
      icon: 'iconToken',
    },
  ];

  const renderCard = () => cardHeadContent.map((item, i) => (
    <a sx={styles.anchor} key={item.title}>
      <Box
        key={item.title}
        flexDirection="column"
        justifyContent="space-between"
        sx={styles.cardContainer}
        onClick={() => { item.click(); }}
      >
        <Flex justifyContent="flex-end">
          <img sx={styles.cardImg} src={images[item.imageTop]} alt="" />
        </Flex>
        <Box>
          <img src={images[item.icon]} alt="" />
          <Box sx={styles.cardHeading} mt='2' mb="2" dangerouslySetInnerHTML={{ __html: item.title }} />
          <Flex
            sx={styles.subContent}
            className="sub-content"
            pt="0"
            justifyContent="space-between"
            alignItems="center"
            onClick={() => { item.click(); }}
          >

            <div className="text" sx={styles.subTextGreen}>
              {item.subContent}
            </div>
          </Flex>
        </Box>
      </Box>
    </a>
  ));
  return (
    <Box>
      <Box sx={styles.card_responsive}>
        <Box onClick={() => { location.href = 'challenge'; }}>
          <Card sx={styles.cardFirstContainer}>
            <Flex justifyContent="flex-end">
              <img sx={styles.forwardImg} src={images.iconArrowRightWhite} alt="" />
            </Flex>
            <img src={images.iconRocket} width='20px' height='20px' />
            <Box sx={styles.cardFirstHeading}>
              Play To Earn!
            </Box>
            <Flex
              sx={styles.subContent}
              pt="0"
              className="sub-content"
              justifyContent="space-between"
              alignItems="center"
            >
              <span sx={styles.subText} className="text">Become a DeFi master and win NFTS by completing simple missions</span>
            </Flex>
          </Card>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridGap: 3,
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          {renderCard()}
        </Box>
      </Box>
    </Box>
  );
}

export default CardInfo;
