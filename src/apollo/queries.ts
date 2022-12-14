import gql from 'graphql-tag'

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
