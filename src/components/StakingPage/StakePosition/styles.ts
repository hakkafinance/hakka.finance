export default {
  
  positionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '8px',
    paddingRight: '45px',
    fontWeight: '600',
    color: 'rgba(37, 62, 71, 0.5)',
    fontSize: [1],
    lineHeight: '1.71',

    'p':{
      margin: '0',
    },
  },

  amountFontColor: {
    color: '#253e47'
  },

  positionItem: {
    display: 'flex',
  },

  positionNumber: {
    fontSize: [3],
    fontWeight: 'bold',
    lineHeight: '1.33'
  },

  DetailLink:{
    display: 'flex',
    alignItems: 'center',
    opacity: 0.8,
    filter: 'grayscale(100%)',
    transition: 'all 0.25s ease-out',

    ':hover': {
      cursor: 'pointer',
      opacity: 1,
      filter: 'grayscale(0)',
      color: '#2da287'
    },

    'span':{
      paddingRight: '4px',
    },
  },

  redeemBtn:{
    display: 'flex',
    alignItems: 'center',
    color: '#2da287',
    fontSize: [2],

    'span':{
      paddingRight: '8px',
    },
  },
}