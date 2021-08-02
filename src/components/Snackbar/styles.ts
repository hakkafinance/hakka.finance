export default {
  container: {
    position: 'fixed',
    top: '88px',
    right: '24px',

    '@media screen and (max-width: 576px)': {
      top: '100px',
      left: '18px',
      maxWidth: '90vw',
      zIndex: '80',
    }
  },
  wrapper: {
    padding: '24px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    boxShadow: '0 8px 16px -2px rgba(10, 10, 10, 0.1)',
  },
  message: {
    color: '#000',
    fontSize: '14px',
    fontWeight: '500',
  },
}