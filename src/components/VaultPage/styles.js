export default {
  homescreenContainer: {
    paddingLeft: '12.8%',
    paddingRight: '14.4%',

    '@media screen and (max-width: 576px)': {
      paddingLeft: '16px',
      paddingRight: '16px',
    }
  },

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

  title:{
    fontWeight: 'bold',
    fontSize: [5, 6, 6, 6],
  },

  body: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '100px',
  },

  infomationArea: {
    width: '300px',
    fontSize: [1, 1, 1, 1],
  },

  subTitle: {
    fontWeight: 'bold',
    fontSize: [3, 5, 5, 5],
  },

  contract:{
    display: 'flex',
    justifyContent: 'space-between',
  },

  contractAddress: {
    fontWeight: 'bold',
    textDecoration: 'underline',
  },

  hakkaBalance:{
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
}