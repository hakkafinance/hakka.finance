import type { ThemeUICSSObject } from 'theme-ui';
export default {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '18px',
    color: 'rgba(37,62,71,0.5)',
    '.positive': {
      color: 'var(--theme-ui-colors-primary-600)',
    }
  },
  'img': {
    size: '21px',
    mr: '11.5px'
  } as ThemeUICSSObject,

  total: {
    color: 'rgba(37, 62, 71, 0.5)',
    fontSize: '14px',
    ml: 'auto'
  }

}