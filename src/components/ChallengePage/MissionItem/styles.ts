export default {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',

    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  mainLayout: {
    display: 'flex',
    alignItems: 'center',

    p: {
      margin: '0',
    },

    '@media screen and (max-width: 576px)': {
      marginBottom: '15px',
    }
  },

  firstSectionWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    marginRight: '30px',

    '@media screen and (max-width: 576px)': {
      marginRight: '10px',
      
    }
  },

  taskStatusWrapper: {
    position: 'relative',
    padding: '8px 0',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '16px',
    borderRadius: '8px',
    width: '74px',

    '@media screen and (max-width: 576px)': {
      padding: '0',
      width: '17px',
      height: '17px',
      borderRadius: '50%',
    },
  },

  mockImg: {
    width: '60px',
    height: '72px',
    backgroundColor: '#D9D9D9',
  },

  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    lineHeight: '24px',
    
    h4: {
      margin: '0',
      marginRight: '16px',
      fontWeight: '700',
    },

    p: {
      margin: '0',
      fontWeight: '600',
      fontSize: '18px',
    },
    
    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',

      p: {
        fontSize: '14px',
      },
    },
  },

  btnWrapper: {
    position: 'relative',
    width: '130px',

    '@media screen and (max-width: 576px)': {
      margin: '0 auto',
      width: '160px',
    },
  },

  taskProperty: {
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '24px',
  },

  newTask: {
    minHeight: '16px',
    fontWeight: '600',
    fontSize: '12px',
    lineHeight: '24px',
    color: 'red',
  },

  oatImgWrapper: {
    position: 'relative',
    width: '60px',
    height: '72px',
    marginLeft: '28px',

    '@media screen and (max-width: 576px)': {
      marginLeft: '14px',
    }
  },

  upcomingImg: {
    width: '60px',
    height: '72px',
    backgroundColor: '#F1F1F1',
  },
}