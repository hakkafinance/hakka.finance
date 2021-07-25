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
    display: 'flex',
    alignItems: 'center',
  },

  loginButtonWrapper: {
    width: '153px',
    '@media screen and (max-width: 576px)': {
      width: '176px',
      order: '-1',
    },
  },

  accountIconWrapper: {
    padding: '12px',
    marginLeft: '12px',
    border: 'solid 1px #dae1e3',
    transition: 'all 0.25s ease-out',
    borderRadius: '8px',
    backgroundColor: 'rgba(62, 189, 147, 0.1)',
    '@media screen and (max-width: 576px)': {
      marginLeft: '0'
    },
    '&:hover': {
      cursor: 'pointer',
      border: 'solid 1px #3ebd93',
      transition: 'all 0.25s ease-out',
    }
  },
}