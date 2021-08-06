export default {
  amountFontColor: {
    color: '#253e47'
  },

  positionFormWrapper: {
    display: 'flex',
    justifyContent: 'space-between',

    '@media screen and (max-width: 576px)': {
      maxWidth:'370px',
    },

    '@media screen and (max-width: 400px)': {
      maxWidth:'none',
    },
  },

  positionNumber: {
    paddingTop: '36px',
    fontSize: [3],
    fontWeight: 'bold',
    lineHeight: '1.33',
    color: 'rgba(37, 62, 71, 0.5)',
  },

  positionCard: {
    width:'800px',
    padding: '20px',
    marginBottom: '24px',
    border: '1px solid #dae1e3',
    borderRadius: '8px',
    color: 'rgba(37, 62, 71, 0.5)',
    fontWeight: '600',
    fontSize: [1],

    '@media screen and (max-width: 576px)': {
      width:'307px',
      marginBottom: '12px',
    },
  },

  positionItem: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    
    'p':{
      margin: '0',
      lineHeight: '1.71',
    },

    '@media screen and (max-width: 576px)': {
      display: 'block',
    },
  },

  stackedHakkaWrapper: {
    '@media screen and (max-width: 576px)': {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '16px',
    },
  },

  stackInfo: {
    display: 'flex',

    '@media screen and (max-width: 576px)': {
      justifyContent: 'space-between'
    },    
  },

  untilWrapper: {
    paddingRight: '60px',

    '@media screen and (max-width: 576px)': {
      display: 'flex',
      paddingRight: '0',

      'p:last-child':{
        paddingLeft: '12px'
      },
    },    
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

  redeemToggleBtn:{
    display: 'flex',
    alignItems: 'center',
    color: '#2da287',
    fontSize: [2],

    'span':{
      paddingRight: '8px',
    },

    ':hover':{
      cursor: 'pointer',
    },

    '@media screen and (max-width: 576px)': {
      justifyContent: 'center',
      marginTop: '28px',
    },    
  },

  redeemContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',

    '@media screen and (max-width: 576px)': {
      display: 'block',
    },   
  },

  inputArea: {
    width: '365px',

    '@media screen and (max-width: 576px)': {
      width: '100%',
    }, 
  },

  balance: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '24px',
    marginBottom: '12px',
  },

  receiveAmountWrapper: {
    display: 'flex',
    alignItems: 'center',
    color: '#253e47',
    fontSize: [2],

    'img':{
      paddingRight: '20px',
    },

    'p': {
      margin: '0',
    },

    '@media screen and (max-width: 576px)': {
      paddingTop: '20px',
      marginBottom: '20px'
    }, 
  },

  iconBecome: {
    '@media screen and (max-width: 576px)': {
      display: 'none',
    }, 
  },

  amountBold: {
    fontWeight: '600',
  },

  redeemBtn: {
    width: '160px',

    '@media screen and (max-width: 576px)': {
      width: '100%',
    }, 
  },
}