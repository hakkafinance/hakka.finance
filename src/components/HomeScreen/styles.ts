export default {
  homescreenContainer: {
    paddingLeft: '12.8%',
    paddingRight: '14.4%',

    '@media screen and (max-width: 576px)': {
      paddingLeft: '16px',
      paddingRight: '16px',
    },
  },

  homescreenSubTitle: {
    color: '#2da287',
    fontSize: [1, 1, 2, 3],
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '12px',
  },

  spanLink: {
    textDecoration: 'underline',
    paddingLeft: '3px',
    fontSize: [1, 1, 2, 3],
  },

  homeHeading: {
    fontSize: [6, 7, 8, 8],
    color: '#0b555a',
    width: '100%',
    fontWeight: '300',
    paddingTop: '36px',
    paddingBottom: ['36px', '64px', '64px', '64px'],
  },

  homeDescription: {
    fontSize: [2, 2, 3, 4],
    color: 'black',
    maxWidth: '1200px',

  },

  // Card top
  homeCardTop: {
    paddingBottom: ['100px', '160px', '160px', '160px'],
  },

  homeTotalValue: {
    padding: '0 0 0 12.8%',
    paddingBottom: ['100px', '176px', '176px', '176px'],

    '@media screen and (max-width: 576px)': {
      paddingLeft: '16px',
      // paddingRight: '5%'
    },
  },

  // what hakka
  whatHakka: {
    paddingBottom: ['48px', '80px', '80px', '80px'],
    // '@media screen and (max-width: 576px)': {
    //   paddingBottom: '160px',
    // }
  },

  // token metrics
  tokenMetrics: {
    paddingBottom: ['100px', '160px', '160px', '160px'],

  },
  // utility hakka
  utilityHakka: {
    paddingBottom: ['100px', '160px', '160px', '160px'],
  },

  // partners and intergrator
  partners: {
    paddingBottom: ['100px', '160px', '160px', '160px'],
    width: '85%',
    maxWidth: '680px',
  },

  partnersHead: {
    fontSize: [5, 6, 7, 7],
    color: '#253e47',
    fontWeight: 'normal',
    paddingBottom: ['48px', '36px', '36px', '36px'],
    '@media screen and (max-width: 576px)': {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  img_partners_responsive: {
    '@media screen and (max-width: 1280px)': {
      justifyContent: 'center',
    },

  },
  imgPartner_wrapper: {
    alignItems: 'center',
    paddingTop: '32px',
    paddingRight: '20px',
    '@media screen and (max-width: 576px)': {
      paddingTop: '20px',
      paddingRight: '0',
    },
    '.biggerIcon': {
      '@media screen and (max-width: 576px)': {
        height: '64px',
      },
    },
  },
  imgPartner: {
    '@media screen and (max-width: 576px)': {
      height: '48px',
    },
  },
  imgPartnerBiggerIcon: {
    '@media screen and (max-width: 576px)': {
      height: '64px',
    },
  },
  // blur img
  blur_img_blue_section: {
    position: 'relative',
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
      display: 'none',
    },
  },

  blur_img_green_section: {
    position: 'relative',
  },
  blur_img_green: {
    position: 'absolute',
    top: '-200px',
    right: '-19.8%',

    zIndex: '-1',
    '@media screen and (max-width: 768px)': {
      display: 'none',
    },
  },

  blur_img_green_section_mobile: {
    position: 'relative',

  },
  blur_img_green_mobile: {
    display: 'none',
    '@media screen and (max-width: 768px)': {
      width: '60vw',
      display: 'block',
      position: 'absolute',
      top: '-20px',
      right: '-4.5%',
      zIndex: '-1',
    },
  },

  blur_img_blue_section_mobile: {
    position: 'relative',
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
      zIndex: '-1',
    },
  },
  subscribeInputArea: {
    display: 'flex',
    paddingBottom: '100px',
    maxWidth: '740px',
    '@media screen and (max-width: 768px)': {
      display: 'block',
    },
  },
  subscribeTitle: {
    marginBottom: '36px',
    marginTop: '0',
    fontSize: '32px',
    color: '#253e47',
  },
  subscribeSubtitle: {
    marginBottom: '24px',
    fontSize: '16px',
    color: '#253e47',
  },
  subscribeButton: {
    padding: '18px 0px',
    marginLeft: '12px',
    minWidth: '184px',
    border: 'solid 1px #3ebd93',
    backgroundColor: '#3ebd93',
    color: '#fff',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'all 0.25s ease-out',
    textAlign: 'center',

    '@media screen and (max-width: 768px)': {
      marginLeft: '0',
      marginTop: '12px',
      width: '100%',
    },

    ':hover': {
      borderColor: '#2da287',
      backgroundColor: '#6ad7a8',
    },

    ':active': {
      transform: 'scale(0.98)',
      outline: 'none',
    },

    ':disabled': {
      color: '#9D9D9D',
      cursor: 'not-allowed',
      backgroundColor: '#ebf0f2',
      border: 'none',
    },
  },
  emailInput: {
    width: '100%',
    height: '60px',
    padding: '0 18px',
    border: '1px solid #dae1e3',
    backgroundColor: '#f7fbfc',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    
    ':focus': {
      outline: 'none',
    },
  },
};
