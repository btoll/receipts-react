// @flow
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import AddProduct from './AddProduct';
import AddReceipt from './AddReceipt';
import AddStore from './AddStore';
import Home from './Home';
import Nav from './Nav';
import Query from './Query';

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql'
});

const App = () =>
    (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <div>
                    <Nav />

                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/add-receipt' component={AddReceipt} />
                        <Route path='/add-store' component={AddStore} />
                        <Route path='/add-product' component={AddProduct} />
                        <Route path='/query' component={Query} />
                        <Route render={() => <p>404 Not Found</p>} />
                    </Switch>
                </div>
            </BrowserRouter>
        </ApolloProvider>
    );

export default App;

