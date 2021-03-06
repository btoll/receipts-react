// @flow
import React from 'react';
import { List } from 'immutable';

import Error from './Error';
import { LOGIN_URL } from '../config';

type Props = {
    onLogIn: Function;
};

type State = {
    username: string,
    password: string,
    errors: Array<string>
};

export default class Login extends React.Component<Props, State> {
    onCancel: Function;
    onChange: Function;
    onReset: Function;
    onSubmit: Function;

    constructor(props: Props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errors: List([])
        };

        this.onCancel = this.onCancel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <div>
                <form className='login' onSubmit={this.onSubmit}>
                    <fieldset>
                        <legend>Login</legend>

                        <div>
                            <label htmlFor='product'>Username:</label>

                            <input
                                autoFocus
                                id='username'
                                name='username'
                                type='text'
                                value={this.state.username}
                                onChange={this.onChange} />
                        </div>

                        <div>
                            <label htmlFor='brand'>Password:</label>

                            <input
                                id='password'
                                name='password'
                                type='password'
                                value={this.state.password}
                                onChange={this.onChange} />
                        </div>

                        <div>
                            <button
                                onClick={this.onSubmit}
                                className='submit'
                                disabled={this.state.username === '' || this.state.password === '' ? 'disabled' : ''}
                                type='submit'>
                                Submit
                            </button>

                            <button onClick={this.onCancel}>
                                Cancel
                            </button>
                        </div>
                    </fieldset>
                </form>

                { !!this.state.errors.length && <Error fields={this.state.errors} /> }
            </div>
        );
    }

    onCancel(e: SyntheticMouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.onReset();
    }

    onChange(e: SyntheticInputEvent<HTMLInputElement>) {
        const target = e.target;

        this.setState({
            [target.name]: target.value
        });
    }

    onReset() {
        this.setState({
            username: '',
            password: '',
            errors: List([])
        });
    }

    onSubmit(e: SyntheticMouseEvent<HTMLFormElement>) {
        e.preventDefault();

        // TODO: Immutable
        const errors = Object.keys(this.state)
            .filter(key => !['errors'].includes(key) && !this.state[key]);

        if (!errors.length) {
//            axios.post(LOGIN_URL, this.state)
//            .then(data => (
//                this.onReset(),
//                this.props.onLogIn(data.data[0])
//            ))
//            .catch(() => console.log('error'));
        } else {
            this.setState({
                errors: List(errors)
            });
        }
    }
}

