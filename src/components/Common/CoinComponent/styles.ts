export default {
  coinContainer: {
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: '#f7fbfc',
    border: '1px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.25s ease-out',
    display: 'flex',
    justifyContent: 'center',

    '@media screen and (max-width: 576px)': {
      width: '100%',
      // margin: '12px 0 0 0',
      justifyContent: 'center',
    },

    ':hover': {
      border: '1px solid #dae1e3',
    },
  },

  coinHakka: {
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: '#f7fbfc',
    cursor: 'pointer',
    transition: 'all 0.25s ease-out',
    border: '1px solid transparent',

    ':hover': {
      border: '1px solid #dae1e3',
    },
  },

  coinImg: {
    width: '24px',
  },

  coinName: {
    fontSize: [1, 1, 2, 3],
    color: '#253e47',
    fontWeight: '600',
  },
  custom_link: {
    textDecoration: 'none',
    '@media screen and (max-width: 576px)': {
      width: '100%',
    },
  },
};
