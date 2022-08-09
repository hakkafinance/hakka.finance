export default {
  accordionHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '43px',
    height: '60px',
    borderRadius: '8px 8px 0px 0px',
    background: 'rgba(62, 189, 147, 0.1)',
    border: '1px solid #DAE1E3',
    pointer: 'course',
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '24px',

    img: {
      marginRight: '10px',
    },
    
    ':hover': {
      cursor: 'pointer',
    },
  },

  accordionCollapse: {
    padding: '12px 20px 32px 43px',
    borderRadius: '0px 0px 8px 8px',
    border: '1px solid #DAE1E3',
    borderTop: '0',
    transition: 'max-height 0.1s linear, padding 0.1s linear, borderBottom 0.2s',
    overflow: 'hidden',
    maxHeight: '1000px',

    '@media screen and (max-width: 576px)': {
      padding: '12px 12px 32px 12px',
    },
  },


}