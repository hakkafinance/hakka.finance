export default {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '48px 32px',
    color: '#253e47',
    fontSize: '16px',

    '@media screen and (max-width: 576px)': {
      padding: '32px 16px 24px',
    },
  },

  title: {
    margin: '32px 0 8px 0',
    fontSize: '24px',
    lineHeight: '48px',
    fontWeight: '700',

    '@media screen and (max-width: 576px)': {
      fontSize: '20px',
    },
  },

  subtitle: {
    margin: '0 0 16px 0',
    fontSize: '20px',
    lineHeight: '40px',
    fontWeight: '700',

    '@media screen and (max-width: 576px)': {
      fontSize: '16px',
    },
  },

  content: {
    margin: '0 0 32px 0',
    fontWeight: '600',
    lineHeight: '20px',
    maxWidth: '291px',
    textAlign: 'center',
  },

  buttonSection: {
    width: '180px',
    margin: '0 auto',
  },

  decorativeThreadContainer: {
    display: 'flex',
    marginBottom: '16px',
    width: '50%',
    gap: '2px'
  },

  decorativeThread: {
    height: '4px',
    flexGrow: '1',
    borderRadius: '3px'
  },
};
  