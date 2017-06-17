import React from 'react';
import Menu from './components/Menu';
import StoresTable from './components/Stores';
import './App.css';

class Content extends React.Component {
    render() {
        let html = <div></div>;

        switch (this.props.page) {
            case 'new-receipt':
                html = <StoresTable stores={this.props.content} />
                break;
        }

        return (
            <div className="content">
                {html}
            </div>
        );
    }
}

const menuItems = [
    'New Receipt',
    'New Store',
    'New Product',
    'Query',
    'Exit'
];

const stores = [
    { name: "Lowe's", street: 'Lancaster Road', city: 'Leominster', state: 'MA' },
    { name: 'Tractor Supply Co.', street: 'Lancaster Road', city: 'Leominster', state: 'MA' },
    { name: 'Pickity Place', street: '248 Nutting Hill Road', city: 'Mason', state: 'NH' },
    { name: 'Gardner Agway', street: '3 West Broadway', city: 'Gardner', state: 'MA' }
];

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            page: '',
            content: null
        };

        this.onItemClick = this.onItemClick.bind(this);
    }

    render() {
        return (
            <div onClick={this.onClick}>
                <Menu onItemClick={this.onItemClick} items={menuItems} />
                <Content page={this.state.page} content={this.state.content} />
            </div>
        );
    }

    onItemClick(e) {
        const target = e.target;

        if (target.tagName.toLowerCase() === 'li') {
            switch (e.target.textContent) {
                case 'New Receipt':
                    this.setState({
                        page: 'new-receipt',
                        content: stores
                    });
                    break;

                default:
                    this.setState({
                        page: '',
                        content: null
                    });
            }
        }
    }
}

export default App;

