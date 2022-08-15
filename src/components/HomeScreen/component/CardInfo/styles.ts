import images from "../../../../images";

export default {
  card_responsive: {
    display: 'grid',
    gridGap: 3,
    gridTemplateColumns: '1fr 1fr',
    maxWidth: '1200px',
    '@media screen and (max-width: 1180px)': {
      gridTemplateColumns: '1fr',
      // maxWidth: '400px'
    },
  },
  // big green card
  cardFirstContainer: {
    padding: '20px',
    border: '1px solid #6ad7a8',
    borderRadius: '8px',
    height: '100%',
    maxHeight: '250px',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundImage: `linear-gradient(90deg, #44D2BA 1.76%, #75E3B9 28.53%, #8CEBB9 63.21%, rgba(255, 255, 255, 0) 67.64%), url(${images.iconHomePageLinkBgImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left, right',
    backgroundSize: 'auto, contain',
    cursor: 'pointer',
    boxShadow: '0 8px 16px -8px rgba(123, 135, 148, 0.25)',
    transition: 'all 0.25s ease-out ',

    '& .sub-content': {
      opacity: '.5',
      transition: 'all 0.25s ease-out',

    },

    ':hover': {
      '& .sub-content': {
        opacity: 1,
      },

      ':active': {
        transform: 'scale(.98)',
      },

      borderColor: '#3ebd93',
    },
  },

  // small cards
  cardContainer: {
    maxHeight: '250px',
    minHeight: '200px',
    padding: '20px',
    border: '1px solid #ebf0f2',
    height: '100%',
    borderRadius: '8px',
    // marginTop: '36px',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'all 0.25s ease-out ',

    boxShadow: '0 8px 16px -8px rgba(123, 135, 148, 0.25)',

    ':last-child': {
      marginRight: 0,
    },

    '& .sub-content': {
      // opacity: '.5',
      filter: 'grayscale(100%)',
      transition: 'all 0.25s ease-out',
      '& .text': {
        color: 'rgba(37, 62, 71, 0.5)',
      },
    },

    ':hover': {
      transition: 'all 0.25s ease-out ',
      borderColor: '#3ebd93',

      '& .sub-content': {
        opacity: 1,
        filter: 'grayscale(0)',

        '& .text': {
          color: '#2da287',
        },
      },
    },

    ':active': {
      transform: 'scale(.98)',
    },
  },

  cardImg: {
  },

  cardFirstImg: {
    padding: '10px',
    borderRadius: '8px',
    backgroundImage: 'linear-gradient(45deg, #d9fbe3, #ffffff 100%)',
  },

  cardHeading: {
    color: '#253e47',
    fontWeight: 'bold',
    fontFamily: 'system-ui',
    fontSize: [2, 2, 2, 4],
  },

  cardFirstHeading: {
    width: '55%',
    color: '#253e47',
    // margin: '12px 0',
    fontWeight: 'bold',
    fontFamily: 'system-ui',
    fontSize: [3, 3, 4, 5],
  },
  subText: {
    maxWidth: '58%',
    fontSize: [1, 1, 2, 3],
    fontWeight: '600',
    color: '#253e47',
  },

  forwardImg: {
    cursor: 'pointer',
  },
  subTextGreen: {
    color: 'text_grey',
    fontWeight: '600',
    fontSize: [1, 1, 2, 3],
  },
  anchor: {
    textDecoration: 'none',
  },
};
