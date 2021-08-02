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

  stakingPageWrapper: {
    width: '860px',
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

  heading: {
    display: 'flex',
    justifyContent: 'space-between',

    'h1': {
      margin: '0',
      fontWeight: '600',
      lineHeight: '1.25',
    },
  },

  body: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },

  amountArea: {
    paddingTop: '12px',

    'h4': {
      margin: '0 0 28px 0',
      fontWeight: '600',
      fontSize: [5],
      lineHeight: '1.17',
    },
  },

  valueWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: [1],
    lineHeight: '1.71',
  },

  amountBold: {
    fontWeight: '600',
  },

  votingPowerCard: {
    display: 'inline-block',
    width: '100%',
    margin: '24px 0 28px 0',
    padding: '20px',
    fontSize: [1],
    borderRadius: '8px',
    border: 'solid 1px #dae1e3',
    backgroundColor: '#ffffff',
  },

  powerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: '1.71',

    'p': {
      fontSize: [5],
      color: 'rgba(37, 62, 71, 0.5)',
      lineHeight: '1.17',
      margin: '4px 0 12px 0',
    },
  },

  iconPower: {
    height: '40px',
    width: '40px',
    padding: '8px',
    backgroundColor: '#f7fbfc',
    borderRadius: '8px',
  },

  viewGovernance: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'rgba(37, 62, 71, 0.5)',
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

  hr: {
    backgroundColor: '#dae1e3',
    border: 'none',
    height: '1px',
    margin: '0 0 11px 0'
  },

  sHakkaRewardLinkArea: {
    width: '300px',
    position: 'relative',
    top: '-48px',
    marginBottom: '24px',
    fontSize: [1],
    fontWeight: '600',
    lineHeight: '1.71',
    color: 'rgba(37, 62, 71, 0.5)'
  },

  sHakkaRewardLinkWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  sHakkaRewardLinkBtn: {
    display: 'flex',
    alignItems: 'center',
    color: '#2da287',

    ':hover': {
      cursor: 'pointer',
    },

    'img': {
      marginLeft: '4px',
    },
  },

  stakingCard: {
    width: '460px',
    padding: '20px',
    marginTop: '36px',
    fontSize: [1],
    fontWeight: 'bold',
    color: 'rgba(37, 62, 71, 0.5)',
    border: '1px solid #dae1e3',
    borderRadius: '8px',
  },

  hakkaBalanceWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },

  optionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

  },

  optionWrapper: {
    height: '36px',
    width: '144px',
    display: 'flex',
    borderRadius: '8px',
    backgroundColor: '#f7fbfc',
  },

  optionItem: {
    width: '36px',
    heigth: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px 10px',
    borderRadius: '8px',

    ':hover': {
      cursor: 'pointer',
    },
  },

  optionItemActive: {
    width: '36px',
    heigth: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px 10px',
    borderRadius: '8px',
    backgroundColor: '#ebf0f2',
    color:'#253e47',

    ':hover': {
      cursor: 'pointer',
    },
  },

  lockTimeUntil: {
    fontSize: [2],
    fontWeight: '600',
    lineHeight: '1.5',
    color: '#253e47',
  },

  getsHakkaWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '20px',
    fontSize: [2],
    color: '#253e47',
    lineHeight: '1.5'
  },

  stakeBtn: {
    paddingTop: '36px',
  },
};