// TODO: flow
// @flow

import React from 'react';
import { Query } from 'react-apollo';
import { List } from 'immutable';

import { GET_STORES } from './queries';

export const Stores = (storeId: string, onChange: Function) => {
    return (
        <Query
            query={GET_STORES}
            displayName="StoresQuery"
            partialRefetch={true}
        >
            {({ loading, error, data }) => {
                if (loading) return 'Loading...';
                if (error) return `[Error] ${error.message}`;

                return (
                    <select
                        autoFocus
                        id='stores'
                        name='storeId'
                        value={storeId}
                        onChange={onChange}
                    >
                        <option>Select Store</option>
                        {
                            List(data.getStores).map((store) =>
                                <option key={store.id} value={store.id}>{store.name}</option>
                            )
                        }
                    </select>
                );
            }}
        </Query>
    );
};

