// @flow
import React from 'react';
import Error from './Error';
import axios from 'axios';
import { STORES_URL } from '../config';

type State = {
    store: string,
    street: string,
    city: string,
    state: string,
    zip: string,
    phone: string,
    errors: Array<string>
};

export default class AddStore extends React.Component<{}, State> {
    onCancel: Function;
    onChange: Function;
    onReset: Function;
    onSubmit: Function;

    constructor() {
        super();

        this.state = {
            store: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            phone: '',
            errors: []
        };

        this.onCancel = this.onCancel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
            <>
                <form className='add-store' onSubmit={this.onSubmit}>
                    <fieldset>
                        <legend>Add Store</legend>

                        <div>
                            <label htmlFor='store'>Name:</label>

                            <input
                                autoFocus
                                id='store'
                                name='store'
                                type='text'
                                value={this.state.store}
                                onChange={this.onChange} />
                        </div>

                        <div>
                            <label htmlFor='street'>Street:</label>

                            <input
                                id='street'
                                name='street'
                                type='text'
                                value={this.state.street}
                                onChange={this.onChange} />
                        </div>

                        <div>
                            <label htmlFor='city'>City:</label>

                            <input
                                id='city'
                                name='city'
                                type='text'
                                value={this.state.city}
                                onChange={this.onChange} />
                        </div>

                        <div>
                            <label htmlFor='state'>State:</label>

                            <input
                                id='state'
                                name='state'
                                type='text'
                                placeholder='MA'
                                value={this.state.state}
                                onChange={this.onChange} />
                        </div>

                        <div>
                            <label htmlFor='zip'>Zip:</label>

                            <input
                                id='zip'
                                name='zip'
                                type='text'
                                value={this.state.zip}
                                onChange={this.onChange} />
                        </div>

                        <div>
                            <label htmlFor='phone'>Phone:</label>

                            <input
                                id='phone'
                                name='phone'
                                type='text'
                                placeholder='717-737-8879'
                                value={this.state.phone}
                                onChange={this.onChange} />
                        </div>

                        <div>
                            <button
                                onClick={this.onSubmit}
                                className='submit'
                                disabled={this.state.store === '' ? 'disabled' : ''}
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
            </>
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
            store: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            phone: '',
            errors: []
        });
    }

    onSubmit(e: SyntheticMouseEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!(this.state.store)) {
            this.setState({
                errors: ['store']
            });
        } else {
            // TODO: Clear state when submitted.
            axios.post(STORES_URL, this.state)
            .then(this.onReset)
            .catch(() => console.log('error'));
        }
    }
}

