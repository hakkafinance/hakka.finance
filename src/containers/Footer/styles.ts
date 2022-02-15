export default {
  footerContainer: {
    paddingLeft: '12.8%',
    '@media screen and (max-width: 576px)': {
      padding: '0 16px',
    },
  },

  footerContent: {
    borderTop: '1px solid #dae1e3',
    paddingTop: '27px',
    paddingBottom: '72px',
    justifyContent: 'space-between',
    alignItems: 'center',
    '@media screen and (max-width: 576px)': {
      justifyContent: 'center',
    },
    // marginBottom: '72px'
  },

  logoFooter: {
    '@media screen and (max-width: 576px)': {
      display: 'none',
    },
  },

  textCopy: {
    fontSize: [0, 1, 2],
    color: 'rgba(37, 62, 71, 0.5)',
    fontWeight: 600,
    paddingBottom: '28px',

    '@media screen and (max-width: 576px)': {
      margin: '0 auto',
      textAlign: 'center',
    },
  },
  footer_icons: {
    paddingRight: '28px',
    '@media screen and (max-width: 576px)': {
      paddingRight: '0px',
    },
  },
  imgIcon: {
    cursor: 'pointer',
    transition: '.3s all',
    opacity: '.5',
    WebkitTouchCallout: 'none', /* iOS Safari */
    WebkitUserSelect: 'none', /* Safari */
    KhtmlUserSelect: 'none', /* Konqueror HTML */
    mozUserSelect: 'none', /* Old versions of Firefox */
    msUserSelect: 'none', /* Internet Explorer/Edge */
    userSelect: 'none',

    ':hover': {
      opacity: 1,
    },
  },
  linkArea: {
    alignItems: 'center',

    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
    },

  },
  auditReportsLink: {
    position: 'relative',
    top: '-3px',
    marginRight: '12px',
    fontSize: '14px', 
    textDecoration: 'none',
    color: '#929ea3',
    fontWeight: '600',

    ':hover': {
      color: '#253E47',
    },

    '@media screen and (max-width: 576px)': {
      marginRight: '0',
      marginBottom: '12px',
    },
  },
};
