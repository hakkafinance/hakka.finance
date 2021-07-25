export default {
  closeIcon: {
    position: 'absolute',
    right: '1rem',
    top: '14px',
    '&:hover': {
      cursor: 'pointer',
      opacity: '0.6',
    }
  },
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    margin: '0',
    padding: '0',
    width: '100%',
  },
  headerRow: {
    display: 'flex',
    flexFlow: 'row nowrap',
    padding: '1rem 1rem',
    fontWeight: '500',
    color: 'inherit',
  },
  contentWrapper: {
    padding: '2rem',
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
  },
  upperSection: {
    position: 'relative',
  
    'h5': {
      margin: '0',
      marginBottom: '0.5rem',
      fontSize: '1rem',
      fontWeight: '400',
    },
  
    'h5:last-child': {
      marginBottom: '0px',
    },
  
    'h4': {
      marginTop: '0',
      fontWeight: '500',
    }
  },
  hoverText: {
    ':hover': {
      cursor: 'pointer',
    }
  },
}
