// @flow
import React from 'react';
import Login from './Login';

type State = {
    username: string
};

export default class Home extends React.Component<{}, State> {
    onLogIn: Function;

    constructor() {
        super();

        this.state = {
            username: ''
        };

        this.onLogIn = this.onLogIn.bind(this);
    }

    render() {
        return !this.state.username ?
            <Login onLogIn={this.onLogIn} /> :
            <div>Welcome {this.state.username}!</div>;
    }

    onLogIn(user: { username: string }) {
        this.setState({
            username: user.username
        });
    }
}

