// TODO: flow
// @flow

import React from 'react';
import { Query } from 'react-apollo';
import { List } from 'immutable';

import { GET_STORES } from './queries';

const StoresList = (storeId: string, onChange: Function) => {
    return (
        <Query
            query={GET_STORES}
            displayName="StoresListQuery"
            partialRefetch={true}
        >
            {({ loading, error, data }) => {
                if (loading) return <div></div>;

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

export default StoresList;

