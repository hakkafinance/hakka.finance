export default {
  // what hakka
  whatHakkaHeading: {
    fontSize: [5, 6, 7, 7],
    color: '#253e47',
    // marginBottom: '36px',
    fontWeight: 'normal',
  },

  whatHakkaText: {
    fontSize: [2, 2, 3, 4],
    color: '#253e47',
    maxWidth: '1200px',
    // marginBottom: '28px'
  },

  circulatingSupplyText: {
    color: '#253e47',
    fontWeight: 'bold',

    '@media screen and (max-width: 374px)': {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  listCoinHakka: {
    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
    },
  },
};
