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

  subTitleWrapper: {
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '24px',
    color: 'rgba(37, 62, 71, 0.5)',
    marginBottom: '60px',

    p: {
      margin: '0',
    }
  },

  missionSectionWrapper: {
    paddingTop: '50px',
  },

  learnMoreLink: {
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'underline',
    color: 'rgba(37, 62, 71, 0.5)',
    opacity: 0.8,
    filter: 'grayscale(100%)',
    transition: 'all 0.25s ease-out',

    ':hover': {
      cursor: 'pointer',
      opacity: 1,
      filter: 'grayscale(0)',
      color: '#2da287',
    },
  },
}