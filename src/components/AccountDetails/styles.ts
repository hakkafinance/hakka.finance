import { ThemeUIStyleObject } from 'theme-ui';

export default {
  copyIcon: {
    color: '#888D9B',
    display: 'flex',
    textDecoration: 'none',
    fontSize: '14px',
    border: 'none',
    width: '120px',
    height: '40px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.25s ease-out',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7fbfc',

    ':focus': {
      outline: 'none',
    },
  },
  headerRow: {
    fontSize: '18px',
    display: 'flex',
    flexFlow: 'row nowrap',
    padding: '1rem 1rem',
    fontWeight: '600',
    color: 'inherit',
  },
  upperSection: {
    position: 'relative',

    h5: {
      margin: '0',
      marginBottom: '0.5rem',
      fontSize: '1rem',
      fontWeight: '400',
    },

    h4: {
      marginTop: '0',
      fontWeight: '500',
    },
  },
  illustration: {
    position: 'fixed',
    width: '90px',
    height: '90px',
    margin: '0 139px 27px 0',
    padding: '45px 11px 21px 0',
    webkitFilter: 'blur(20px)',
    filter: 'blur(20px)',
    backgroundColor: 'rgba(217, 251, 227, 0.3)',
  },
  infoCard: {
    position: 'relative',
    display: 'grid',
    gridRowGap: '12px',
    marginBottom: '20px',
    '@media screen and (min-width: 576px)': {
      padding: '1rem',
    },
  },
  accountGroupingRow: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: '400',
    color: '#000000',

    div: {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
    },
  },
  accountSection: {
    backgroundColor: '#ffffff',
    padding: '0rem 1rem',
  },
  yourAccount: {
    h5: {
      margin: '0 0 1rem 0',
      fontWeight: '400',
    },

    h4: {
      margin: '0',
      fontWeight: '500',
    },
  },
  buttonSection: {
    marginTop: '30px',
  },
  accountControl: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '0',
    width: '100%',

    fontWeight: '500',
    fontSize: '24px',

    'a:hover': {
      textDecoration: 'underline',
    },

    p: {
      minWidth: '0',
      margin: '0',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  addressLink: {
    fontSize: '0.825rem',
    color: '#888d9b',
    marginLeft: '1rem',
    display: 'flex',
    ':hover': {
      color: '#565a69',
    },
  },
  closeIcon: {
    position: 'absolute',
    right: '1rem',
    top: '14px',
    '&:hover': {
      cursor: 'pointer',
      opacity: '0.6',
    },
  },
  walletName: {
    width: 'initial',
    fontSize: '14px',
    fontWeight: '500',
    color: '#888d9b',
  },
  network: {
    width: 'initial',
    fontSize: '14px',
    fontWeight: '500',
  },
  walletAction: {
    width: 'fit-content',
    fontWeight: '400',
    marginLeft: '8px',
    fontSize: '0.825rem',
    padding: '4px 6px',
    ':hover': {
      cursor: 'pointer',
      textDeaccountGroupingRowcoration: 'underline',
    },
  },
} as Record<string, ThemeUIStyleObject>;
