export default {
  card: {
    backgroundColor: '#fff',
    border: 'solid 1px #ebf0f2',
    borderRadius: '8px',
    boxShadow: '0 5px 16px -8px rgba(123, 135, 148, 0.25)',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.25s ease-out',
    '& .top-left-icon': {
      filter: 'grayscale(100%)',
      transition: 'all 0.25s ease-out'
    },
    ':hover': {
      '& .text-visit': {
        opacity: 1
      },
      '& .top-left-icon': {
        filter: 'grayscale(0%)'

      },
      border: 'solid 1px #3ebd93'
    },

    ':active': {
      transform: 'scale(.98)',
      backgroundColor: '#f7fbfc'
    },
    '@media screen and (max-width: 576px)': {
      padding: '12px',
      display: 'flex',
      flexDirection: 'column'
    }
  },
  card_content: {
    // display: 'flex',
    justifyContent: 'space-between',
    paddingTop: ['12px', '60px', '60px', '60px'],

    '@media screen and (max-width: 576px)': {
      flexDirection: 'column'
    }
  },
  dropdown_text: {
    display: 'none',
    fontSize: [1, 1, 1, 1],
    color: 'rgba(37, 62, 71, 0.5)',
    fontWeight: '600',
    '@media screen and (max-width: 576px)': {
      display: 'flex'
    }
  },
  card_text: {
    fontSize: [3, 3, 4, 5],
    paddingBottom: ['16px', '0px', '0px', '0px'],
    fontWeight: 'bold',
    color: 'black_grey'
  },
  img_icon: {
    '@media screen and (max-width: 960px)': {
      width: '48px',
      height: '48px'
    }
  },
  text_visit: {
    opacity: 0,
    color: 'green',
    fontSize: [1, 1, 2, 3],
    fontWeight: 'bold',
    transition: 'all 0.25s ease-out',
    '@media screen and (max-width: 576px)': {
      display: 'none'
    }
  }
}
