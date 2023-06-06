export default {
  container: {
    position: 'relative',
    marginTop: '20px',

    '@media screen and (max-width: 576px)': {
      padding: '0 20px'
    },
  },

  levelContainer: {
    position: 'absolute',
    top: '-20px',
    left: '50%',
    transform: 'translate(-50%)',
    zIndex: '2',
    color: 'white',
  },

  mainLayout: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px',
    border: '1px solid',
    borderRadius: '100px',

    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
      borderRadius: '8px',
      padding: '0 20px 20px 20px',
    },
  },

  profileImgWrapper: {
    position: 'relative',
    minWidth: '200px',
    height: '200px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '200px',
  },

  infoSection: {
    paddingLeft: '28px',
    marginRight: '5%',

    h4: {
      fontSize: '24px',
      fontWeight: '700',
      margin: '0',
    },

    '@media screen and (max-width: 576px)': {
      paddingTop: '16px',
      paddingLeft: '0',
    },
  },

  address: {
    fontSize: '12px',
    margin: '0 0 10px 0'
  },

  descriptionSection: {
    paddingRight: '100px',
    fontSize: '14px',
    lineHeight: '20px',

    '@media screen and (max-width: 576px)': {
      paddingRight: '0',
    },
  },

  progressBarContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '90%',

    span: {
      paddingLeft: '8px',
      fontSize: '14px',
      fontWeight: '600',
      color: 'gray',
      whiteSpace: 'nowrap',
    },

    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
      alignItems: 'flex-end',
      marginTop: '36px',
      width: '100%',

      '> span': {
        marginTop: '8px',
      },
    },
  },
}