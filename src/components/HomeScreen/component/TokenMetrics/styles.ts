export default {
  // render Chain css

  tokenMetrics: {
    paddingBottom: ['48px', '160px', '160px', '160px'],
    width: '100%',

    '@media screen and (max-width: 960px)': {
      flexDirection: 'column',
      paddingLeft: '0px'
    }
  },

  chainContent_active: {
    maxWidth: '325px',
    cursor: 'pointer',
    paddingBottom: ['28px', '32px', '32px', '32px'],
    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
      padding: '16px',
      alignItems: 'center',
      borderTop: '1px solid #2da287',
      '& .chain-left-content': {
        flexDirection: 'column'
      },
      '& .chain-text': {
        paddingLeft: '0px',
        paddingTop: '12px'

      },
      '& .icon-right': {
        opacity: '0',
        transition: 'all 0.25s ease-out'
      }
    }
  },
  chainContent: {
    maxWidth: '325px',
    cursor: 'pointer',
    paddingBottom: ['28px', '32px', '32px', '32px'],
    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
      padding: '16px',
      alignItems: 'center',
      borderTop: '1px solid #ebf0f2',
      '& .chain-left-content': {
        flexDirection: 'column'
      },
      '& .chain-text': {
        paddingLeft: '0px',
        paddingTop: '12px'
      },
      '& .icon-right': {
        opacity: '0',
        transition: 'all 0.25s ease-out'
      }
    }
  },

  imgChain: {
    width: '40px',
    height: '40px',
    padding: '8px',
    borderRadius: '8px',

    '@media screen and (max-width: 576px)': {
      // paddingBottom: '12px'
    }
  },
  imgChain_gray: {
    width: '40px',
    height: '40px',
    padding: '8px',
    // backgroundColor: '#f7fbfc',
    borderRadius: '8px',
    transition: 'all 0.25s ease-out',
    // filter: 'grayscale(100%)',
    opacity: '.5',

    '@media screen and (max-width: 576px)': {
      // paddingBottom: '12px'
    }
  },
  width_big: {
    width: '500px'
  },

  chainName_active: {
    fontSize: [1, 3, 4, 5],
    color: '#253e47',
    fontWeight: 600,
    paddingLeft: '12px'

  },
  chainName: {
    fontSize: [1, 3, 4, 5],
    color: 'text_grey',
    fontWeight: 600,
    paddingLeft: '12px'
  },

  iconRight: {
    display: 'flex',
    alignItems: 'center',

    '@media screen and (max-width: 576px)': {
      display: 'none'
    }
  },

  // token metrics

  tokenMetrics_responsive: {
    display: 'grid',
    gridGap: '0px',
    gridTemplateColumns: '1fr 1fr',
    maxWidth: '1200px',
    '@media screen and (max-width: 960px)': {
      gridTemplateColumns: '1fr'

    }
  },
  tokenMetricsChain: {
    // width: '30%',
    padding: '16px 12px',
    paddingLeft: 0,
    fontSize: [3, 3, 4, 5],
    flex: '0.8',

    '@media screen and (max-width: 576px)': {
      padding: '0px',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between'
    }
  },

  tokenMetricsInfoChain: {
    // width: "30%",
    // marginLeft: '105px',
    borderTop: '1px solid #2da287',
    paddingTop: '28px',
    flex: '1',

    '@media screen and (max-width: 576px)': {
      marginLeft: 0,
      borderTop: 'unset'
    }
  },

  tokenMetricsInfoContainer: {
    marginBottom: '20px'
  },

  tokenMetricsSubHead: {
    fontSize: [2, 2, 3, 4],
    color: '#253e47',
    fontWeight: 'bold',
    fontFamily: 'system-ui'
    // marginBottom: '20px'
  },

  iconScan: {
    width: '24px',
    verticalAlign: 'middle'
  },

  tokenMetricsInfo: {
    fontSize: [1, 1, 2, 3],
    fontWeight: 600,
    color: '#253e47'

  },

  tokenMetricsInfoAddress: {
    cursor: 'pointer',
    '& .icon-scan': {
      opacity: '.5'
    },
    ':hover': {
      '& .icon-scan': {
        opacity: '1',
        transition: 'all 0.25s ease-out'
      }
    }
  },

  info: {
    fontWeight: 'normal'
  },
  info_link: {
    color: 'black',
    fontWeight: 'normal',
    wordBreak: 'break-all'
  },

  tokenMetricsChainList: {
    fontSize: [1, 1, 2, 3],
    fontWeight: 600,
    color: '#253e47',
    paddingBottom: [1, 3, 3, 3]
  },
  token_metric_responsive: {
    '@media screen and (max-width: 1180px)': {
      flexDirection: 'column',
      '& .left-bot-token': {
        width: '50%',
        '@media screen and (max-width: 576px)': {
          paddingRight: '12px'
        }
      },
      '& .right-bot-token': {
        width: '50%'
      }
    }
  }
}
