export default {
  flexSpaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },  
  
  container: {
    width: '100%',
    position: 'relative',
    padding: '20px 12px',
    color: '#253e47',

    '@media screen and (max-width: 576px)': {
      width: '318.75px',
    },

    p: {
      margin: '0',
    },
  },

  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '32px',
    fontSize: [0],
    position: 'relative',
    zIndex: '2',

    h2: {
      margin: '0',
      fontWeight: 'bold',
      lineHeight: '1.33',
    },

    img: {
      ':hover': {
        cursor: 'pointer',
      },
    },
  },

  hakkaBalanceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    fontSize: '14px',
    color: 'rgba(37, 62, 71, 0.5)',
    fontWeight: 'bold',
  },

  numericalInputWrapper: {
    marginBottom: '20px',
  },

  sHakkaBalanceTitle: {
    fontSize: '14px',

    span: {
      fontSize: '14px',
      fontWeight: 'bold',
    },
  },

  sHakkaInFarmContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '4px',
    marginBottom: '28px',
  },  

  sHakkaPoolLink: {
    display: 'flex',
    fontSize: '14px',
    color: 'rgba(37, 62, 71, 0.5)',
    fontWeight: '600',

    p: {
      marginRight: '4px'
    },

    ':hover': {
      cursor: 'pointer',
    },
  },

  hr: {
    borderTop: '1px solid rgba(218, 225, 227, 1)',
  },

  receiveHakkaTitle: {
    fontWeight: 'bold',

  },

  receiveHakkaWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '50px',
    fontSize: '18px',
    fontWeight: '600',

    span: {
      marginLeft: '8px',
    },
  },
};
  