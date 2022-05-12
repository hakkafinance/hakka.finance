import merge from 'lodash/merge';
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
      display: 'block',

      h1: {
        marginBottom: '20px',
        fontSize: '24px',
      },
    },
  },

  votingPowerArea: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '40px',
    marginBottom: '60px',
  },

  body: {
    display: 'block',
  },

  normalButton: NormalButton,

  governanceButton: {
    ...NormalButton, ml: 'auto', mr: '1rem',
  },

  gridBlock: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
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
};
