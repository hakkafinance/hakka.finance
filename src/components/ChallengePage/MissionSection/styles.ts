export default {
  missionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    h4: {
      fontWeight: '600',
      fontSize: '24px',
      lineHeight: '28px',
    },

    '@media screen and (max-width: 576px)': {
      h4: {
        fontSize: '18px',
      },
    },
  },

  hr: {
    margin: '0',
    borderTop: '0', 
    borderColor: '#E6E6E6',
  },

  missionItemWrapper: {
    marginBottom: '10px'
  },
}