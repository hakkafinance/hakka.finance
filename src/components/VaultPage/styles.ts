export default {
  container:{
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

  vaultPageWrapper: {
    maxWidth: '860px',
    color: '#253e47',

    '@media screen and (max-width: 1200px)': {
      width:'85%',
      maxWidth: 'none',
      padding: '0 16px 0 16px',
    },

    '@media screen and (max-width: 576px)': {
      width:'100%',
    },
  },

  header: {
    justifyContent: 'space-between',

    '@media screen and (min-width: 576px)': {
      display: 'flex',
    },
  },

  title: {
    fontWeight: 'bold',
    fontSize: [5, 6, 6, 6],
  },

  body: {
    minHeight: '400px',
    display: 'flex',
    alignItems: 'flex-start',

    '@media screen and (max-width: 1200px)': {
      display: 'block',
    }
  },

  infomationContainer: {
    width: '300px',
    fontSize: [1, 1, 1, 1],

    '@media screen and (max-width: 1200px)': {
      width: '100%',
      marginBottom: '28px',
    }
  },

  subTitle: {
    fontWeight: 'bold',
    fontSize: [3, 5, 5, 5],
  },

  contract: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  contractAddress: {
    fontWeight: 'bold',
    textDecoration: 'underline',

    ':hover': {
      cursor: 'pointer',
    },
  },

  hakkaBalance: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '22px',
    marginBottom: '12px',
    color: 'rgba(37, 62, 71, 0.5)',
    fontWeight: 'bold',
  },

  hr: {
    backgroundColor: '#dae1e3',
    border: 'none',
    height: '1px',
    marginBottom: '11px',
    marginTop: '0',
  },

  errorMessage: {
    color: '#ff0000',
    marginTop: '10px',
    fontWeight: 'bold',
  },

  formContainer: {
    width: '460px',
    padding: '28px 20px 20px 20px',
    marginTop: '28px',
    marginLeft: '100px',
    fontSize: '16px',
    border: '1px solid #dae1e3',
    borderRadius: '8px',

    '@media screen and (max-width: 1200px)': {
      marginLeft: '0',
      margin: 'auto',
    },

    '@media screen and (max-width: 576px)': {
      width: '100%',
    }
  },

  formTitleArea: {
    display: 'flex',
    justifyContent: 'space-between',
    whiteSpace: 'nowrap',
    padding: '0 8px 0 8px'
  },

  formTitle: {
    fontSize: '18px',
    fontWeight: '600',
  },

  addTokenButton: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: 'rgba(37, 62, 71, 0.5)',
    fontWeight: '600',

    ':hover': {
      cursor: 'pointer',
    },
  },

  addIcon: {
    paddingLeft: '4px'
  },

  rewardListContainer: {
    marginTop: '36px',
    marginBottom: '8px',
    overflow: 'hidden',
  },

  hr2: {
    backgroundColor: '#dae1e3',
    border: 'none',
    height: '1px',
    margin: '0',
  },

  knowMoreWrapper: {
    maxWidth: '300px',
    position: 'relative',
    top: '-47px',

    '@media screen and (max-width: 1200px)': {
      maxWidth: 'none',
      position: 'static',
      marginTop: '28px',
    },
  },

  knowMoreRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '64px',
    fontWeight: '600',
    '@media screen and (max-width: 576px)': {
      marginBottom: '100px'
    },
  },

  knowMoreTitle: {
    color: 'rgba(37, 62, 71, 0.5)'
  },

  wikiLinkArea: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },

  visitWikiLink: {
    color: '#2da287',
  },

}