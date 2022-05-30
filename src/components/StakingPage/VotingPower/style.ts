export default {
  main: {
    display: 'flex',

    p: {
      margin: '0',
      fontSize: '14px',
    },

    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
    },
  },

  votingPowerContainer: {
    marginRight: '60px',

    '@media screen and (max-width: 576px)': {
      marginBottom: '16px',
    },
  },

  votingPowerTitle: {
    display: 'flex',

    p: {
      marginRight: '6px'
    },
  },

  proportionItemContainer: {
    display: 'flex',
    marginTop: '8px',
  },

  proportionItem: {
    display: 'flex',
    marginRight: '12px',

    img: {
      marginRight: '4px'
    },

    p: {
      fontWeight: '600',
      color: '#52666D',
    },
  },

  votingPowerValueWrapper: {
    display: 'flex',
    marginTop: '8px',
    color: '#2DA287',

    p: {
      marginRight: '8px',
      fontSize: '24px',
      fontWeight: '600',
    },

    '@media screen and (max-width: 576px)': {
      alignItems: 'flex-end',

      span: {
        fontSize: '12px',
        fontWeight: '600',
      },

      p: {
        marginRight: '12px',
      },
    },
  },
};
  