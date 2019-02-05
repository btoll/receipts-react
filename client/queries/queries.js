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

const GET_RECEIPTS = gql`
    {
        getReceipts {
            id
            storeId
            totalCost
            purchaseDate
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
    GET_RECEIPTS,
    GET_STORES
};

