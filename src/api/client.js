import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();
const uri = 'https://api.graphqlplaceholder.com';

const client = new ApolloClient({
    uri,
    cache
});

export default client;
