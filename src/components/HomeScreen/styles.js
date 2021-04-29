export default {
  homescreenContainer: {
    paddingLeft: '12.8%',
    paddingRight: '14.4%',

    '@media screen and (max-width: 576px)': {
      paddingLeft: '16px',
      paddingRight: '16px'
    }
  },

  homescreenSubTitle: {
    color: '#2da287',
    fontSize: [1, 1, 2, 3],
    fontWeight: '600',
    cursor: 'pointer',
    paddingTop: '12px'
  },

  spanLink: {
    textDecoration: 'underline',
    paddingLeft: '3px',
    fontSize: [1, 1, 2, 3]
  },

  homeHeading: {
    fontSize: [6, 7, 8, 8],
    color: '#0b555a',
    width: '100%',
    fontWeight: '300',
    paddingTop: '36px',
    paddingBottom: ['36px', '64px', '64px', '64px']
  },

  homeDescription: {
    fontSize: [2, 2, 3, 4],
    color: 'black',
    maxWidth: '1200px'

  },

  // Card top
  homeCardTop: {
    paddingBottom: ['100px', '160px', '160px', '160px']
  },

  homeTotalValue: {
    padding: '0 0 0 12.8%',
    paddingBottom: ['100px', '176px', '176px', '176px'],

    '@media screen and (max-width: 576px)': {
      paddingLeft: '16px'
      // paddingRight: '5%'
    }
  },

  // what hakka
  whatHakka: {
    paddingBottom: ['48px', '80px', '80px', '80px']
    // '@media screen and (max-width: 576px)': {
    //   paddingBottom: '160px',
    // }
  },

  // token metrics
  tokenMetrics: {
    paddingBottom: ['100px', '160px', '160px', '160px']

  },
  // utility hakka
  utilityHakka: {
    paddingBottom: ['100px', '160px', '160px', '160px']
  },

  // partners and intergrator
  partners: {
    paddingBottom: ['100px', '160px', '160px', '160px']
  },

  partnersHead: {
    fontSize: [5, 6, 7, 7],
    color: '#253e47',
    fontWeight: 'normal',
    paddingBottom: ['48px', '36px', '36px', '36px'],
    '@media screen and (max-width: 576px)': {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  img_partners_responsive: {
    '@media screen and (max-width: 1080px)': {
      justifyContent: 'center'
    }

  },
  imgPartner_wrapper: {
    '@media screen and (max-width: 576px)': {
      justifyContent: 'center'
    },
    ':first-child': {
      '@media screen and (max-width: 576px)': {
        width: '114px',
        height: '48px',
        order: '2'
      }
    },
    ':nth-child(2)': {
      '@media screen and (max-width: 576px)': {
        width: '114px',
        height: '48px',
        order: '1',
        paddingRight: '28px'
      }
    },

    ':last-child': {
      '@media screen and (max-width: 576px)': {
        width: '284px',
        height: '58px',
        // paddingTop: '12px',
        order: '3'
      }
    }
  },
  imgPartner: {
    paddingRight: '28px',
    objectFit: 'contain',

    '@media screen and (max-width: 576px)': {
      paddingRight: '0px'

      // width: '80%'
    }
  },
  // blur img
  blur_img_blue_section: {
    position: 'relative'
  },
  blur_img_blue: {
    borderRadius: '50%',
    width: '28vw',
    height: '28vw',
    filter: 'blur(40px)',
    backgroundColor: 'rgba(181, 232, 248, 0.3)',
    position: 'absolute',
    top: '-300px',
    left: '-40%',
    zIndex: '-1',
    '@media screen and (max-width: 768px)': {
      display: 'none'
    }
  },

  blur_img_green_section: {
    position: 'relative'
  },
  blur_img_green: {
    borderRadius: '50%',
    width: '28vw',
    height: '28vw',
    filter: 'blur(40px)',
    backgroundColor: 'rgba(217, 251, 227, 0.3)',
    position: 'absolute',
    top: '-100px',
    right: '-45%',
    zIndex: '-1',
    '@media screen and (max-width: 768px)': {
      display: 'none'
    }
  },

  blur_img_green_section_mobile: {
    position: 'relative'
  },
  blur_img_green_mobile: {
    display: 'none',
    '@media screen and (max-width: 768px)': {
      display: 'block',
      borderRadius: '50%',
      width: '40vw',
      height: '35vh',
      filter: 'blur(25px)',
      backgroundColor: 'rgba(217, 251, 227, 0.3)',
      position: 'absolute',
      top: '40px',
      right: '-15%',
      zIndex: '-1'
    }
  },

  blur_img_blue_section_mobile: {
    position: 'relative'
  },
  blur_img_blue_mobile: {
    display: 'none',
    '@media screen and (max-width: 768px)': {
      display: 'block',
      borderRadius: '50%',
      width: '40vw',
      height: '35vh',
      filter: 'blur(20px)',
      backgroundColor: 'rgba(181, 232, 248, 0.3)',
      position: 'absolute',
      top: '-160px',
      left: '-15%',
      zIndex: '-1'
    }
  }
}
