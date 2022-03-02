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

  rewardsPageWrapper: {
    width: '860px',
    color: '#253e47',
    paddingBottom: '100px',

    '@media screen and (max-width: 1200px)': {
      width: '85%',
      maxWidth: 'none',
    },

    '@media screen and (max-width: 576px)': {
      width: '100%',
      padding: '0 16px 100px 16px',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',

    p: {
      margin: '0 0 20px 0',
      fontSize: [5, 6],
      fontWeight: '600',
      lineHeight: '1.25',
    },

    '@media screen and (max-width: 576px)': {
      display: 'block',
      marginBottom: '20px',
    },

  },

  displayOption: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',

    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  chainSwitch: {
    display: 'flex',
    color: 'rgba(37, 62, 71, 0.5)',
    fontWeight: '600',

    div: {
      padding: '12px 24px',
      borderRadius: '8px',

      ':hover': {
        cursor: 'pointer',
        color: '#253e47',
      },
    },
  },

  sortController: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'rgba(37, 62, 71, 0.5)',
    fontWeight: '600',

    '@media screen and (max-width: 576px)': {
      paddingTop: '10px',
    },
  },
 
  checkBox: {
    display: 'none',
  },

  checkBoxLabel: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px',

    ':hover': {
      cursor: 'pointer',
      color: '#253e47',
    },
  },

  menu: {
    ':hover': {
      cursor: 'pointer',
    },
  },

  chainActive: {
    backgroundColor: '#ebf0f2',
    color: '#253e47',
  },

  activeTitle: {
    margin: '0 0 20px 0',
    fontSize: '0.875rem',
  },

  poolContainer: {
    display: 'flex',
    flexWrap: 'wrap',

    '> div': {
      marginRight: '18px',
      marginBottom: '15px',
    },

    '@media screen and (max-width: 576px)': {
      '> div': {
        marginRight: '0',
      },
    },
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
};
