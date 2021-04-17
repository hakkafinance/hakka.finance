export default {
  footerContainer: {
    paddingLeft: '12.8%',
    '@media screen and (max-width: 576px)': {
      padding: '0 16px'
    }
  },

  footerContent: {
    borderTop: '1px solid #dae1e3',
    paddingTop: '27px',
    paddingBottom: '72px',
    '@media screen and (max-width: 576px)': {
      justifyContent: 'center'
    }
    // marginBottom: '72px'
  },

  logoFooter: {
    '@media screen and (max-width: 576px)': {
      display: 'none'
    }
  },

  textCopy: {
    fontSize: [0, 1, 2],
    color: 'rgba(37, 62, 71, 0.5)',
    fontWeight: 600,
    paddingBottom: '28px',

    '@media screen and (max-width: 576px)': {
      margin: '0 auto',
      textAlign: 'center'
    }
  },

  imgIcon: {
    cursor: 'pointer',
    transition: '.3s all',
    opacity: '.5',
    '-webkit-touch-callout': 'none', /* iOS Safari */
    '-webkit-user-select': 'none', /* Safari */
    '-khtml-user-select': 'none', /* Konqueror HTML */
    '-moz-user-select': 'none', /* Old versions of Firefox */
    '-ms-user-select': 'none', /* Internet Explorer/Edge */
    'user-select': 'none',

    ':hover': {
      opacity: 1
    }
  }
}
