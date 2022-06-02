import { ThemeUIStyleObject } from "theme-ui";

export default {
  flexSpaceBetween: {
    display: 'flex',
    justifyContent: 'space-between',
  },  
  
  container: {
    width: '100%',
    position: 'relative',
    padding: '20px 12px',
    color: '#253e47',

    '@media screen and (max-width: 576px)': {
      width: '318.75px',
    },
  },

  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '32px',
    fontSize: [0],
    position: 'relative',
    zIndex: '2',

    h2: {
      margin: '0',
      fontWeight: 'bold',
      lineHeight: '1.33',
      color: 'rgba(37, 62, 71, 0.5)',
    },

    img: {
      ':hover': {
        cursor: 'pointer',
      },
    },
  },

  hakkaBalanceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    fontSize: '14px',
    color: 'rgba(37, 62, 71, 0.5)',
    fontWeight: 'bold',
  },

  numericalInputWrapper: {
    marginBottom: '20px',
  },

  hr: {
    borderTop: '1px solid rgba(218, 225, 227, 1)',
  },

  receiveShakkaTitle: {
    fontWeight: 'bold',
  },

  receiveShakkaWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '50px',
    fontSize: '18px',
    fontWeight: '600',

    span: {
      marginLeft: '8px',
    },
  },

  votingPowerSectionWrapper: {
    marginBottom: '3rem',
  },

  stayTheSameSwitchWithTitleContainer: {
    marginTop: '22px',
    marginBottom: '18px',
    display: 'flex',
    justifyContent: 'space-between',

    p: {
      fontWeight: 'bold',

    },
  },

  stayTheSameSwitchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    span: {
      paddingLeft: '10px',
      fontSize: '14px',
    },
  },

  textHint: {
    fontSize: '12px',
    color: 'rgba(37, 62, 71, 0.5)',
  },

  date: {
    color: '#253e47',
    fontSize: '14px',
  },

  switchLabelWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '@media screen and (max-width: 576px)': {
      width: '100%',
      marginTop: '10px',
    },
  },
};

export const headerWrapper: ThemeUIStyleObject = {
  '--theme-ui-colors-primary': '#3EBD93',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  mb: '18px',
  mt: '14px',

  '& p': {
    m: '0',
    fontWeight: 'bold',
  },

  '.switch': {
    transform: 'scale(0.7)',
  },

  '& .switch ~ span': {
    fontWeight: '600',
    fontSize: '14px',
    color: '#253E47',
  },

  '@media screen and (max-width: 576px)': {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
};
    