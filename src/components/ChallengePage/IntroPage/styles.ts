import images from "../../../images";

export default {
  introGraphWrapper: {
    padding: '40px 30px 88px 30px',
    backgroundImage: `linear-gradient(90deg, #44D2BA 1.76%, #75E3B9 28.53%, #8CEBB9 63.21%, rgba(255, 255, 255, 0) 67.64%), url(${images.iconRectangle})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left, right',
    backgroundSize: 'auto, contain',
    borderRadius: '8px',

    '@media screen and (max-width: 576px)': {
      padding: '28px 20px 289px 20px',
      backgroundImage: `linear-gradient(180deg, #44D2BA 1.93%, #75E3B9 39.47%, rgba(122, 229, 185, 0.81) 53.38%, rgba(140, 235, 185, 0.25) 64.66%, rgba(255, 255, 255, 0) 74.25%), url(${images.iconRectangle})`,  
      backgroundPosition: 'top, bottom',
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
    marginTop: '20px',
    width: '270px',

    '@media screen and (max-width: 576px)': {
      width: '100%',
    },
  },
}
