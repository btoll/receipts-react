// @flow
import React from 'react';
import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { List } from 'immutable';

import Error from './Error';
import { GET_PRODUCTS } from '../queries/queries';
import ProductsGrid from '../queries/data-grid/Products';
import { PRODUCTS_URL } from '../config';

type State = {
    display: string,
    name: string,
    brand: string,
    errors: Array<string>
};

const ADD_PRODUCT = gql`
    mutation AddProduct($name: String!, $brand: String!) {
        addProduct(name: $name, brand: $brand) {
            id
        }
    }
`;

export default class Products extends React.Component<{}, State> {
    onCancel: Function;
    onChange: Function;
    onReset: Function;
    onSubmit: Function;
    onToggle: Function;

    constructor() {
        super();

        this.state = {
            display: 'hide',
            name: '',
            brand: '',
            errors: List([])
        };

        this.onCancel = this.onCancel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onToggle = this.onToggle.bind(this);
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

    async onSubmit(addProduct: Function, e: SyntheticMouseEvent<HTMLFormElement>) {
        e.preventDefault();

        const errors = Object.keys(this.state)
            .filter(key => !['errors'].includes(key) && !this.state[key]);

        if (!errors.length) {
            await addProduct({
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

    onToggle() {
        this.setState({
            display: this.state.display === 'show' ? 'hide' : 'show'
        });
    }

    render() {
        const cls = `add-product ${this.state.display}`;

        return (
            <>
                <Mutation
                    mutation={ADD_PRODUCT}
                    update={(cache, { data: { addProduct } }) => {
                        const { getProducts } = cache.readQuery({ query: GET_PRODUCTS });

                        cache.writeQuery({
                            query: GET_PRODUCTS,
                            data: { getProducts: getProducts.concat([addProduct]) },
                        });
                    }}
                    refetchQueries={[{query: GET_PRODUCTS}]}
                >
                    {(addProduct, { loading, error, data }) => {
                        return (
                            <>
                                <button className="add" onClick={this.onToggle}>Add Product</button>

                                <form className={cls}>
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
                                                onClick={this.onSubmit.bind(this, addProduct)}
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

                                { ProductsGrid() }
                                { loading && <p>Loading...</p> }
                                { error && <p>Error :( Please try again</p> }
                            </>
                        );
                    }}
                </Mutation>

                { !!this.state.errors.length && <Error fields={this.state.errors} /> }
            </>
        );
    }
}

