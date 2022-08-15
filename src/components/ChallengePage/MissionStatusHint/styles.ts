export default {
  container: {
    display: 'flex',
    alignItems: 'center',

    '> div': {
      marginRight: '20px',
    },

    '@media screen and (max-width: 576px)': {
      
    },
  },

  hintItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    p: {
      fontSize: '12px',
      fontWeight: '600',
      lineHeight: '24px',
      color: '#929FA3',
      paddingLeft: '10.5px',
    },
  },

  dot: {
    width: '17px',
    height: '17px',
    borderRadius: '50%',
  },
}