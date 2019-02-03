// TODO: flow
// @flow

import React from 'react';
import { Query } from 'react-apollo';
import { List } from 'immutable';

import { GET_PRODUCTS } from './queries';

export const Products = (productId: string, onChange: Function) => {
    return (
        <Query
            query={GET_PRODUCTS}
            displayName="ProductsQuery"
            partialRefetch={true}
        >
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `[Error] ${error.message}`;

                return (
                    <select
                        name='productId'
                        value={productId}
                        onChange={onChange}
                    >
                        <option>Select Product</option>
                        {
                            List(data.products).map(item =>
                                // These IDs care coming from the db so they are safe to use.
                                <option
                                    key={item.id}
                                    value={item.id}
                                >{item.product} {item.brand}</option>
                            )
                        }
                    </select>
                );
            }}
        </Query>
    );
};

