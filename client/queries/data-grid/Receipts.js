// TODO: flow
// @flow

import React from 'react';
import { Query } from 'react-apollo';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { List } from 'immutable';

import { GET_RECEIPTS } from '../queries';

const getDateString = d => {
    debugger;
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
}

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
                                <ColumnDefinition
                                    id="purchaseDate"
                                    title="Purchase Date"
                                    width={120}
                                    customComponent={
                                        ({value}) =>
                                            <span>{getDateString(new Date(value * 1))}</span>
                                    }
                                />
                            </RowDefinition>
                        </Griddle>
                    </section>
                );
            }}
        </Query>
    );
};

export default ReceiptsGrid;

