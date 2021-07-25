export default {
  InputCardWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60px',
    border: '1px solid  #dae1e3',
    borderRadius: '8px',
    backgroundColor: '#f7fbfc',
    ':focus-within' :{
      border: '1px solid #3ebd93',
    },
  },

  input: {
    marginLeft: '16px',
    width: '60%'
  },

  activeArea:{
    display: 'flex',
    alignItems: 'center',
  },


  iconLock: {
    margin: '0 8px 0 8px',
    paddingBottom: '6px',

    ':hover':{
      cursor: 'pointer',
    },
  },

  maxButton: {
    height: '40px',
    border: 'none',
    backgroundColor: 'transparent',
    padding: '0 16px 0 8px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'rgba(37, 62, 71, 0.5)',

    ':hover':{
      cursor: 'pointer',
    },
  },
}


// '@media screen and (max-width: 576px)': {
//   margin: '20px auto 0 auto',
// }