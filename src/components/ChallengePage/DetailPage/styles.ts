export default {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '34px',

    p: {
      margin: '0'
    },

    '@media screen and (max-width: 1200px)': {
      marginLeft: '40px',
    },

    '@media screen and (max-width: 576px)': {
      marginLeft: '0',
    },
  },

  detailPageWrapper: {
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

  btnBack: {
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

    span: {
      marginLeft: '4px',
    },
  },

  mainLayout: {
    display: 'flex',
    justifyContent: 'flex-start',

    '> div: first-child': {
      marginRight: '50px',
    }
  },

  oatWrapper: {
    border: '1px solid lightGray',
    padding: '20px',
  },

  fakeImg: {
    marginBottom: '40px',
    height: '200px',
    width: '200px',
    backgroundColor: 'lightGray',
    borderRadius: '999em',
  },

  smallFakeImg: {
    height: '40px',
    width: '40px',
    backgroundColor: 'lightGray',
    borderRadius: '999em',
  },

  buttonWrapper: {
    display: 'flex',
    maxWidth: '300px',
  }
};
