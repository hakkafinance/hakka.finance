export default {
  utilityHead: {
    fontSize: [5, 6, 7, 7],
    color: '#253e47',
    fontWeight: 'normal'
  },

  utilityTextLink: {
    // marginBottom: '60px',
    maxWidth: '1200px',

    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
      justifyContent: 'flex-start'
    }
  },

  utilityText: {
    fontSize: [2, 2, 3, 4],
    color: '#253e47',
    alignItems: 'center'
  },

  utilityLink: {
    fontSize: [1, 1, 2, 3],
    fontWeight: '600',
    color: '#2da287',
    cursor: 'pointer',
    marginRight: '5px',

    '@media screen and (max-width: 576px)': {
      // marginTop: '20px'
    }
  },

  imgForward: {
    width: '24px'
  },

  utilityInfoContainer: {
    width: '40%',
    marginRight: '20px',
    flex: '1',

    '@media screen and (max-width: 576px)': {
      width: '100%'
    },

    ':last-child': {
      '@media screen and (max-width: 576px)': {
        paddingTop: '20px'
      }
    }
  },

  utilityImgInfo: {
    width: '48px'
  },

  utilityTitle: {
    // margin: '20px 0',
    fontSize: [3, 3, 4, 5],
    color: '#253e47',
    fontWeight: '700',
    fontFamily: 'system-ui'
  },

  detailsInfo: {
    maxWidth: '1200px',
    '@media screen and (max-width: 576px)': {
      flexDirection: 'column'
    }
  }
}
