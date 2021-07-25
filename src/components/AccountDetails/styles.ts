export default {
  copyIcon: {
    color: '#888D9B',
    display: 'flex',
    textDecoration: 'none',
    fontSize: '0.825rem',


    padding: '14px 16px',
    backgroundColor: '#fff',
    border: 'solid 1px #dae1e3',
    width: '160px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.25s ease-out',
    textAlign: 'center',
  },
  headerRow: {
    display: 'flex',
    flexFlow: 'row nowrap',
    padding: '1rem 1rem',
    fontWeight: '500',
    color: 'inherit',
  },
  upperSection: {
    position: 'relative',
  
    'h5': {
      margin: '0',
      marginBottom: '0.5rem',
      fontSize: '1rem',
      fontWeight: '400',
    },

    'h4': {
      marginTop: '0',
      fontWeight: '500',
    }
  },
  infoCard: {
    padding: '1rem',
    border: '1px solid #edeef2',
    borderRadius: '1px',
    position: 'relative',
    display: 'grid',
    gridRowGap: '12px',
    marginBottom: '20px',
  },
  accountGroupingRow: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: '400',
    color: '#000000',
  
    'div': {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
    }
  },
  accountSection: {
    backgroundColor: '#ffffff',
    padding: '0rem 1rem',
  },
  yourAccount: {
    'h5': {
      margin: '0 0 1rem 0',
      fontWeight: '400',
    },
  
    'h4': {
      margin: '0',
      fontWeight: '500',
    }
  },
  accountControl: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '0',
    width: '100%',
  
    fontWeight: '500',
    fontSize: '1.25rem',
  
    'a:hover': {
      textDecoration: 'underline',
    },
  
    'p': {
      minWidth: '0',
      margin: '0',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }
  },
  addressLink: {
    fontSize: '0.825rem',
    color: '#888d9b',
    marginLeft: '1rem',
    display: 'flex',
    ':hover': {
      color: '#565a69',
    }
  },
  closeIcon: {
    position: 'absolute',
    right: '1rem',
    top: '14px',
    '&:hover': {
      cursor: 'pointer',
      opacity: '0.6',
    }
  },
  walletName: {
    width: 'initial',
    fontSize: '0.825rem',
    fontWeight: '500',
    color: '#888d9b',
  },
  walletAction: {
    width: 'fit-content',
    fontWeight: '400',
    marginLeft: '8px',
    fontSize: '0.825rem',
    padding: '4px 6px',
    ':hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    }
  },
}