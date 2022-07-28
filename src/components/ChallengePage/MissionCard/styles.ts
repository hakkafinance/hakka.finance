export default {
  container: {
    position: 'relative',
    padding: '24px',
    marginTop: '45px',
    border: '3px solid gray',
    borderRadius: '8px',
  },

  statusWrapper: {
    position: 'absolute',
    top: '-25px',
    left: '-20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px 20px',
    backgroundColor: 'lightGray',
    textAlign: 'center',
  },

  contentWrapper: {
    display: 'flex',

    'div: first-child': {
      marginRight: '100px',
    }
  },

  linkBtn: {
    marginRight: '12px',
    padding: '8px 16px',
    borderRadius: '12px',
    backgroundColor: 'lightGray',
    fontWeight: 'bold',
    border: '0',
  }
}