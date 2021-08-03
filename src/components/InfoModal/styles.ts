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
    padding: '14px 20px 14px 20px',
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
  title: {
    width: '217px',
    height: '24px',
    margin: '20px 62px 8px 20px',
    fontSize: '18px',
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.33',
    letterSpacing: 'normal',
    color: 'inherit',
  },
  balance:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    marginBottom: '20px',
  },
  displayBetween:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '20px',
    marginBottom: '20px',
  },
  addMetamaskBtn: {
    display:'flex',
    alignItems: 'center',
    padding: '4px 6px',
    height: '28px',
    borderRadius: '8px',
    backgroundColor: '#f7fbfc',
    border: 'none',

    ':hover' :{
      cursor: 'pointer',
      backgroundColor: 'rgba(62, 189, 147, 0.1)',
    }
  },
  pageBtn: {
    fontSize: '16px',
    fontWeight: '600',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: 'normal',
    color: '#253e47',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px 12px 20px',
    width: '122px',
    height: '48px',
    borderRadius: '8px',
    backgroundColor: '#f7fbfc',
    border: 'none',

    ':hover' :{
      cursor: 'pointer',
      backgroundColor: 'rgba(62, 189, 147, 0.1)',
    }
  },
  iconAdd: {
    width: '16px',
    marginRight: '2px',
  },
  divider: {
    height: '1px',
    backgroundColor: '#dae1e3',
    margin: '0 20px 0 20px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.71',
    letterSpacing: 'normal',
    color: '#253e47',
  },
  hakkaIcon: {
    margin: '0 20px 0 20px',
  },
  hakkaValue: {
    display: 'flex',
    fontSize: '24px',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: 'normal',
    color: '#253e47',
    margin: '0 20px 0 20px',
    maxWidth: '160px',
    minWidth: '85px',
  },
  data: {
    fontSize: '16px',
    fontWeight: '600',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.5',
    letterSpacing: 'normal',
    color: '#253e47',
  }
}
