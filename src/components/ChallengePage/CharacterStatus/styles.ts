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
    left: '60px',
    zIndex: '2',
    borderRadius: '20px',
    backgroundImage: 'linear-gradient(0deg, #0B555A, #0B555A)',
    border: '1px solid lightGreen',
    color: 'white',
    padding: '0 12px',
    height: '40px',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '92px',

    '@media screen and (max-width: 576px)': {
      left: '130px',
    },
  },

  mainLayout: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px',
    border: '1px solid lightGreen',
    borderRadius: '100px',
    backgroundColor: 'rgba(108, 232, 180, 0.13)',

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
  },

  infoSection: {
    paddingLeft: '28px',

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