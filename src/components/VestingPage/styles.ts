export default {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '34px',

    '@media screen and (max-width: 1200px)': {
      marginLeft: '40px',
    },

    '@media screen and (max-width: 576px)': {
      marginLeft: '0',
    },
  },

  vaultPageWrapper: {
    maxWidth: '860px',
    color: '#253e47',

    '@media screen and (max-width: 1200px)': {
      width: '85%',
      maxWidth: 'none',
      padding: '0 16px 0 16px',
    },

    '@media screen and (max-width: 576px)': {
      width: '100%',
    },
  },

  backBtn: {
    display: 'flex',
    alignItems: 'center',
    fontSize: [1],
    fontWeight: '600',
    color: 'rgba(37, 62, 71, 0.5)',
  },

  iconBack: {
    paddingRight: '4px',
  },

  heading: {
    margin: '12px 0 36px 0',
    fontSize: [5],
    color: '#253e47',
    fontWeight: '600',
    lineHeight: '1.17',
  },

  vestingCardWrapper: {
    border: 'solid 1px #dae1e3',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '100px',
  },

  vestingCard: {
    display: 'flex',
    color: '#253e47',

    '@media screen and (max-width: 1150px)': {
      flexDirection: 'column'
    },


  },

  balanceCard: {
    paddingRight: '103px',

    '@media screen and (max-width: 1150px)': {
      marginBottom: '28px',
    },
  },

  iconWithdrawAvailableBackgroundColor: {
    height: '48px',
    width: '48px',
    padding: '4px',
    borderRadius: '8px',
    backgroundColor: 'rgba(62, 189, 147, 0.1)',
  },

  iconWaitingBackgroundColor: {
    height: '48px',
    width: '48px',
    padding: '4px',
    borderRadius: '8px',
    backgroundColor: '#f7fbfc',
  },

  vestingCardItemHeading: {
    margin: '16px 0 4px 0',
    fontSize: [1],
  },

  balanceValueCard: {
    '@media screen and (max-width: 1150px)': {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  balanceAmount: {
    fontSize: [5],
    lineHeight: '1.17',
    whiteSpace: 'nowrap',
  },

  claimableAmount: {
    fontSize: [5],
    lineHeight: '1.17',
    color: '#2da287',
  },

  vestingBalanceValue: {
    paddingLeft: '12px',
    fontSize: [1],
    fontWeight: '600',
    color: 'rgba(37, 62, 71, 0.5)',
    lineHeight: '1.17',

    '@media screen and (max-width: 1150px)': {
      paddingLeft: '0',
      marginTop: '4px',
    },
  },

  displayFlex:{
    display: 'flex',
  },

  addMetamaskBtn: {
    display:'flex',
    alignItems: 'center',
    padding: '4px 6px',
    marginLeft: '12px',
    height: '28px',
    borderRadius: '8px',
    backgroundColor: '#f7fbfc',
    border: 'none',

    ':hover' :{
      cursor: 'pointer',
      backgroundColor: '#3ebd93',
    }
  },

  iconAdd: {
    width: '16px',
    marginRight: '2px',
  },

  activeArea: {
    display: 'flex',
    alignItems: 'flex-end',

    '@media screen and (max-width: 1150px)': {
      flexDirection:'column-reverse',
      alignItems: 'center ',
    },

    '@media screen and (max-width: 576px)': {
      width: '100%',
      alignItems: 'flex-start ',
    },
  },

  linkWrapper: {
    display: 'flex',
    marginRight: '150px',
    whiteSpace: 'nowrap',
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

    '@media screen and (max-width: 1150px)': {
      marginRight: '0',
    },
  },

  iconLink: {
    paddingLeft: '4px',
  },

  claimBtn: {
    width: '390px',
    marginTop: '36px',

    '@media screen and (max-width: 1150px)': {
      width: '100%',
      marginBottom: '20px',
    },

  },








}