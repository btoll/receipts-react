import { gql } from 'apollo-boost';

const addProductMutation = gql`
    mutation($name: String!, $brand: String!) {
        addProduct(name: $name, brand: $brand) {
            id
        }
    }
`;

const addReceiptMutation = gql`
    mutation($storeId: ID!, $totalCost: Float!, $purchaseDate: String!, $items: [Item]) {
        addReceipt(storeId: $storeId, totalCost: $totalCost, purchaseDate: $purchaseDate, items: $items) {
            id
        }
    }
`;

const addStoreMutation = gql`
    mutation($name: String!, $street1: String, $street2: String, $city: String, $state: String, $zip: String, $phone: String) {
        addStore(name: $name, street1: $street1, street2: $street2, city: $city, state: $state, zip: $zip, phone: $phone) {
            id
        }
    }
`;

const getProductsQuery = gql`
    {
        products {
            id
            name
            brand
        }
    }
`;

const getStoresQuery = gql`
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

export {
    addProductMutation,
    addReceiptMutation,
    addStoreMutation,
    getProductsQuery,
    getStoresQuery
};

