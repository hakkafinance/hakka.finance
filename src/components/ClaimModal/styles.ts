export default {
  container: {
    padding: '25px',
    color: '#253e47',

    '@media screen and (max-width: 576px)': {
      width:'318.75px',
    },
  },

  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    fontSize: [0],

    'h2':{
      margin: '0',
      fontWeight: 'bold',
      lineHeight: '1.33',
    },
  },

  stateCard: {
    display:'flex', 
    paddingTop: '28px',
  },

  stateInfo: {
    paddingLeft:'36px',
    fontWeight: '600',

    'h4':{
      margin: '0'
    },
    'p':{
      margin: '0 0 28px 0',
      fontSize: [1],
      color: 'rgba(37,62, 71, 0.5)',
      lineHeight: '1.71',
    },

    '@media screen and (max-width: 576px)': {
      paddingLeft:'28px',
    },

    
  },

  message: {
    fontSize: [1],
    margin: '0',
    lineHeight: '1.71',

    'span':{
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

    ':hover': {
      cursor: 'pointer',
      opacity: 1,
      filter: 'grayscale(0)',
      color: '#2da287'
    },
  },

  confirmBtn:{
    marginTop: '36px',
  },

  ringStyle: {
    height: '20px',
    width: '20px',
    border: '1px solid #2da287',
    borderRadius: '50%',
    backgroundColor: '#ebf8f4',
    fontSize: [1],
    color: '#2da287',
    fontWeight: '600',
    paddingLeft: '5px',
  },

  activeRing: {
    position: 'relative',
    zIndex: '1',
    height: '20px',
    width: '20px',
    boxShadow: '0 0 0 5px #ebf8f4',
    border: '1px solid #2da287',
    borderRadius: '50%',
    backgroundColor: '#ebf8f4',
    fontSize: [1],
    color: '#2da287',
    fontWeight: '600',
    paddingLeft: '5px',
  },

  lineStyle: {
    position: 'relative',
    zIndex: '2',
    width: '1px',
    height: '55px',
    borderRight: '1px solid #2da287',
    paddingRight: '10px',
  },

}