// TODO: flow
// @flow

import React from 'react';
import { Query } from 'react-apollo';
import { List } from 'immutable';
import gql from 'graphql-tag';

const GET_STORES = gql`
    {
        stores {
            id
            name
            street1
            street2
            city
            state
            zip
            phone
        }
    }
`;

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
                            List(data.stores).map((store) =>
                                <option key={store.id} value={store.id}>{store.name}</option>
                            )
                        }
                    </select>
                );
            }}
        </Query>
    );
};

