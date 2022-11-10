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
    backgroundColor: '#8CEBB9',
    backgroundImage: `url(${images.iconHomePageLinkBgImg}),
      linear-gradient(94.3deg, #44D2BA 7.15%, rgba(68, 210, 186, 0) 84.7%)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right, left',
    backgroundSize: 'contain, auto',
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxHeight: '250px',
    minHeight: '200px',
    padding: '24px 20px 16px 20px',
    border: '1px solid #ebf0f2',
    height: '100%',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.25s ease-out',
    backgroundPosition: 'bottom right',
    backgroundRepeat: 'no-repeat',
    boxShadow: '0 8px 16px -8px rgba(123, 135, 148, 0.25)',

    '& .sub-content': {
      opacity: '.5',
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
          color: 'black',
        },
      },
    },

    ':active': {
      transform: 'scale(.98)',
    },
  },

  cardImg: {
    height: '24px',
    width: '24px',
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
    fontSize: '16px',
  },

  subTitle: {
    color: 'rgba(0, 75, 79, 0.6)',
    margin: '0 0 16px 0',
  },

  cardFirstHeading: {
    width: '55%',
    color: '#253e47',
    fontWeight: 'bold',
    fontFamily: 'system-ui',
    fontSize: [3, 3, 4, 5],
  },
  subText: {
    width: '58%',
    margin: '16px 0 0',
    fontSize: [1, 1, 2, 3],
    fontWeight: '600',
    color: '#253e47',
    lineHeight: '18px',
    fontFamily: 'system-ui',
  },

  forwardImg: {
    cursor: 'pointer',
  },
  subTextGreen: {
    fontWeight: '600',
    fontSize: '14px',
    paddingRight: '53px',
    lineHeight: '18px',

    '@media screen and (max-width: 576px)': {
      paddingRight: '20px',
    },
  },
  anchor: {
    textDecoration: 'none',
  },
};
