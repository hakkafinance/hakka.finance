import { ThemeUICSSObject } from 'theme-ui';
export default {
  optionContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    '@media screen and (max-width: 576px)': {
      flexWrap: 'wrap',
      rowGap: '12px'
    }
  },

  wrapper: {
    position: 'relative',
    display: 'flex',
    height: '36px',
    lineHeight: '36px',
    mt: '24px',
    '&.option-block': {
      backgroundColor: '#f7fbfc',
    },
    borderRadius: '8px',
    '::before': {
      bottom: 'calc(100% + 8px)',
      content: 'attr(data-label)',
      fontSize: '12px',
      lineHeight: '16px',
      position: 'absolute',
      left: '0',
    },
    '.period-option': {
      cursor: 'pointer',
      width: '36px',
      lineHeight: '36px',
      textAlign: 'center',
      color: '#253e47',
      '&.active': {
        background: 'rgba(62, 189, 147, 0.1)',
        borderRadius: '8px',
        color: 'var(--theme-ui-colors-primary-600)',
      },
      '&.disabled': {
        color: 'rgba(37, 62, 71, 0.25)',
      },
    },
    
  },

  title: {
    color: '#253e47',
    fontSize: '14px',
  }
} as Record<string, ThemeUICSSObject>;
