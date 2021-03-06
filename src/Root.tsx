import { FC } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

interface RootProps {
  children: JSX.Element;
}

const apolloClient = new ApolloClient({
  uri: 'http://localhost:8080',
  cache: new InMemoryCache(),
});

const Root: FC<RootProps> = ({ children }) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default Root;
