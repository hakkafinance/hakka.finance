/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Box, Card, Flex } from 'rebass';
import images from '../../../../images';
import styles from './styles';
import { navigate } from 'gatsby';

function CardInfo(props) {
  const cardHeadContent = [
    {
      imageBottom: 'iconForwardGray',
      title: 'Hakka World Cup',
      subTitle: 'Group Stage',
      subContent: 'Bet by claiming NFTs on Galxe & get rewarded!',
      click: () => { window.open('https://galxe.com/hakkafinance/campaign/GCmrxUw5Vs', '_blank').focus()},
      bgColor: '#B5F8CE',
      bgImage: `url(${images.iconHomePageLinkIntelligenceBgImg})`
    },

    {
      imageBottom: 'iconArrowDown',
      title: 'What’s <br/> HAKKA Token',
      subContent: 'Check to learn more about HAKKA',
      click: () => { location.href = '#whatHakka'; },
      bgColor: '#FFFFFF',
      bgImage: '',
    },
  ];

  const renderCard = () => cardHeadContent.map((item, i) => (
    <a sx={styles.anchor} key={item.title}>
      <Box
        key={item.title}
        sx={styles.cardContainer}
        style={{ backgroundColor: item.bgColor, backgroundImage: item.bgImage }}
        onClick={() => { item.click(); }}
      >
        <Box sx={styles.cardHeading}>
          <Box dangerouslySetInnerHTML={{ __html: item.title }} />
          <p sx={styles.subTitle}>{item.subTitle}</p>
          <p sx={styles.subTextGreen} className="sub-content text">
            {item.subContent}
          </p>
        </Box>
        <img sx={styles.cardImg} src={images[item.imageBottom]} />
      </Box>
    </a>
  ));
  return (
    <Box>
      <Box sx={styles.card_responsive}>
        <Box onClick={() => navigate('/play2earn-intro')}> 
          <Card sx={styles.cardFirstContainer}>
            <Box>
              <Box sx={styles.cardFirstHeading}>
                Play To Earn!
              </Box>
              <Box style={{ height: '22px' }}></Box>
              <p sx={styles.subText} className="sub-content text">
                Become a DeFi master and win NFTS by completing simple missions
              </p>
            </Box>
            <img src={images.iconRocket} width='20px' height='20px' />
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
