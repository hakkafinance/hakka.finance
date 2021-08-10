export default {
  infoCard: {
    padding: '1rem',
    outline: 'none',
    border: '1px solid',
    borderRadius: '12px',
    width: '100% !important',
    '&:focus': {
      boxShadow: '0 0 0 1px #c8c8c8',
    },
    borderColor: '#EDEEF2',
  },
  illustration: {
    zIndex: 0,
    position: 'fixed',
    width: '90px',
    height: '90px',
    margin: '0 139px 27px 0',
    padding: '45px 11px 21px 0',
    webkitFilter: 'blur(20px)',
    filter: 'blur(20px)',
    backgroundColor: 'rgba(217, 251, 227, 0.3)',
  },
  optionCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
  },
  optionCardLeft: {
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    height: '100%',
  },
  optionCardClickable: {
    marginTop: '0',
    '&:hover': {
      cursor: 'pointer',
      border: '1px solid #c8c8c8',
    },
    opacity: 1,
  },
  greenCircle: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',

    '&:first-child': {
      height: '8px',
      width: '8px',
      marginRight: '8px',
      backgroundColor: '#27ae60',
      borderRadius: '50%',
    },
  },
  circleWrapper: {
    color: '#27ae60',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    display: 'flex',
    flexFlow: 'row nowrap',
    color: '#000000',
    fontSize: '1rem',
    fontWeight: '500',
  },
  iconWrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    '& > img, span': {
      height: '24px',
      width: '24px',
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
  wrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    margin: '0',
    padding: '0',
    width: '100%',
  },
  headerRow: {
    fontSize: '18px',
    display: 'flex',
    flexFlow: 'row nowrap',
    padding: '1rem 1rem',
    fontWeight: '600',
    color: 'inherit',
  },
  contentWrapper: {
    padding: '2rem',
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
  },
  upperSection: {
    position: 'relative',

    h5: {
      margin: '0',
      marginBottom: '0.5rem',
      fontSize: '1rem',
      fontWeight: '400',
    },

    'h5:last-child': {
      marginBottom: '0px',
    },

    h4: {
      marginTop: '0',
      fontWeight: '500',
    },
  },
  optionGrid: {
    display: 'grid',
    gridGap: '10px',
  },
  hoverText: {
    zIndex: 1,
    ':hover': {
      cursor: 'pointer',
    },
  },
};
