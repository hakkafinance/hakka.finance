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

  headingBlock: {
    display: 'grid',
    gridTemplateAreas: `'title wallet' 'comment comment' 'voting-power switch-btn'`,
    '.heading-title': {
      gridArea: 'title',
    },
    '.heading-wallet': {
      gridArea: 'wallet',
    },
    '.heading-comment': {
      gridArea: 'comment',
    },
    '.heading-voting-power': {
      gridArea: 'voting-power',
    },
    '.heading-switch-btn': {
      gridArea: 'switch-btn',
    },
    '@media screen and (max-width: 576px)': {
    }
  },

  body: {
    display: 'block',
  },

  normalButton: {
    ...NormalButton,
    '& .icon': {
      ml: '6px'
    }
  },

  governanceButton: {
    ...NormalButton, ml: 'auto', mr: '1rem',
  } as ThemeUICSSObject,

  gridBlock: {
    display: 'grid',
    gridTemplateAreas: `'1fr 1fr'`,
    '@media screen and (max-width: 1190px)': {
      gridTemplateAreas: `'1fr' '1fr'`,
    }
  } as ThemeUICSSObject,

  stakeInfoWrapper: {
    paddingTop: '40px',
    paddingRight: '80px',
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
