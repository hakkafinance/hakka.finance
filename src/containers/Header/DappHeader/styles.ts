export default {
    headerBg: {
      position: 'absolute',
      width: '100%',
      top: '0',
      right: '50px',
      zIndex: '-1',
    },
  
    headerContainer: {
      display: 'flex',
      position: 'relative',
      padding: '16px 0',
      justifyContent: 'flex-end',
      '@media screen and (max-width: 576px)': {
        position: 'unset',
        display: 'none'
      }
      // position: "relative",
      // top: "-253px",
      // right: 0,
    },
  
    mobile_header: {
      display: 'none',
  
      '@media screen and (max-width: 576px)': {
        display: 'flex',
        paddingTop: '12px',
        paddingBottom: '20px'
      }
    },
    logoRespon: {
      display: 'none',
  
      '@media screen and (max-width: 576px)': {
        display: 'block'
      }
    },
  
    iconMenu: {
      opacity: '0',
  
      '@media screen and (max-width: 576px)': {
        opacity: '1',
        cursor: 'pointer',
        paddingRight: '5%'
      }
    },
    iconMenuLeft: {
      display: 'none',
      cursor: 'pointer',
      '@media screen and (max-width: 768px)': {
        display: 'none',
        paddingLeft: '50px'
      },
      '@media screen and (max-width: 576px)': {
        display: 'none'
      }
    },
  
    imgIcon: {
      cursor: 'pointer',
      transition: '.3s all',
      opacity: '.5',
      '@media screen and (max-width: 576px)': {
        display: 'none'
      },
      ':hover': {
        opacity: 1
      }
    }
  }
  