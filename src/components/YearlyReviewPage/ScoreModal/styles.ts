import images from "../../../images";

export default {
  container: {
    width: '100%',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'rgba(37, 62, 71, 0.5)',
    overflow: 'hidden',

    '@media screen and (max-width: 576px)': {
      padding: '20px 6px',
    },
  },

  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    align_items: 'center',
    mb: '16px',
    width: '90%',
  },

  title: {
    margin: '0',
    fontSize: '18px',
    fontWeight: '700',
    lineHeight: '24px',
  },

  closeBtn: {
    cursor: 'pointer',

    ':hover': {
      opacity: '0.6',
    },
  },

  modalTitleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '26px',

    p: {
      margin: '0',
    },
  },

  modalTitle: {
    margin: '8px 0 2px 0',
  },

  dateWrapper: {
    display: 'flex',
    align: 'center',
    justifyContent: 'space-between',
    gap: '6px',
    color: 'rgba(59, 184, 163, 1)',
    fontWeight: '700',
    fontSize: '15px',
    lineHeight: '20px',
    whiteSpace: 'nowrap',
  },

  shareCard: {
    position: 'relative',
    marginBottom: '16px',
    padding: '24px 18px',
    backgroundImage: `url(${images.bgShareCard})`,
    backgroundRepeat: 'no-repeat',
    width: '348px',
    borderRadius: '8px',
    overflow: 'hidden',

    '@media screen and (max-width: 576px)': {
      width: '98%',
      padding: '20px 9px',
    },
  },

  rankIconWrapper: {
    position: 'absolute',
    top: '31%',
    right: '-45px',
    zIndex: '1',

    '@media screen and (max-width: 576px)': {
      width: '148px',
      right: '-35px',
    },
  },

  p2eWrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '4px 18px 4px 6px',
    backgroundColor: 'rgba(11, 85, 90, 0.1)',
    borderRadius: '20px',

    img: {
      width: '32px',
      height: '32px',
    },

    span: {
      lineHeight: '16px',
      fontWeight: '700',
      fontSize: '12px',
      color: 'rgba(82, 102, 109, 1)',
      whiteSpace: 'nowrap',
    }
  },

  shareCardPerformanceContainer: {
    marginTop: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '6px',
  },

  shareCardPerformanceWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',

    img: {
      width: '48px',
      height: '44px',
      flexShrink: '0',
    },

    span: {
      fontSize: '14px',
      fontWeight: '700',
      color: 'rgba(37, 62, 71, 1)',
      lineHeight: '19px',
      zIndex: '2',
    },
  },

  saveBtn: {
    width: '348px',

    '@media screen and (max-width: 576px)': {
      width: '98%',
    }
  },

  shareSection: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0',

    img: {
      opacity: '0.6',
      cursor: 'pointer',

      ':hover': {
        opacity: '1',
      },
    },
  },
}