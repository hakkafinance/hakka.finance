export default {
  progressBarContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexGrow: '1',
    width: '100%',
    borderRadius: '23px',
    border: '1px solid rgba(82, 102, 109, 0.3)',
    height: '24px',
    padding: '2px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: '24px',
  },

  progressBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: '23px',
    height: '100%',

    span: {
      paddingRight: '10px',
      color: '#ffffff',
    },
  },

  progressBarZeroStatus: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '23px',
    width: '20px',
    height: '100%',
    backgroundColor: '#FF8E8E',
  },
}