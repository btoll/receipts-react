// @flow
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';

import Products from './Products';
import Receipts from './Receipts';
import Stores from './Stores';
import Home from './Home';
import Nav from './Nav';
import Query from './Query';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors) {
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                    )
                );
            }

            if (networkError) {
                console.log(`[Network error]: ${networkError}`);
            }
        }),
        new HttpLink({
            uri: 'http://localhost:3000/graphql',
            credentials: 'same-origin'
        })
    ])
});

const App = () =>
    (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <div>
                    <Nav />

                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/receipts' component={Receipts} />
                        <Route path='/stores' component={Stores} />
                        <Route path='/products' component={Products} />
                        <Route path='/query' component={Query} />
                        <Route render={() => <p>404 Not Found</p>} />
                    </Switch>
                </div>
            </BrowserRouter>
        </ApolloProvider>
    );

export default App;

