import { ApolloClient, InMemoryCache } from '@apollo/client'

const projectGalaxyClient = new ApolloClient({
  uri: 'https://graphigo.stg.galaxy.eco/query',
  cache: new InMemoryCache(),
})

export default projectGalaxyClient;