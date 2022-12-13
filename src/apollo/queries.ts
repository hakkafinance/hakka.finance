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

export const PROJECT_GALAXY_CAMPAIGNS_INFO = gql`
  query CheckSpaceCampaigns($account: String!) {
    space(alias: "hakkafinance") {
      campaigns(input: {ids: [""], types: [Drop]}) {
         list{
          id
          whitelistInfo(address: $account) {
            maxCount
            usedCount
          }
        } 
      }
    }
  }
`
