const { gql } = require('apollo-server-express');

const typeDefs = gql`
    input Item {
        id: ID
        productId: ID!
        cost: Float
        quantity: Float
    }

    type Product {
        id: ID
        name: String!
        brand: String!
    }

    type Receipt {
        id: ID!
        storeId: ID!
        totalCost: Float
        purchaseDate: String
        items: [ReceiptItem]
    }

    type ReceiptItem {
        id: ID
        receiptId: ID!
        cost: Float
        quantity: Float
        product: [Product]
    }

    type Store {
        id :ID!
        name: String!
        street1: String
        street2: String
        city: String
        state: String
        zip: String
        phone: String
    }

    type Query {
        getItems: [ReceiptItem]
        getProducts: [Product]
        getReceipt(id: ID!): [Receipt]
        getReceipts: [Receipt]
        getStores: [Store]
    }

    interface MutationResponse {
        code: String!
        success: Boolean!
        message: String!
    }

    type Mutation {
        addProduct(name: String!, brand: String!): Product
        addReceipt(storeId: ID!, totalCost: Float, purchaseDate: String!, items: [Item]): Receipt
        addStore(name: String!, street1: String, street2: String, city: String, state: String, zip: String, phone: String): Store
    }
`;

module.exports = { typeDefs };

