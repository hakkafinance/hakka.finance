
export default {
  sidebar_item: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    paddingRight: '0px',
    opacity: '.5',
    cursor: 'pointer',
    transition: 'all 0.25s ease-out ',

    '&:hover': {
      opacity: '1'
    },
    '&:active': {
      backgroundColor: '#ebf0f2',
      borderRadius: '8px'
    },
    '&:focus': {
      backgroundColor: '#ebf0f2',
      borderRadius: '8px'
    }
  },
  sidebar_item_active: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: '#ebf0f2',
    cursor: 'pointer',
    borderRadius: '8px',
    '& .sidebar-text': {
      color: 'black'
    }
  },
  sidebar_text: {
    cursor: 'pointer',
    color: 'black',
    fontWeight: '600',
    lineHeight: '24px'
    // textShadow: '0.5px 0px 0px #253e47'

  }
}
