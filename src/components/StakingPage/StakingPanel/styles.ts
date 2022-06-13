const stakingCard = {
  width: '460px',
  ml: 'auto',
  padding: '20px',
  marginTop: '36px',
  fontSize: [1],
  fontWeight: 'bold',
  border: '1px solid #DAE1E3',
  borderRadius: '8px',
  color: 'rgba(37, 62, 71, 0.5)',

  minHeight: '347px',

  '@media screen and (max-width: 1190px)': {
    marginTop: '0',
  },

  '@media screen and (max-width: 576px)': {
    width: '100%',
    ml: 'unset',
    boxSizing: 'border-box',
  },
};
const hakkaBalanceWrapper = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '12px',
}

const stakeBtn = {
  paddingTop: '36px'
}

const title = {
  color: '#253e47',
  fontSize: '14px',
}

export default {
  stakingCard,
  hakkaBalanceWrapper,
  stakeBtn,
  title,
}