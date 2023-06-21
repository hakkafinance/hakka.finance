export default {
//   displayFlex: {
//     display: "flex",
//   },
  sidebar_responsive: {
    zIndex: '50',
    transition: 'all ease-out 0.5s',
    '@media screen and (max-width:576px)': {
      position: 'absolute',
      right: '-100%',
      bottom: '0',
      top: '0',
    },
  },
  sidebar_responsive_show: {
    zIndex: '50',
    transition: 'all ease-out 0.5s',
    '@media screen and (max-width:576px)': {
      position: 'absolute',
      right: '0',
      bottom: '0',
      top: '0',
    },
  },
  sidebar: {
    overflow: 'auto',
    maxHeight: '100vh',
    minHeight: '100%',
    '::-webkit-scrollbar': {
      display: 'none',
    },
    color: 'black',
    fontSize: '16px',
    backgroundColor: 'white_green',
    width: '250px',
    mr: 0,
    transition: 'all 0.25s ease-out',
    borderRight: '1px solid #dae1e3',
    boxShadow: '-8px 0 16px -8px rgba(123, 135, 148, 0.25)',
    '@media screen and (max-width: 576px)': {
      width: '96vw',
    },
  },
  custom_padding: {
    padding: '12px',
  },
  sidebar_header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  sidebar_closeBtn: {
    display: 'none',
    cursor: 'pointer',
    '@media screen and (max-width: 576px)': {
      display: 'block',
      padding: '0px 12px',

    },
  },
  sidebar_subText: {
    fontSize: '14px',
  },
  // hl : horizontal line
  hl: {
    borderTop: '0.5px solid #dae1e3',
  },
  bold_text: {
    color: 'black',
    fontWeight: '600',
    fontSize: '16px',

  },
  bold_text_link: {
    color: 'text_grey',
    fontWeight: '600',
    fontSize: '14px',
  },
  sidebar_btn: {
    width: '1',
  },

  medium_content: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 16px',
    paddingRight: '0px',
    cursor: 'pointer',
    opacity: '.5',
    transition: 'all 0.25s ease-out ',

    ':hover': {
      opacity: '1',
    },
  },
  // left_icon: {
  //   opacity: '.5'
  // }
};
