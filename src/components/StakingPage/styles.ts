import { ThemeUICSSObject } from 'theme-ui';
import merge from 'lodash/merge';
import { NormalButton } from './StakePositionItem/buttonStyle';
const VotingPowerHeader = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  width: '100%',
  mt: 41,
  mb: 60,
  '.voting-power': {
    mr: 'auto',
  },
  '> button': {
    ml: '1rem'
  }
} as ThemeUICSSObject;

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

  body: {
    display: 'block',
  },

  normalButton: NormalButton,

  votingPowerHeader: VotingPowerHeader,
};
