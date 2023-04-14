export default {
  mainContentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '60px',

    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
      alignItems: 'center',
      gap: '32px',
    },
  },

  title: {
    margin: '0 0 32px 0',
    color: 'rgba(82, 102, 109, 1)',
    fontWeight: '600',
    fontSize: '32px',
    lineHeight: '44px',

    '@media screen and (max-width: 576px)': {
      fontSize: '24px',
      lineHeight: '28px',
    }
  },

  content: {
    margin: '0',
    color: 'rgba(37, 62, 71, 1)',
    fontWeight: '400',
    lineHeight: '24px',
  },

  startBtn: {
    marginTop: '44px',
    width: '280px',

    '@media screen and (max-width: 576px)': {
      width: '100%',
      marginTop: '40px',
    },
  },

  howHakkaIcon: {
    '@media screen and (max-width: 576px)': {
      width: '240px',
      height: '288px'
    },
  },
}