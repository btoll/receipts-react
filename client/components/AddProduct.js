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
            errors: []
        };

        this.onChange = this.onChange.bind(this);
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
                            <label></label>
                            <button
                                onClick={this.onSubmit}
                                className='submit'
                                type='submit'>
                                Submit
                            </button>
                        </div>
                    </fieldset>
                </form>

                { !!this.state.errors.length && <Error fields={this.state.errors} /> }
            </div>
        );
    }

    onChange(e) {
        const target = e.target;

        this.setState({
            [target.name]: target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const errors = Object.keys(this.state)
            .filter(key => key !== 'errors' && !this.state[key])
            .map(key => key);

        if (!errors.length) {
            axios.post(PRODUCTS_URL, this.state)
            .then(() =>
                this.setState({
                    product: '',
                    brand: '',
                    errors: []
                })
            )
            .catch(() => console.log('error'));
        } else {
            this.setState({
                errors: errors
            });
        }
    }
}

