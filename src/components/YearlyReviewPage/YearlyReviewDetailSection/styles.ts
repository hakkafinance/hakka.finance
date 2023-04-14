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
    margin: '0 0 36px 0',
    fontSize: '24px',
    fontWeight: '700',
    lineHeight: '28px',
    color: 'rgba(82, 102, 109, 1)',

    '@media screen and (max-width: 576px)': {
      display: 'none',
    },
  },

  content: {
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '20px',
    color: 'rgba(37, 62, 71, 0.5)'
  },

  countScoreButton: {
    marginTop: '48px',
    width: '200px',

    '@media screen and (max-width: 576px)': {
      width: '100%',
    },
  },

  reviewList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',

    '@media screen and (max-width: 576px)': {
      gap: '48px',
    },
  }
}