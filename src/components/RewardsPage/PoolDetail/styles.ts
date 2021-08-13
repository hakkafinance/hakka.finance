export default {
  btnBack: {
    display: 'flex',
    fontSize: '0.875rem',
    color: 'rgba(37, 62, 71, 0.5)',
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

    span: {
      marginLeft: '4px',
    },
  },

  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '28px',
    paddingTop: '12px',

    p: {
      margin: '0',
      fontSize: '1.5rem',
    },

    '@media screen and (max-width: 576px)': {
      display: 'block',
      height: 'auto',
    },
  },

  infoWrapper: {
    display: 'flex',
    fontSize: '0.875rem',

    'div:first-child': {
      marginRight: '36px',
    },

    '@media screen and (max-width: 576px)': {
      paddingTop: '20px',
    },
  },

  infoItem: {
    '@media screen and (max-width: 576px)': {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  infoValue: {
    paddingLeft: '12px',
    fontWeight: '600',

    '@media screen and (max-width: 576px)': {
      paddingLeft: '0',
    },
  },

  contractAddress: {
    paddingLeft: '12px',
    fontWeight: '600',
    textDecoration: 'underline',

    ':hover': {
      color: '#2da287',
      cursor: 'pointer',
    },

    '@media screen and (max-width: 576px)': {
      paddingLeft: '0',
    },
  },

  infoIcon: {
    '@media screen and (max-width: 576px)': {
      display: 'none',
    },
  },

  depositInfoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    marginTop: '28px',
    border: '1px solid #dae1e3',
    borderRadius: '8px',

    '@media screen and (max-width: 576px)': {
      display: 'block',
    },
  },

  depositInfoItem: {
    width: '46.5%',
    fontSize: '0.875rem',

    p: {
      margin: '0',
    },

    '@media screen and (max-width: 576px)': {
      width: '100%',
    },
  },

  lpTokenLinkContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  lpTokenLink: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    color: 'rgba(37, 62, 71, 0.5)',
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

    span: {
      paddingRight: '4px',
    },

    '@media screen and (max-width: 576px)': {
      marginBottom: '20px',
    },
  },

  depositInfoValue: {
    fontSize: '1rem',
    fontWeight: '600',
    paddingRight: '12px',
  },

  operateArea: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',

    '@media screen and (max-width: 576px)': {
      display: 'block',
      marginTop: '12px',
    },
  },

  operateCard: {
    width: '48.8%',
    padding: '20px 20px 28px 20px',
    border: '1px solid #dae1e3',
    borderRadius: '8px',

    ' > p: first-child': {
      margin: '0 0 20px 0',
      fontWeight: 'bold',
    },

    '> span': {
      fontSize: '0.875rem',
    },

    '@media screen and (max-width: 576px)': {
      width: '100%',
      marginBottom: '12px',
    },
  },

  rewardAmountContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: '600',
    lineHeight: '1.5',
    marginBottom: '8px',
  },

  rewardIcon: {
    padding: '4px',
    backgroundColor: '#f7fbfc',
    borderRadius: '8px',
    marginRight: '24px',
  },

  rewardInfoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItmes: 'end',
    marginTop: '20px',

    '@media screen and (max-width: 576px)': {
      display: 'block',
    },
  },

  rewardInfoLabelWrapper: {
    display: 'flex',

    p: {
      margin: '0',
      lineHeight: '1.71',
    },

    'p:first-child': {
      fontSize: '0.875rem',
    },
  },

  rewardBtn: {
    width: '101px',

    '@media screen and (max-width: 576px)': {
      width: '100%',
      marginTop: '20px',
    },
  },

  viewBtn: {
    width: '101px',
    height: '48px',
    border: 'none',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    backgroundColor: '#f7fbfc',
    fontSize: '1rem',
    textDecoration: 'none',

    span: {
      paddingRight: '4px',
      color: '#253e47',
    },

    ':hover': {
      cursor: 'pointer',
      border: '1px solid #2da287',
    },

    '@media screen and (max-width: 576px)': {
      width: '100%',
      marginTop: '20px',
    },
  },

  rewardAmount: {
    color: '#2da287',
  },

  amountIsZero: {
    color: 'rgba(37, 62, 71, 0.5)',
  },

  learnMoreLinkWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: '24px',
    color: 'rgba(37, 62, 71, 0.5)',
    fontSize: '0.875rem',

    img: {
      paddingRight: '8px',
    },
  },

  learnMoreLink: {
    textDecoration: 'underline',
    paddingLeft: '6px',

    ':hover': {
      cursor: 'pointer',
      color: '#2da287',
    },
  },

  switch: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'rgba(37, 62, 71, 0.5)',
    fontWeight: 'bold',
    lineHeight: '1.5',

    div: {
      width: '48%',
      padding: '12px 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '8px',

      ':hover': {
        cursor: 'pointer',
        color: '#2da287',
      },
    },
  },

  switchFocus: {
    backgroundColor: 'rgba(62, 189, 147, 0.1)',
    color: '#2da287',
  },

  stakeBalanceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '28px',
    color: 'rgba(37, 62, 71, 0.5)',
    fontSize: '0.875rem',
    lineHeight: '1.71',
    fontWeight: 'bold',
  },

  numericalInputWrapper: {
    padding: '12px 0 20px 0',
  },

  depositBtnContent: {
    margin: '3px 0',
    lineHeight: '1.5',
  },

  withdrawBtnContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: '1.33',

    '> div': {
      width: '48.4%',
    },

    '& .exitContent': {
      fontSize: '0.75rem',
      color: 'rgba(37, 62, 71, 0.5)',
      lineHeight: '1.33',
    },

    '@media screen and (max-width: 1199px)': {
      '> div': {
        width: '48%',
        marginBottom: '8px',
      },
    },
  },

  withdrawContent: {
    margin: '7.5px 0 7.5px 0',
    lineHeight: '1.5',

    '@media screen and (max-width: 576px)': {
      margin: '15px 0',
    },
  },

  exitBtnContent: {
    p: {
      margin: '0',
      lineHeight: '1.5',
    },
  },
};
