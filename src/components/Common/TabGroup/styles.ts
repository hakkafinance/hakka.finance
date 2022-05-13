import type { ThemeUICSSObject } from 'theme-ui';

const tabActive: ThemeUICSSObject = {
  backgroundColor: '#ebf0f2',
  color: '#253e47',
  '& img': {
    opacity: '1',
  }
}

export default {
  display: 'flex',
  color: 'rgba(37, 62, 71, 0.5)',
  fontWeight: '600',

  div: {
    padding: '10px 12px',
    borderRadius: '8px',
    fontSize: '14px',

    ':hover': {
      cursor: 'pointer',
      color: '#253e47',
      '& img': {
        opacity: '0.8',
      }
    },

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    img: {
      mr: '8px',
      opacity: '0.5',
    }
  },


  'div.active' : tabActive
}
