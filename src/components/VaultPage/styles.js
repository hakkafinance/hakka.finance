export default {
  container: {
    padding: '0 90px 0 150px',
    color: '#253e47',

    '@media screen and (max-width: 576px)': {
      padding: '0 16px 0 16px',
    }
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  title: {
    fontWeight: 'bold',
    fontSize: [5, 6, 6, 6],
  },

  body: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '100px',

    '@media screen and (max-width: 576px)': {
      display: 'block',
    }
  },

  infomationArea: {
    width: '300px',
    fontSize: [1, 1, 1, 1],

    '@media screen and (max-width: 576px)': {
      width: '100%',
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
    margin: '0',
  },

  wikiLinkArea: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },

  formContainer: {
    width: '460px',
    padding: '28px 20px 20px 20px',
    marginTop: '28px',
    marginLeft: '100px',
    fontSize: '16px',
    border: '1px solid #dae1e3',
    borderRadius: '8px',

    '@media screen and (max-width: 576px)': {
      width: '100%',
      marginLeft: '0',
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
  },

  addTokenButtonAddIcon: {
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

  totalValueWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px 0 36px 0',
  },

  totalValueAmount: {
    fontWeight: 'bold',
  },

  burnBtn: {
  }
}