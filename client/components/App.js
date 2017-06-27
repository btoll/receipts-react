import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import AddReceipt from './AddReceipt';
import AddStore from './AddStore';
import AddProduct from './AddProduct';
import Query from './Query';

class Content extends React.Component {
    render() {
        let html = <div></div>;

        switch (this.props.page) {
            case 'add-receipt':
                html = <AddReceipt content={this.props.content} />
                break;
        }

        return (
            <div className="content">
                {html}
            </div>
        );
    }
}

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            page: '',
            content: null
        };
    }

    render() {
        return (
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
    }
}

export default App;

