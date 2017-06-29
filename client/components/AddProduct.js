import React from 'react';
import axios from 'axios';
import { PRODUCTS_URL } from '../config';

export default class AddProduct extends React.Component {
    constructor() {
        super();

        this.state = {
            product: '',
            brand: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    render() {
        return (
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

        axios.post(PRODUCTS_URL, this.state)
        .then(() => console.log('success'))
        .catch(() => console.log('error'));
    }
}

