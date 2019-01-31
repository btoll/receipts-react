// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import { List } from 'immutable';

import Error from './Error';
import { STORES_URL } from '../config';
import { addStoreMutation } from '../queries/queries';

type State = {
    name: string,
    street1: string,
    street2: string,
    city: string,
    state: string,
    zip: string,
    phone: string,
    errors: Array<string>
};

class AddStore extends React.Component<{}, State> {
    onCancel: Function;
    onChange: Function;
    onReset: Function;
    onSubmit: Function;

    constructor() {
        super();

        this.state = {
            name: '',
            street1: '',
            street2: '',
            city: '',
            state: '',
            zip: '',
            phone: '',
            errors: List([])
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
                            <label htmlFor='name'>Name:</label>

                            <input
                                autoFocus
                                id='name'
                                name='name'
                                type='text'
                                value={this.state.name}
                                onChange={this.onChange} />
                        </div>

                        <div>
                            <label htmlFor='street1'>Street1:</label>

                            <input
                                id='street1'
                                name='street1'
                                type='text'
                                value={this.state.street1}
                                onChange={this.onChange} />
                        </div>

                        <div>
                            <label htmlFor='street2'>Street2:</label>

                            <input
                                id='street2'
                                name='street2'
                                type='text'
                                value={this.state.street2}
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
                                disabled={this.state.name === '' ? 'disabled' : ''}
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
            name: '',
            street1: '',
            street2: '',
            city: '',
            state: '',
            zip: '',
            phone: '',
            errors: List([])
        });
    }

    async onSubmit(e: SyntheticMouseEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!(this.state.name)) {
            this.setState({
                errors: List(['name'])
            });
        } else {
            await this.props.addStoreMutation({
                variables: {
                    name: this.state.name,
                    street1: this.state.street1,
                    street2: this.state.street2,
                    city: this.state.city,
                    state: this.state.state,
                    zip: this.state.zip,
                    phone: this.state.phone
                }
            });

            this.onReset();
        }
    }
}

export default graphql(addStoreMutation, { name: 'addStoreMutation' })(AddStore);

