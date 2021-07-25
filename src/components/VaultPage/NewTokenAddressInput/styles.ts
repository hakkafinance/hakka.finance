export default {
  NewTokenAddressInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '48px',
    width: '330px',
    border: '1px solid  #dae1e3',
    borderRadius: '8px',
    backgroundColor: '#f7fbfc',
    ':focus-within' :{
      border: '1px solid #3ebd93',
    },
    '@media screen and (max-width: 576px)': {
      width: '215px',
    }
  },

  input: {
    width: '100%',
    padding: '2px 0 2px 16px',
    color: '#253e47',
    lineHeight: '1.17',
    fontWeight: 'bold',
    fontSize: '16px',
    backgroundColor: 'transparent',
    border: 'none',

    ':focus': {
      outline: 'none',
    },
  },

  container:{
    display: 'flex',
    marginTop: '20px',

  },

  addButton: {
    width: '80px',
    marginLeft: '8px',
  },
}