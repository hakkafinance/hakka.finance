export default {
//   displayFlex: {
//     display: "flex",
//   },
  sidebar: {
    overflow: 'auto',
    maxHeight: '100vh',
    minHeight: '100%',
    '::-webkit-scrollbar': {
      display: 'none'
    },
    color: 'black',
    fontSize: '16px',
    backgroundColor: 'white_green',
    width: '250px',
    // maxWidth: '18vw',
    mr: 0,
    display: 'block',
    transition: 'all 0.25s ease-out',
    borderRight: '1px solid #dae1e3',
    '@media screen and (max-width: 768px)': {
      maxWidth: '0px',
      overflow: 'hidden',
      transition: 'all 0.25s ease-out'

    }
  },
  custom_padding: {
    padding: '12px'
  },
  sidebar_subText: {
    fontSize: '14px'
  },
  // hl : horizontal line
  hl: {
    borderTop: '0.5px solid #dae1e3'
  },
  bold_text: {
    color: 'black',
    opacity: '.5',
    fontWeight: '600',
    fontSize: '16px'
    // textShadow: '0.5px 0px 0px #253e47'

  },
  bold_text_link: {
    color: 'text_grey',
    fontWeight: '600',
    fontSize: '14px'
  },
  sidebar_btn: {
    width: '1'
  },

  medium_content: {
    display: 'flex',
    color: 'text_grey',
    justifyContent: 'space-between'
  },
  left_icon: {
    opacity: '.5'
  }
}
