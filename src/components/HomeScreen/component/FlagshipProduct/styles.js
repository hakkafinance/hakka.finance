export default {
  product: {
    // marginRight: '40px',
    cursor: 'pointer',
    padding: '16px 20px',
    borderRadius: '8px',
    transition: 'all 0.25s ease-out',

    ':hover': {
      backgroundColor: '#f7fbfc',

      '& *': {
        color: '#253e47'
      }
    },

    '@media screen and (max-width: 576px)': {
      // marginTop: '32px',
      // marginRight: 0,

      ':first-child': {
        // marginTop: '20px'
      }
    }
  },

  imageProduct: {
    // marginRight: '10px',
    width: '40px'
  },

  productHeading: {
    fontSize: [3, 3, 4, 5],
    fontWeight: 'bold',
    color: '#52666d',
    whiteSpace: 'nowrap'
  }
}
