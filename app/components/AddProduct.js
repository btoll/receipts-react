import React from 'react';
import axios from 'axios';

// TODO: Change key values!
// TODO: prop types!

export default class AddProduct extends React.Component {
    constructor(props) {
        super(props);

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

        // TODO: Move uri out of this file.
        axios.post('http://localhost:3000/products', this.state)
        .then(() => console.log('success'))
        .catch(() => console.log('error'));
    }
}

