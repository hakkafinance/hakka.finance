import { ThemeUICSSObject } from 'theme-ui';
const ColorTheme = {
  '--neutral-900': '#253E47',
  '--background-color': '#f7fbfc',
};
const button: ThemeUICSSObject = {
  ...ColorTheme,
  borderRadius: '0.5rem',
  backgroundColor: 'var(--background-color)',
  border: '0',
  padding: '0.5rem 0.75rem',
  cursor: 'pointer',
  fontSize: '14px',
  color: 'var(--neutral-900)',
  textDecoration: 'unset',
  fontWeight: '400',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export { button as NormalButton, ColorTheme as ButtonColorTheme };
