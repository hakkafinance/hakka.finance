export default {
  dialogOverlay: {
    '&[data-reach-dialog-overlay]': {
      zIndex: '2',
      backgroundColor: 'rgba(37, 62, 71, 0.25)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  dialogContent: {
    '&[data-reach-dialog-content]': {
      margin: '0 0 2rem 0',
      border: '1px solid #ffffff',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 8px 0 #c8c8c8',
      padding: '0px',
      width: '50vw',
      overflow: 'auto',

      alignSelf: 'center',

      maxWidth: '460px',
      maxHeight: '90vh',
      display: 'flex',
      borderRadius: '8px',

      '@media (max-width: 960px)': {
        width: '65vw',
        margin: '0',
      },

      '@media (max-width: 720px)': {
        width: '85vw',
      },
    },
  },
};
