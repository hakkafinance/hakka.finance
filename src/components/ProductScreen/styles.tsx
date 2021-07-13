export default {
  productScreenContainer: {
    paddingLeft: '12.8%',
    paddingRight: '14.4%',

    '@media screen and (max-width: 576px)': {
      paddingLeft: '16px',
      paddingRight: '16px'
    }
  },
  heading: {
    fontSize: [5, 6, 7, 7],
    fontWeight: '600',
    color: 'black'
  },
  sub_heading: {
    fontSize: [4, 5, 6, 6],
    fontWeight: '600',
    color: 'black'
  },
  normal_text: {
    color: 'black',
    fontSize: [1, 2, 3, 4]

  },
  responsive_cards: {
    display: 'grid',
    gridGap: '28px',
    gridTemplateColumns: '1fr 1fr 1fr',
    '@media screen and (max-width: 1180px)': {
      gridTemplateColumns: '1fr 1fr'
    }
  },
  responsive_coming_cards: {
    display: 'grid',
    gridGap: '28px',
    gridTemplateColumns: '1fr 1fr 1fr',
    '@media screen and (max-width: 1180px)': {
      gridTemplateColumns: '1fr 1fr'
    }
  },
  coming_InfoProduct:{
    paddingBottom: ['100px', '160px', '160px', '160px'],
  },
}
