export default {
  text: {
    flex: '1 1 auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    margin: '0 0.5rem 0 0.25rem',
    fontSize: '1rem',
    width: 'fit-content',
    fontWight: '500',
  },
  container: {
    alignItems: 'center',
    '@media screen and (min-width: 576px)': {
      display: 'flex',
    },
  },
  accountContainer: {
    display: 'flex',
    '@media screen and (max-width: 576px)': {
      marginTop: '10px',
    },
  },

  loginButtonWrapper: {
    width: '153px',
  },

  accountIconWrapper: {
    padding: '12px',
    marginLeft: '12px',
    border: 'solid 1px #dae1e3',
    transition: 'all 0.25s ease-out',
    borderRadius: '8px',
    backgroundColor: 'rgba(62, 189, 147, 0.1)',
    '&:hover': {
      cursor: 'pointer',
      border: 'solid 1px #3ebd93',
      transition: 'all 0.25s ease-out',
    }
  },
}