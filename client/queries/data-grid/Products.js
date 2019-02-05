// TODO: flow
// @flow

import React from 'react';
import { Query } from 'react-apollo';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { List } from 'immutable';

import { GET_PRODUCTS } from '../queries';

const ProductsGrid = () => {
    return (
        <Query
            query={GET_PRODUCTS}
            displayName="ProductsGridQuery"
            partialRefetch={true}
        >
            {({ loading, error, data }) => {
                if (loading) return <div></div>;

                return (
                    <section id="data-grid">
                        <Griddle
                            data={data.getProducts}
                            plugins={[plugins.LocalPlugin]}
                            pageProperties={{
                                currentPage: 1,
                                pageSize: 10
                            }}
                        >
                            <RowDefinition>
                                <ColumnDefinition
                                    id="id"
                                    title="ID"
                                    customComponent={
                                        ({value}) =>
                                            <a href={`#`} onClick={() => {}}>{value}</a>
                                    }
                                />
                                <ColumnDefinition id="name" title="Name" width={250} />
                                <ColumnDefinition id="brand" title="Brand" width={250} />
                            </RowDefinition>
                        </Griddle>
                    </section>
                );
            }}
        </Query>
    );
};

export default ProductsGrid;

