export default {
  title: {
    fontSize: [4, 4, 5, 5],
    marginBottom: '40px',
  },
  securitySection: {
    '@media screen and (max-width: 576px)': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  securityItemWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    fontSize: [4],

    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
    },
    },
    titleWrapper: {
      lineHeight: '28px',
      alignItems: 'flex-end', 

      '@media screen and (max-width: 576px)': {
        flexDirection: 'column',
        alignItems: 'center',
        lineHeight: '36px',
      },
    },
    iconWrapper: {
      alignItems: 'flex-end',
      '@media screen and (max-width: 576px)': {
       margin: '8px',
      },
    },
    linkButton: {
      borderRadius: '8px',
      padding: '12px 16px 12px 20px',
      backgroundColor: '#f7fbfc',
      textDecoration: 'none',
      color: '#253e47',
      fontSize: '16px',
      border: '1px solid transparent',
      transition: 'all 0.25s ease-out',

      ':hover': {
        border: '1px solid #dae1e3',
      },

      '@media screen and (max-width: 576px)': {
        marginTop: '25px',
      },
    },
    buttonContent: {
      fontWeight: '600',
      paddingRight: '6px',
    },
  };
  