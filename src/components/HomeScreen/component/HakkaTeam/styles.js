export default {
  // hakka team
  hakkaTeam: {
    // marginBottom: '160px'
  },

  hakkaTeamHead: {
    fontSize: [5, 6, 7, 7],
    color: '#253e47',
    fontWeight: 'normal',
    paddingBottom: ['48px', '60px', '60px', '60px'],
    '@media screen and (max-width: 576px)': {
      textAlign: 'center'
    }
    // marginBottom: '60px'
  },

  hakkaTeamUser: {
    '@media screen and (max-width: 576px)': {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  team_img_responsive: {
    '@media screen and (max-width: 576px)': {
      justifyContent: 'center'
    }
  },
  hakkaTeamImgUser: {
    width: '100px',
    height: '100px',
    borderRadius: '8px',
    // marginRight: '48px',

    '@media screen and (max-width: 576px)': {
      // marginRight: 0
    }
  },

  hakkaTeamInfo: {
    // width: '70%',
    // marginBottom: '48px',
    paddingLeft: '48px',
    '@media screen and (max-width: 576px)': {
      paddingLeft: '0px'
    }

  },

  hakkaTeamName: {
    // marginBottom: '8px',
    fontSize: [4, 5, 6, 6],
    fontWeight: 600,
    lineHeight: '28px',
    color: 'black',
    '@media screen and (max-width: 576px)': {
      paddingTop: '18px',
      textAlign: 'center'
    }
  },

  hakkaTeamJob: {
    fontSize: [2, 2, 3, 4],
    textTransform: 'uppercase',
    color: 'dark_green',
    lineHeight: '24px',
    fontWeight: '600',
    '@media screen and (max-width: 576px)': {
      textAlign: 'center'
    }
  },

  hakkaTeamComment: {
    // margin: '12px 0 0',
    fontSize: [2, 2, 3, 4],
    color: '#253e47',
    maxWidth: '1050px',
    '@media screen and (max-width: 576px)': {
      padding: '0 32px'
    }
  },

  hakkaTeamListMember: {
    // marginBottom: '48px'
    display: 'grid',
    gridGap: '40px',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    maxWidth: '1200px',
    '@media screen and (max-width: 960px)': {
      gridTemplateColumns: '1fr 1fr'
    },
    '@media screen and (max-width: 576px)': {
      gridGap: '24px',
      gridTemplateColumns: '1fr 1fr'
    }
  },

  hakkaTeamImgUserList: {
    width: '100px',
    height: '100px',
    borderRadius: '8px'
    // marginRight: '48px',
    // marginBottom: '23px'
  },

  dividerLine: {
    // maxWidth: '900px',
    border: '.5px solid #dae1e3'
    // marginBottom: '11px'
  },
  hakkaTeamFootContent: {
    maxWidth: '1200px',
    paddingTop: '12px',
    borderTop: '1px solid #dae1e3'
  },
  hakkaTeamFootText: {
    fontSize: [1, 1, 2, 3],
    fontWeight: '600',
    color: 'rgba(37, 62, 71, 0.5)'
  },

  hakkaTeamFootTextLink: {
    fontWeight: '600',
    // textShadow: '0.5px 0px 0px #253e47',
    fontSize: [1, 1, 2, 3],
    color: '#2da287',
    cursor: 'pointer'

  },

  hakkaTeamInfoUser: {
    // '@media screen and (max-width: 576px)': {
    //   // marginRight: '80px'
    // },

    // ':nth-child(2)': {
    //   '@media screen and (max-width: 576px)': {
    //     // marginRight: 0
    //   }
    // },

    ':last-child': {
      '@media screen and (max-width: 768px)': {
        paddingTop: '36px'
      }
    }
  }
}
