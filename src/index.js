import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { user } from './service/localStorage'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from "@apollo/client/link/ws";
import { TriggerContextProvider } from './context/triggerContext';

const httpLink = createHttpLink({
  uri: 'https://dear-monitor-91.hasura.app/v1/graphql',
});

const token = localStorage.getItem('token');
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  uri: 'https://dear-monitor-91.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  link: user ? new WebSocketLink({
    uri: 'wss://dear-monitor-91.hasura.app/v1/graphql',
    options: {
      reconnect: true,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    }
  }) : null,
});


// const client = new ApolloClient({
//   uri: 'https://dear-monitor-91.hasura.app/v1/graphql',
//   cache: new InMemoryCache(),
//   link: user ? authLink.concat(httpLink) : null,
// });


ReactDOM.render(
  <ApolloProvider client={client}>
    <TriggerContextProvider>
      <App />
    </TriggerContextProvider>
  </ApolloProvider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
