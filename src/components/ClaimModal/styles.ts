export default {
  container: {
    position: 'relative',
    padding: '25px',
    color: '#253e47',

    '@media screen and (max-width: 576px)': {
      width: '318.75px',
    },
  },

  illustration: {
    position: 'fixed',
    width: '90px',
    height: '90px',
    margin: '-26px 0 0 -26px',
    webkitFilter: 'blur(20px)',
    filter: 'blur(20px)',
    backgroundColor: 'rgba(217, 251, 227, 0.3)',
    zIndex: '1',
  },

  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
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

  stateCard: {
    display: 'flex',
    paddingTop: '28px',
  },

  stateInfo: {
    paddingLeft: '36px',
    fontWeight: '600',

    h4: {
      margin: '0',
    },
    p: {
      margin: '0 0 28px 0',
      fontSize: [1],
      color: 'rgba(37,62, 71, 0.5)',
      lineHeight: '1.71',
    },

    '@media screen and (max-width: 576px)': {
      paddingLeft: '28px',
    },

  },

  message: {
    fontSize: [1],
    margin: '0',
    lineHeight: '1.71',

    span: {
      fontWeight: '600',
    },
  },

  learnMoreLink: {
    paddingTop: '8px',
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(37, 62, 71, 0.5)',
    fontSize: [1],
    fontWeight: '600',
    lineHeight: '1.71',
    opacity: 0.8,
    filter: 'grayscale(100%)',
    transition: 'all 0.25s ease-out',
    textDecoration: 'none',
    
    ':hover': {
      cursor: 'pointer',
      opacity: 1,
      filter: 'grayscale(0)',
      color: '#2da287',
    },
  },

  confirmBtn: {
    marginTop: '36px',
  },

  activeRing: {
    boxShadow: '0 0 0 5px rgba(62, 189, 147, 0.25)',
    borderRadius: '50%'
  },

  lineStyle: {
    width: '1px',
    height: '56px',
    borderRight: '1px solid #2da287',
    paddingRight: '9px',
  },

  

};
