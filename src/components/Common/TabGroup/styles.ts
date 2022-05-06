import type { ThemeUICSSObject } from 'theme-ui';

const tabActive: ThemeUICSSObject = {
  backgroundColor: '#ebf0f2',
  color: '#253e47',
}

export default {
  display: 'flex',
  color: 'rgba(37, 62, 71, 0.5)',
  fontWeight: '600',

  div: {
    padding: '12px 24px',
    borderRadius: '8px',

    ':hover': {
      cursor: 'pointer',
      color: '#253e47',
    },

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    img: {
      mr: '1rem',
    }
  },


  'div.active' : tabActive
}
