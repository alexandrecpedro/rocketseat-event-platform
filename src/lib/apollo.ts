import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    // Environmental variables in JS = imported as "process.env"
    uri: import.meta.env.VITE_API_URL,
    // Send token request by sending a header
    headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`
    },
    cache: new InMemoryCache()
})