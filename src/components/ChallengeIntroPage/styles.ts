import images from "../../images";

export default {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '34px',

    '@media screen and (max-width: 1200px)': {
      marginLeft: '40px',
    },

    '@media screen and (max-width: 576px)': {
      marginLeft: '0',
    },
  },

  challengePageWrapper: {
    width: '860px',
    color: '#253e47',
    paddingBottom: '100px',

    '@media screen and (max-width: 1200px)': {
      width: '85%',
      maxWidth: 'none',
    },

    '@media screen and (max-width: 576px)': {
      width: '100%',
      padding: '0 16px 100px 16px',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',

    p: {
      margin: '0 0 20px 0',
      fontSize: [5, 6],
      fontWeight: '600',
      lineHeight: '1.25',
    },

    '@media screen and (max-width: 576px)': {
      display: 'block',
      marginBottom: '20px',
    },
  },

  introGraphWrapper: {
    padding: '40px 30px 65px 30px',
    backgroundImage: `linear-gradient(90deg, #44D2BA 1.76%, #75E3B9 28.53%, #8CEBB9 63.21%, rgba(255, 255, 255, 0) 67.64%), url(${images.iconIntroGraph})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left, right',
    backgroundSize: 'auto, 320px',
    borderRadius: '8px',

    '@media screen and (max-width: 576px)': {
      padding: '28px 20px 289px 20px',
      backgroundImage: `linear-gradient(180deg, #44D2BA 1.93%, #75E3B9 39.47%, rgba(122, 229, 185, 0.81) 53.38%, rgba(140, 235, 185, 0.25) 64.66%, rgba(255, 255, 255, 0) 74.25%), url(${images.iconIntroGraph})`,  
      backgroundPosition: 'top, bottom',
      backgroundSize: 'auto, contain',
    },
    
    h4: {
      margin: '0',
      marginBottom: '36px',
      fontSize: '48px',

      '@media screen and (max-width: 576px)': {
        fontSize: '32px',
        marginBottom: '11px',
      }
    },

    p: {
      p: '0',
      maxWidth: '480px',
      lineHeight: '24px',

      '@media screen and (max-width: 576px)': {
        fontSize: '14px',
      }
    },
  },

  startBtnWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },

  startBtn: {
    marginTop: '38px',
    width: '270px',

    '@media screen and (max-width: 576px)': {
      width: '100%',
      marginTop: '34px',
    },
  },
}
