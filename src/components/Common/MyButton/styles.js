export default {
  mybutton: {
    padding: '12px 16px',
    backgroundColor: '#fff',
    color: '#2da287',
    border: 'solid 1px #dae1e3',
    width: '100%',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.25s ease-out',
    textAlign: 'center',
    // textShadow: '0.5px 0px 0px #253e47',

    ':hover': {
      borderColor: '#2da287'
    },

    ':active': {
      transform: 'scale(0.98)',
      outline: 'none'
    },
    ':disabled': {
      color: '#9D9D9D',
      cursor: 'not-allowed',
      ':hover' :{
        borderColor: '#dae1e3'
      }
    }
  },
  mybutton_green: {
    padding: '12px 16px',
    backgroundColor: '#3ebd93',
    color: '#fff',
    border: 'solid 1px #3ebd93',
    width: '100%',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.25s ease-out',
    textAlign: 'center',
    // textShadow: '0.5px 0px 0px #253e47',

    ':hover': {
      borderColor: '#2da287',
      backgroundColor: '#6ad7a8'
    },

    ':active': {
      transform: 'scale(0.98)',
      outline: 'none'
    },

    ':disabled': {
      color: '#9D9D9D',
      cursor: 'not-allowed',
      backgroundColor: '#ebf0f2',
      border: 'none',
    }
  }
}
