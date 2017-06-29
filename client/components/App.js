import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import AddReceipt from './AddReceipt';
import AddStore from './AddStore';
import AddProduct from './AddProduct';
import Query from './Query';

const App = () =>
    (
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
    );

export default App;

