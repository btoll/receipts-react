// TODO: flow
// @flow

import React from 'react';
import { Query } from 'react-apollo';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { List } from 'immutable';

import { GET_RECEIPTS } from '../queries';

const ReceiptsGrid = () => {
    return (
        <Query
            query={GET_RECEIPTS}
            displayName="ReceiptsGridQuery"
            partialRefetch={true}
        >
            {({ loading, error, data }) => {
                if (loading) return <div></div>;

                return (
                    <section id="data-grid">
                        <Griddle
                            data={data.getReceipts}
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
                                <ColumnDefinition id="storeId" title="Store ID" width={250} />
                                <ColumnDefinition id="totalCost" title="Total Cost" width={80} />
                                <ColumnDefinition id="purchaseDate" title="Purchase Date" width={80} />
                            </RowDefinition>
                        </Griddle>
                    </section>
                );
            }}
        </Query>
    );
};

export default ReceiptsGrid;

