// @flow
import React from 'react';
import Error from './Error';
import axios from 'axios';
import { LOGIN_URL } from '../config';

type Props = {
    onLogIn: Function;
};

type State = {
    username: string,
    password: string,
    disabled: boolean,
    errors: Array<string>
};

export default class Login extends React.Component<Props, State> {
    exclude: Set<string>;
    onCancel: Function;
    onChange: Function;
    onReset: Function;
    onSubmit: Function;

    constructor(props: Props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            disabled: false,
            errors: []
        };

        this.exclude = new Set(['disabled', 'errors']);

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
                                disabled={this.state.disabled ? 'disabled' : ''}
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
            errors: [],
            disabled: false
        });
    }

    onSubmit(e: SyntheticMouseEvent<HTMLFormElement>) {
        e.preventDefault();

        const errors = Object.keys(this.state)
            .filter(key => (!this.exclude.has(key)) && !this.state[key])
            .map(key => key);

        if (!errors.length) {
            this.setState({
                disabled: true
            });

            axios.post(LOGIN_URL, this.state)
            .then(data => (
                this.onReset(),
                this.props.onLogIn(data.data[0])
            ))
            .catch(() => console.log('error'));
        } else {
            this.setState({
                errors: errors
            });
        }
    }
}

