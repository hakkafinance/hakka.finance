export default {
  container: {
    display: 'flex',
    alignItems: 'center',
    '@media screen and (max-width: 576px)': {
      position: 'fixed',
      bottom: '0',
      padding: '12px 16px 12px 16px',
      marginLeft: '-16px',
      width: '100vw',
      backgroundColor: '#f7fbfc',
      boxShadow: '0 -4px 16px 0 rgba(123, 135, 148, 0.25)',
      justifyContent: 'space-between',
    },
  },

  chainWrapper: {
    display: 'flex',
    paddingRight: '12px',
    '@media screen and (max-width: 576px)': {
      paddingRight: '0'
    },
  },

  chainNameWrapper: {
    whiteSpace: 'nowrap',
    color: '#253e47',
    fontWeight: 'bold',
    marginLeft: '4px',
  },

  loginButtonWrapper: {
    width: '153px',
    '@media screen and (max-width: 576px)': {
      width: '176px',
      order: '-1',
    },
  },

  accountIconWrapper: {
    padding: '12px',
    marginLeft: '12px',
    borderRadius: '8px',
    backgroundColor: 'rgba(62, 189, 147, 0.1)',
    '@media screen and (max-width: 576px)': {
      marginLeft: '0'
    },
  },
}