import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'isomorphic-fetch';

const projectGalaxyClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GATSBY_PROJECT_GALAXY_ENDPOINT,
    fetch
  }),
  cache: new InMemoryCache(),
})

export default projectGalaxyClient;