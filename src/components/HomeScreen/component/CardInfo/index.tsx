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
      title: 'Roam Around',
      subTitle: 'Hakka Ecosystem',
      subContent: 'Check out unique HAKKA products',
      click: () => {navigate('/products')},
      bgColor: 'rgba(62, 189, 147, 0.1)',
      bgImage: `url(${images.iconHakkaProduct})`
    },
    {
      imageBottom: 'iconArrowDown',
      title: 'What’s',
      subTitle: 'HAKKA Token',
      subContent: 'Check to learn more about HAKKA',
      click: () => { location.href = '#whatHakka'; },
      bgColor: 'rgba(62, 189, 147, 0.1)',
      bgImage: `url(${images.iconWhatHakkaBanner})`
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
