// TODO: flow
// @flow

import React from 'react';
import { Query } from 'react-apollo';
import Griddle, { plugins, RowDefinition, ColumnDefinition } from 'griddle-react';
import { List } from 'immutable';

import { GET_STORES } from '../queries';

const StoresGrid = () => {
    return (
        <Query
            query={GET_STORES}
            displayName="StoresGridQuery"
            partialRefetch={true}
        >
            {({ loading, error, data }) => {
                if (loading) return <div></div>;

                return (
                    <section id="data-grid">
                        <Griddle
                            data={data.getStores}
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
                                <ColumnDefinition id="street1" title="Street1" width={200} />
                                <ColumnDefinition id="street2" title="Street2" width={200} />
                                <ColumnDefinition id="city" title="City" width={100} />
                                <ColumnDefinition id="state" title="State" width={50} />
                                <ColumnDefinition id="zip" title="Zip" width={80} />
                                <ColumnDefinition id="phone" title="Phone" width={100} />
                            </RowDefinition>
                        </Griddle>
                    </section>
                );
            }}
        </Query>
    );
};

export default StoresGrid;

