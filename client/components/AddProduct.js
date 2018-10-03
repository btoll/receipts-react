// @flow
import React from 'react';
import Error from './Error';
import axios from 'axios';
import { PRODUCTS_URL } from '../config';

type State = {
    product: string,
    brand: string,
    errors: Array<string>
};

export default class AddProduct extends React.Component<{}, State> {
    onCancel: Function;
    onChange: Function;
    onReset: Function;
    onSubmit: Function;

    constructor() {
        super();

        this.state = {
            product: '',
            brand: '',
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
                <form className='add-product' onSubmit={this.onSubmit}>
                    <fieldset>
                        <legend>Add Product</legend>

                        <div>
                            <label htmlFor='product'>Product:</label>

                            <input
                                autoFocus
                                id='product'
                                name='product'
                                type='text'
                                value={this.state.product}
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
                                disabled={this.state.brand === '' || this.state.product === '' ? 'disabled' : ''}
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
            product: '',
            brand: '',
            errors: []
        });
    }

    onSubmit(e: SyntheticMouseEvent<HTMLFormElement>) {
        e.preventDefault();

        const errors = Object.keys(this.state)
            .filter(key => !['errors'].includes(key) && !this.state[key]);

        if (!errors.length) {
            axios.post(PRODUCTS_URL, this.state)
            .then(this.onReset)
            .catch(() => console.log('error'));
        } else {
            this.setState({
                errors: errors
            });
        }
    }
}

