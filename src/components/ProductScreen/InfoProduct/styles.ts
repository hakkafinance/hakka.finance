export default {
  info_section: {
    position: 'relative',
    zIndex: '-1',
    paddingBottom: '20px',
    borderBottom: '1px solid #dae1e3',
    opacity: '0',
    height: '0',
    transition: 'all ease-out 0.25s',
    '@media screen and (max-width: 1180px)': {
      flexDirection: 'column',
    },
  },
  info_section_show: {
    paddingBottom: '20px',
    borderBottom: '1px solid #dae1e3',
    opacity: '1',
    height: '100%',
    transition: 'all ease-out 0.25s',
    '@media screen and (max-width: 1180px)': {
      flexDirection: 'column',
    },
  },
  infoTitle: {
    flex: '1',
    paddingLeft: '20px',
  },
  icon_delete_title: {
    cursor: 'pointer',
    display: 'none',
    paddingRight: '20px',
    transition: 'all 0.25s ease-out',
    opacity: '.5',
    ':hover': {
      opacity: '1',
    },
    '@media screen and (max-width: 1180px)': {
      display: 'flex',
      alignItems: 'flex-end',
    },

  },
  infoContent: {
    flex: '2',
  },
  infoTitle_name: {
    fontSize: [5, 5, 6],
    fontWeight: '700',
    fontFamily: 'system-ui',
    color: 'black',
  },
  icon_delete: {
    cursor: 'pointer',
    padding: '0 20px',
    paddingTop: '16px',
    transition: 'all 0.25s ease-out',
    opacity: '.5',
    ':hover': {
      opacity: '1',
    },
    '@media screen and (max-width: 1180px)': {
      display: 'none',
    },
  },
  infoContent_text: {
    fontSize: [1, 1, 2, 3],
    color: 'black',
    paddingLeft: '20px',
    paddingRight: '20px',
    whiteSpace: 'pre-line'
  },
  tag_box: {
    backgroundColor: 'active_green',
    padding: '6px 12px',
    borderRadius: '8px',
    color: 'black',
    fontSize: [1, 1, 2, 3],
  },
  btn_section: {
    padding: '0 20px',
    '@media screen and (max-width: 1180px)': {
      flexDirection: 'column',
    },
  },
};
