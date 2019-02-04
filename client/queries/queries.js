import gql from 'graphql-tag';

const GET_PRODUCTS = gql`
    {
        getProducts {
            id
            name
            brand
        }
    }
`;

const getReceiptsQuery = gql`
    {
        getReceipts {
            id
            store_id
            total_cost
            purchase_date
        }
    }
`;

const GET_STORES = gql`
    {
        getStores {
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

export {
    GET_PRODUCTS,
    GET_STORES
};

