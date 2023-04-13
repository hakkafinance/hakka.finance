/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Box } from 'rebass';
import images from '../../../../images';
import styles from './styles';
import { navigate } from 'gatsby';

function CardInfo(props) {
  const cardHeadContent = [
    {
      imageBottom: 'iconRocket',
      title: 'Play To Earn!',
      subTitle: '',
      subContent: 'Become a DeFi master and win NFTs by completing simple missions!',
      click: () => {navigate('/play2earn-intro')},
      bgColor: '#44D2BA',
      bgImage: `url(${images.iconP2eBanner})`
    },
    {
      imageBottom: 'iconForwardGray',
      title: 'Your year in Review',
      subTitle: '',
      subContent: 'Calculate how Hakka you are!',
      click: () => {navigate('/yearly-review')},
      bgColor: 'rgba(217, 251, 227, 1)',
      bgImage: `url(${images.iconYearReviewBanner})`
    },
    {
      imageBottom: 'iconForwardGray',
      title: 'Shitcoinmon!',
      subTitle: '',
      subContent: 'Turn your worst investments into mighty NFT monsters',
      click: () => { window.open('https://shitcoinmon.com/', '_blank').focus() },
      bgColor: 'rgba(29, 161, 242, 0.2)',
      bgImage: `url(${images.iconShitcoinmonBanner})`
    },
  ];

  const renderCard = () => cardHeadContent.map((item, i) => (
    <a sx={styles.anchor} className={i === 0 ? 'first-card' : ''} key={item.title}>
      <Box
        key={item.title}
        sx={styles.cardContainer}
        style={{ backgroundColor: item.bgColor, backgroundImage: item.bgImage }}
        onClick={() => { item.click(); }}
      >
        <Box sx={styles.cardHeading}>
          <Box dangerouslySetInnerHTML={{ __html: item.title }} />
          <p sx={{...styles.subTitle, color: item.subTitleColor}} >{item.subTitle}</p>
          <p sx={styles.subTextGreen} className="sub-content text">
            {item.subContent}
          </p>
        </Box>
        <img sx={styles.cardImg} src={images[item.imageBottom]} />
      </Box>
    </a>
  ));

  return (
    <Box sx={styles.card_responsive}>
      {renderCard()}
    </Box>
  );
}

export default CardInfo;
