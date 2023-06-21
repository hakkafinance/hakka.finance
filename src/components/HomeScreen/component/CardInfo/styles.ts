export default {
  card_responsive: {
    display: 'grid',
    gridGap: 3,
    gridTemplateColumns: '1fr 1fr 1fr',
    maxWidth: '1200px',
    '@media screen and (max-width: 1180px)': {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr 1.5fr',

      '& .first-card': {
        gridColumnStart: '1',
        gridColumnEnd: '3',
      },
    },
  },

  // small cards
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    maxHeight: '300px',
    minHeight: '200px',
    padding: '20px 16px 16px 20px;',
    border: '1px solid #ebf0f2',
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
    margin: '0 0 16px 0',
    height: '24px',

    '@media screen and (max-width: 576px)': {
      lineHeight: '16px',
    },
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
