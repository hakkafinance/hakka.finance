export default {
  container: {
    position: 'relative',
    width: '268px',
    padding: '28px 20px 20px 20px',
    border: '1px solid #ebf0f2',
    borderRadius: '8px',
    boxShadow: '0 8px 16px -8px rgba(123, 135, 148, 0.25)',
    overflow: 'auto', // create BFC

    '@media screen and (max-width: 576px)': {
      width: '100%',
    },
  },

  illustration: {
    width: '60px',
    height: '60px',
    position: 'absolute',
    left: '0',
    top: '0',
    // -webkit-filter: 'blur(20px)',
    filter: 'blur(20px)',
    backgroundColor: 'rgba(217, 251, 227, 0.3)',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',

    'p': {
      color: '#2da287',
      fontSize: '1rem',
      lineHeight: '1.5',
      fontWeight: 'bold',
      margin: '0',
    },
  },

  title: {
    margin: '0',
    paddingTop: '28px',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    lineHeight: '1.33',
  },

  link: {
    display: 'flex',
    paddingTop: '12px',
    paddingBottom: '20px',
    fontSize: '0.875rem',
    color: 'rgba(37, 62, 71, 0.5)',
    fontWeight: '600',
    lineHeight: '1.71',
    opacity: 0.8,
    filter: 'grayscale(100%)',
    transition: 'all 0.25s ease-out',
    textDecoration: 'none',

    ':hover': {
      cursor: 'pointer',
      opacity: 1,
      filter: 'grayscale(0)',
      color: '#2da287'
    },

    'span': {
      paddingRight: '4px',
    },
  },

  rewardInfo: {
    paddingBottom: '28px',

    'p': {
      margin: '8px 0 0 0 ',
      fontSize: '0.875rem',
    }
  },

  amountWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: '600',

  },

  amount: {
    color: 'rgba(37, 62, 71, 0.5)'
  },
}