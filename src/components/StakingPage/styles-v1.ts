import { ThemeUICSSObject } from 'theme-ui';
import { NormalButton } from './StakePositionItem/buttonStyle';

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

    h1: {
      margin: '0',
      fontWeight: '600',
      lineHeight: '1.25',
    },

    '@media screen and (max-width: 576px)': {
      flexDirection: 'column-reverse',
      alignItems: 'flex-start',

      h1: {
        marginTop: '20px',
        fontSize: '24px',
      },
    },
  },

  body: {
    '.subtitle': {
      display: 'inline-block',
      fontSize: '14px',
      fontWeight: '600',
      margin: '0',
      lineHeight: '24px',
      opacity: 0.8,
      filter: 'grayscale(100%)',
      transition: 'all 0.25s ease-out',
      color: 'rgba(37, 62, 71, 0.5)',
      textDecoration: 'none',

      img: {
        verticalAlign: 'middle',
      },

      ':hover': {
        cursor: 'pointer',
        opacity: 1,
        filter: 'grayscale(0)',
        color: '#2da287',
      },
    },

    '@media screen and (max-width: 576px)': {
      '.subtitle': {
        margin: '8px 0 20px 0',
      },
    },
  },

  btnBack: {
    display: 'inline-flex',
    paddingTop: '36px',
    fontSize: '0.875rem',
    color: 'rgba(37, 62, 71, 0.5)',
    fontWeight: '600',
    lineHeight: '1.71',
    opacity: 0.8,
    filter: 'grayscale(100%)',
    transition: 'all 0.25s ease-out',

    span: {
      marginLeft: '4px',
    },

    ':hover': {
      cursor: 'pointer',
      opacity: 1,
      filter: 'grayscale(0)',
      color: '#2da287',
    },

    '@media screen and (max-width: 576px)': {
      paddingTop: '12px',
    },
  },

  infoArea: {
    marginTop: '50px',
    marginBottom: '66px',

    '@media screen and (max-width: 576px)': {
      paddingTop: '0',
    },
  },

  titleWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '36px',

    h4: {
      margin: '0 24px 0 0',
      fontWeight: '600',
      fontSize: [3, 5],
      lineHeight: '1.17',
    },

    span: {
      whiteSpace: 'nowrap',
      fontSize: '14px',
      color: 'rgba(37, 62, 71, 0.5)',
    },

    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
      span: {
        paddingTop: '8px',
      }
    },
  },

  stakingInfoContainer: {
    display: 'flex',
    
    p: {
      margin: '0',
    },

    'div:first-child': {
      marginRight: '60px',
    },

    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',

      'div:first-child': {
        marginRight: '0px',
        marginBottom: '16px',
      },
    },
  },

  stakingInfoItemWrapper: {
    '& .title': {
      fontSize: '14px',
    },

    '& .content': {
      fontSize: '16px',
      fontWeight: '600',
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

    p: {
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
    textDecoration: 'none',

    ':hover': {
      cursor: 'pointer',
      opacity: 1,
      filter: 'grayscale(0)',
      color: '#2da287',
    },
  },

  hr: {
    backgroundColor: '#dae1e3',
    border: 'none',
    height: '1px',
    margin: '0 0 11px 0',
  },

  sHakkaRewardLinkArea: {
    width: '300px',
    position: 'relative',
    top: '-48px',
    marginBottom: '24px',
    fontSize: [1],
    fontWeight: '600',
    lineHeight: '1.71',
    color: 'rgba(37, 62, 71, 0.5)',

    '@media screen and (max-width: 1190px)': {
      position: 'static',
      width: '460px',
      marginTop: '28px',
    },

    '@media screen and (max-width: 576px)': {
      width: '100%',
    },
  },

  sHakkaRewardLinkWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  sHakkaRewardLinkBtn: {
    display: 'flex',
    alignItems: 'center',
    color: '#2da287',
    textDecoration: 'none',

    ':hover': {
      cursor: 'pointer',
    },

    img: {
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

    minHeight: '347px',

    '@media screen and (max-width: 1190px)': {
      marginTop: '0',
      display: 'none',
    },

    '@media screen and (max-width: 576px)': {
      width: '100%',
    },
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

    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  monthSwitch: {
    display: 'flex',
    alignItems: 'center',

    span: {
      paddingLeft: '12px',
      fontWeight: 'bold',
    },
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
    color: '#253e47',

    ':hover': {
      cursor: 'pointer',
    },
  },

  lockTimeUntil: {
    fontSize: [2],
    fontWeight: '600',
    lineHeight: '1.5',
    color: '#253e47',

    '@media screen and (max-width: 576px)': {
      marginTop: '0.5rem',
    },
  },

  getsHakkaWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '20px',
    fontSize: [2],
    color: '#253e47',
    lineHeight: '1.5',

    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
    },
  },

  stakeBtn: {
    paddingTop: '36px',
  },

  positionContainer: {
    marginBottom: '148px',

    '@media screen and (max-width: 576px)': {
      marginBottom: '80px',
    },
  },

  positionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 0 36px 0',

    '@media screen and (max-width: 576px)': {
      margin: '60px 0 36px 0',
    },
  },

  positionTitle: {
    margin: '0',

    '@media screen and (max-width: 576px)': {
      fontSize: [3],
    },
  },

  sortBtn: {
    display: 'flex',
    alignItems: 'center',
    border: '0',
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    fontSize: [1],
    fontWeight: 'bold',
    cursor: 'pointer',

    span: {
      paddingLeft: '0.25rem',
    },
  },

  switchButton: {
    ...NormalButton,
  },

  activeSortBtn: {
    backgroundColor: 'rgba(62, 189, 147, 0.1)',
    color: '#2da287',
  },

  inactiveSortBtn: {
    backgroundColor: '#f7fbfc',
    color: 'rgba(37, 62, 71, 0.25)',
  },

  inactiveSVG: {
    filter: 'grayscale(100%)',
    opacity: 0.6,
  },

  archivedTitle: {
    display: 'flex',
    fontSize: '0.875rem',
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
      color: '#2da287',
    },

    p: {
      paddingRight: '4px',
    },
  },

  governanceButton: {
    ...NormalButton, ml: 'auto', mr: '1rem',
  } as ThemeUICSSObject,

  votingPowerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '8px',
    alignItems: 'center',
  },
};
