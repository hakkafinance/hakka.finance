export default {
  itemWrapper: {
    fontSize: '14px',

    p: {
      margin: '0'
    }
  },

  mainContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px',

    '@media screen and (max-width: 576px)': {
      gap: '20px',
    },
  },

  title: {
    fontWeight: '600',
    lineHeight: '20px',
    color: 'rgba(37, 62, 71, 0.5)',
    paddingBottom: '14px'
  },

  performance: {
    paddingBottom: '8px',
    fontSize: '18px',
    fontWeight: '700',
    lineHeight: '24px',
    color: 'rgba(37, 62, 71, 1)',
  },

  comment: {
    fontWeight: '600',
    lineHeight: '24px',
    color: 'rgba(31, 136, 122, 1)',

    '@media screen and (max-width: 576px)': {
      display: 'none',
    },
  },

  mobileCOmment: {
    display: 'none',
    paddingTop: '8px',
    fontWeight: '600',
    lineHeight: '24px',
    color: 'rgba(31, 136, 122, 1)',

    '@media screen and (max-width: 576px)': {
      display: 'block',
    },
  }
}