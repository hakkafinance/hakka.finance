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
    marginBottom: '20px',

    p: {
      margin: '0 0 20px 0',
      fontSize: [5, 6],
      fontWeight: '600',
      lineHeight: '1.25',
    },

    '@media screen and (max-width: 576px)': {
      display: 'block',
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
    alignItems: 'flex-start',

    '> div: first-child': {
      marginRight: '50px',
    },

    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
      alignItems: 'center',

      '> div: first-child': {
        marginRight: '0',
      },
    },
  },

  oatWrapper: {
    border: '1px solid lightGray',
    padding: '20px',
    borderRadius: '8px',

    '@media screen and (max-width: 576px)': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: '30px',
    }
  },

  oat: {
    width: '260px',
    height: '312px',
    marginBottom: '12px',

    '@media screen and (max-width: 576px)': {
      width: '240px',
      height: '287px',
    }
  },

  fakeImg: {
    marginBottom: '12px',
    height: '300px',
    width: '200px',
    backgroundColor: 'lightGray',
  },

  buttonWrapper: {
    display: 'flex',
    marginBottom: '28px',
    maxWidth: '300px',
    gap: '22px',
  },

  infoHeader: {
    display: 'flex',
    alignItems: 'center',
  },

  missionIndex: {
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '24px',
    color: 'rgba(37, 62, 71, 0.5)',
  },

  statusItem: {
    width: '74px',
    padding: '8px 0',
    marginLeft: '16px',
    fontSize: '12px',
    borderRadius: '8px',
    textAlign: 'center',
  },

  missionTitle: {
    marginTop: '4px',
    marginBottom: '18px',
    fontWeight: '700',
    fontSize: '24px',
    lineHeight: '40px',
  },

  hintTitle: {
    paddingTop: '20px',
    fontWeight: '700',
  },

  ul: {
    margin: '0',
    paddingLeft: '20px',
    fontSize: '14px',

    li: {
      marginBottom: '12px',
    },
  },

  describeContent: {
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '20px',
  }
};
