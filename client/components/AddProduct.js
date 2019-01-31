// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import { List } from 'immutable';

import Error from './Error';
import { PRODUCTS_URL } from '../config';
import { addProductMutation } from '../queries/queries';

type State = {
    name: string,
    brand: string,
    errors: Array<string>
};

class AddProduct extends React.Component<{}, State> {
    onCancel: Function;
    onChange: Function;
    onReset: Function;
    onSubmit: Function;

    constructor() {
        super();

        this.state = {
            name: '',
            brand: '',
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
                <form className='add-product' onSubmit={this.onSubmit}>
                    <fieldset>
                        <legend>Add Product</legend>

                        <div>
                            <label htmlFor='name'>Product:</label>

                            <input
                                autoFocus
                                id='name'
                                name='name'
                                type='text'
                                value={this.state.name}
                                onChange={this.onChange} />
                        </div>

                        <div>
                            <label htmlFor='brand'>Brand:</label>

                            <input
                                id='brand'
                                name='brand'
                                type='text'
                                value={this.state.brand}
                                onChange={this.onChange} />
                        </div>

                        <div>
                            <button
                                onClick={this.onSubmit}
                                className='submit'
                                disabled={this.state.brand === '' || this.state.name === '' ? 'disabled' : ''}
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
            brand: '',
            errors: List([])
        });
    }

    async onSubmit(e: SyntheticMouseEvent<HTMLFormElement>) {
        e.preventDefault();

        const errors = Object.keys(this.state)
            .filter(key => !['errors'].includes(key) && !this.state[key]);

        if (!errors.length) {
            await this.props.addProductMutation({
                variables: {
                    name: this.state.name,
                    brand: this.state.brand
                }
            });

            this.onReset();
        } else {
            this.setState({
                errors: List(errors)
            });
        }
    }
}

export default graphql(addProductMutation, { name: 'addProductMutation' })(AddProduct);

