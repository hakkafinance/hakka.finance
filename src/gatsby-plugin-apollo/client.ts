import { ApolloClient, InMemoryCache } from '@apollo/client'

const projectGalaxyClient = new ApolloClient({
  uri: process.env.PROJECT_GALAXY_ENDPOINT,
  cache: new InMemoryCache(),
})

export default projectGalaxyClient;