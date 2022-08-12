import gql from 'graphql-tag'

export const PROJECT_GALAXY_CAMPAIGN_INFO = gql`
  query CheckWhiteList($account: String!, $campaignId: ID!) {
    campaign(id: $campaignId) {
      whitelistInfo(address: $account) {
        address
        maxCount
        usedCount
      }
      endTime
    }
  }
`
