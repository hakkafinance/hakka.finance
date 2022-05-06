import { ThemeUIStyleObject } from 'theme-ui';

const imgWrapper: ThemeUIStyleObject = {
  size: '40px',
  background: '#f7fbfc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  icon: {
    size: '20px',
  },
};

const button: ThemeUIStyleObject = {
  border: '1px solid #dae1e3',
  py: '12px',
  width: '112px',
  color: '#2DA287',
  outline: 'none',
  cursor: 'pointer',
  background: 'white',
  fontWeight: 'bold',
  ':nth-child(1)': {
    mr: '8px',
  },
  ':only-child': {
    width: '232px',
  },
  ':disabled': {
    color: 'rgba(37, 62, 71, 0.25)',
  },
  ':not(:disabled):hover': {
    background: '#2DA287',
    color: 'white',
    borderColor: '#2DA287',
  },
};

const valueWrapper: ThemeUIStyleObject = {
  textAlign: 'left',
  '.title': {
    color: '#253E47',
    fontSize: '16px',
    lineHeight: '24px',
  },
  '.sub-title': {
    color: 'rgba(37, 62, 71, 0.5)',
    fontSize: '14px',
    lineHeight: '24px',
  },
};

export default {
  valueWrapper,
  button,
};
