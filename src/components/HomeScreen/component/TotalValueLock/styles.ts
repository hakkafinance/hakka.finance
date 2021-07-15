export default {
  totalValueContainer: {
    paddingLeft: '20px',
    position: 'relative'
  },

  totalValueHeadNum: {
  },

  totalValueHead: {
    fontSize: [3, 3, 4, 5],
    color: '#253e47',
    // marginBottom: '12px',
    fontWeight: 'bold',

    '@media screen and (max-width: 768px)': {
      whiteSpace: 'nowrap'
    }
  },

  totalValueMoney: {
    fontSize: [6, 6, 7, 7],
    color: '#3ebd93',
    fontWeight: '600',

    '@media screen and (max-width: 768px)': {
      whiteSpace: 'nowrap'
    }
  },

  totalValueSubText: {
    fontSize: [1, 1, 2, 3],
    color: 'text_grey',
    // marginBottom: '20px',
    fontWeight: '600'
  },

  listProducts: {
    '@media screen and (max-width: 950px)': {
      flexDirection: 'column',
      display: 'block',
      justifyContent: 'flex-start'
    }
  },

  totalValueImg: {
    position: 'absolute',
    right: '0px',
    top: '-90px',
    zIndex: '-1',
    width: '25vw',
    backgroundImage: 'radial-gradient(circle at 0 100%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0) 62%)',

    '@media screen and (max-width: 768px)': {
      width: '200px',
      height: '151px',
      // position: 'absolute',
      top: '-80px'
    }
  }
}
