import images from '../../../images';
import { ThemeUICSSObject } from 'theme-ui';
export default {
  wrapper: {
    mt: '56px',
    boxSizing: 'border-box',

    backgroundImage: `url(${images.iconStakingBanner}), linear-gradient(89.4deg, #8CEBB9 0%, #D9FBE3 100%)`,
    backgroundRepeat: 'no-repeat',
    height: '80px',

    display: 'grid',
    gridTemplateAreas: "'title link-label link-icon'",
    gridTemplateColumns: '1fr auto auto',
    alignItems: 'center',
    padding: '0 32px 0 60px',
    borderRadius: '8px',

    cursor: 'pointer',
    border: 'solid 1px transparent',

    '&:hover': {
      border: 'solid 1px #8cebb9',
      '& .navigate-link': {
        opacity: '1',
      },
      '& img': {
        filter: 'drop-shadow(0px 0px 0px black)',
      },
    },

    '& strong': {
      gridArea: 'title',
      fontSize: '16px',
      color: 'var(--theme-ui-colors-neutral-900)',
    },

    '& .navigate-link': {
      gridArea: 'link-label',
      fontSize: '14px',
      fontWeight: '600',
      color: 'rgba(37, 62, 71)',
      opacity: '0.5',
    },
    '& >img': {
      gridArea: 'link-icon',
      verticalAlign: 'middle',
    },

    '@media screen and (max-width: 576px)': {
      gridTemplateAreas: "'title link-icon' 'link-label link-icon' ",
      gridTemplateColumns: '1fr auto',
      borderRadius: 0,
      margin: '26px -16px 20px',
      padding: '0 28px 0 16px',
      '& strong': {
        alignSelf: 'end'
      },
      '& .navigate-link': {
        alignSelf: 'start'
      },
    }
  } as ThemeUICSSObject,
};
