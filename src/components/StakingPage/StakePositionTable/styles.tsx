import { ThemeUIStyleObject } from 'theme-ui';

const imgWrapper: ThemeUIStyleObject = {
  size: '40px',
  background: '#f7fbfc',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  '.vault-icon': {
    size: '20px',
  },
};

const button: ThemeUIStyleObject = {
  border: '1px solid #dae1e3',
  borderRadius: '8px',
  py: '12px',
  width: '112px',
  color: '#2DA287',
  outline: 'none',
  cursor: 'pointer',
  background: 'white',
  fontWeight: 'bold',
  transition: 'all .1s linear',
  ':nth-of-type(1)': {
    mr: '8px',
  },
  ':only-child': {
    width: '232px',
  },
  ':disabled': {
    color: 'rgba(37, 62, 71, 0.25)',
  },
  ':not(:disabled):hover': {
    borderColor: '#2DA287',
  },
  ':not(:disabled):active': {
    transform: 'scale(0.97)',
  },
};

const emptySection: ThemeUIStyleObject = {
  height: '96px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  border: 'solid 1px var(--theme-ui-colors-neutral-300)',
  fontWeight: 'bold',
  color: 'rgba(37, 62, 71, 0.5)',
};

const tableWrapper: ThemeUIStyleObject = {
  width: '100%',
  '.rc-table-thead > tr > th': {
    borderBottom: 'solid 1px #dae1e3',
    textAlign: 'left',
    fontWeight: '400',
    fontSize: '14px',
    pb: '12px',
  },
  '.rc-table-row': {
    height: '78px',
  },
};

const headerWrapper: ThemeUIStyleObject = {
  '--theme-ui-colors-primary': '#3EBD93',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  '& h2': {
    mr: 'auto',
    mb: '36px',
  },
};

const switchLabel = {
  fontWeight: '600',
  fontSize: '14px',
  color: '#52666D',
  ml: '6px',
};

const switchWrapper: ThemeUIStyleObject = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const switchBtn: ThemeUIStyleObject = {
  position: 'relative',
  display: 'inline-block',
  width: '26px',
  height: '16px',
  '& input': {
    opacity: 0,
    width: 0,
    height: 0,
  },
  '& .slider': {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#dae1e3',
    borderRadius: '34px',
    transition: '.4s',
    '&:before': {
      position: 'absolute',
      content: '""',
      height: '12px',
      width: '12px',
      left: '2px',
      bottom: '2px',
      backgroundColor: 'white',
      transition: '.4s',
      borderRadius: '50%',
    }
  },
  '& input:checked + .slider': {
    backgroundColor: '#3EBD93',
  },
  '& input:focus + .slider': {
    boxShadow: '0 0 1px #2DA287',
  },
  '& input:checked + .slider:before': {
    transform: 'translateX(10px)',
  },
}

const valueWrapper: ThemeUIStyleObject = {
  textAlign: 'left',
  color: '#253E47',
  '.title': {
    display: 'block',
    fontSize: '16px',
    lineHeight: '24px',
  },
  '.sub-title': {
    display: 'block',
    color: 'rgba(37, 62, 71, 0.5)',
    fontSize: '14px',
    lineHeight: '24px',
  },
  '&.disabled': {
    color: 'rgba(37, 62, 71, 0.5)',
  },
};

const cardWrapper: ThemeUIStyleObject = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  mb: '100px',
};

export default {
  valueWrapper,
  button,
  imgWrapper,
  tableWrapper,
  headerWrapper,
  emptySection,
  cardWrapper,
  switchBtn,
  switchLabel,
  switchWrapper
};
