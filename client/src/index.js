import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from '@apollo/client';

import App from './components/App';

const link = new HttpLink({ uri: 'http://localhost:4000/graphql' });
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const root = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
