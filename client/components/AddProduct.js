import React from 'react';
import Error from './Error';
import axios from 'axios';
import { PRODUCTS_URL } from '../config';

export default class AddProduct extends React.Component {
    constructor() {
        super();

        this.state = {
            product: '',
            brand: '',
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
                <form className='add-product' onSubmit={this.onSubmit}>
                    <fieldset>
                        <legend>Add Product</legend>

                        <div>
                            <label htmlFor='product'>Product:</label>

                            <input
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

    onCancel(e) {
        e.preventDefault();
        this.onReset();
    }

    onChange(e) {
        const target = e.target;

        this.setState({
            [target.name]: target.value
        });
    }

    onReset() {
        this.setState({
            product: '',
            brand: '',
            errors: [],
            disabled: false
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const errors = Object.keys(this.state)
            .filter(key => (!this.exclude.has(key)) && !this.state[key])
            .map(key => key);

        if (!errors.length) {
            this.setState({
                disabled: true
            });

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

