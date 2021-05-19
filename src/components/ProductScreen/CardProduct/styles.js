export default {
  card: {
    height: '100%',
    backgroundColor: '#fff',
    border: 'solid 1px #ebf0f2',
    borderRadius: '8px',
    boxShadow: '0 5px 16px -8px rgba(123, 135, 148, 0.25)',
    // padding: '20px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.25s ease-out',
    '& .card-text': {
      color: 'black_grey'
    },
    '& .dropdown-text': {
      opacity: '.5'
    },
    ':hover': {
      border: 'solid 1px #3ebd93'
    },

    ':active': {
      transform: 'scale(.98)',
      backgroundColor: '#f7fbfc'
    },
    '@media screen and (max-width: 576px)': {
      // padding: '12px',
      display: 'flex',
      flexDirection: 'column'
    }
  },
  card_active: {
    height: '100%',
    transform: 'scale(.98)',
    backgroundColor: '#f7fbfc',
    borderRadius: '8px',
    border: 'solid 1px #3ebd93',
    boxShadow: '0 5px 16px -8px rgba(123, 135, 148, 0.25)',
    // padding: '20px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.25s ease-out',
    '& .card-text': {
      color: 'black'
    },
    '& .dropdown-text': {
      opacity: '1'
    },
    '@media screen and (max-width: 576px)': {
      // padding: '12px',
      display: 'flex',
      flexDirection: 'column'
    }
  },
  card_link: {
    padding: ['2px', '10px', '10px', '10px'],
    paddingBottom: ['12px', '28px', '28px', '28px'],
    '& .top-left-icon': {
      filter: 'grayscale(100%)',
      transition: 'all 0.25s ease-out'
    }
  },
  card_content: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '48px',
    alignItems: 'flex-end',
    padding: ['12px', '20px', '20px', '20px'],
    paddingTop: ['0px', '0px', '0px', '0px'],
    '& .bottom-right-icon': {
      filter: 'grayscale(100%)',
      transition: 'all 0.25s ease-out'
    },
    ':hover': {
      '& .bottom-right-icon': {
        filter: 'grayscale(0%)'
      },
      '& .card-text': {
        color: 'black'
      }
    },
    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
      alignItems: 'unset'

    }
  },
  dropdown_text: {
    display: 'none',
    fontSize: [1, 1, 1, 1],
    color: 'black',
    fontWeight: '600',
    '@media screen and (max-width: 576px)': {
      display: 'flex'
    }
  },
  card_text: {
    fontSize: [3, 3, 4, 5],
    fontFamily: 'system-ui',
    paddingBottom: ['16px', '0px', '0px', '0px'],
    fontWeight: 'bold',
    minHeight: '48px',
    display: 'flex',
    alignItems: 'flex-end'
    // color: 'black_grey'
  },
  img_icon: {
    '@media screen and (max-width: 960px)': {
      width: '48px',
      height: '48px'
    }
  },

  link: {
    padding: '10px',
    ':hover': {
      '& .text-visit': {
        color: 'green'
      },
      '& .top-left-icon': {
        filter: 'grayscale(0%)'
      },
    },
  },

  text_visit: {
    color: 'gray',
    fontSize: [1, 1, 2, 3],
    fontWeight: 'bold',
    transition: 'all 0.25s ease-out',
    '@media screen and (max-width: 576px)': {
      display: 'none'
    }
  }
}
