const graphql = require('graphql');
const mysql = require('../db/receipts_db');

const {
    GraphQLID,
    GraphQLFloat,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLString
} = graphql;

const ItemType = new GraphQLInputObjectType({
    name: 'Item',
    fields: () => ({
        id: {type: GraphQLID},
        receiptId: {type: GraphQLID},
        productId: {type: GraphQLID},
        cost: {type: GraphQLFloat},
        quantity: {type: GraphQLFloat}
    })
});

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        brand: {type: GraphQLString}
    })
});

const ReceiptType = new GraphQLObjectType({
    name: 'Receipt',
    fields: () => ({
        id: {type: GraphQLID},
        storeId: {type: GraphQLID},
        totalCost: {type: GraphQLFloat},
        purchaseDate: {type: GraphQLString},
        /*
        items: {
            type: new GraphQLList(ItemType),
            resolve({id}, args) {
//                return Receipt.find({authorId: id});
            }
        }
        */
    })
});

const StoreType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        street1: {type: GraphQLString},
        street2: {type: GraphQLString},
        city: {type: GraphQLString},
        state: {type: GraphQLString},
        zip: {type: GraphQLString},
        phone: {type: GraphQLString},
//        receipts: {
//            type: new GraphQLList(ReceiptType),
//            resolve({id}, args) {
//                return Receipt.find({authorId: id});
//            }
//        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        products: {
            type: new GraphQLList(ProductType),
            resolve() {
                return mysql.query('products', { method: 'GET' })
                .then(({results}) => {
                    return results;
                })
                .catch(console.log);
            }
        },
        stores: {
            type: new GraphQLList(StoreType),
            resolve() {
                return mysql.query('stores', { method: 'GET' })
                .then(({results}) => {
                    return results;
                })
                .catch(console.log);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: ProductType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                brand: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, { name, brand }) {
                return mysql.query('products', {
                    method: 'POST',
                    body: {
                        name,
                        brand
                    }
                })
                .then(({results}) => {
                    return {
                        id: results.insertId
                    };
                })
                .catch(console.log);
            }
        },
        addReceipt: {
            type: ReceiptType,
            args: {
                storeId: {type: new GraphQLNonNull(GraphQLID)},
                totalCost: {type: new GraphQLNonNull(GraphQLFloat)},
                purchaseDate: {type: new GraphQLNonNull(GraphQLString)},
                items: {type: GraphQLList(ItemType)}
            },
            resolve(parent, { storeId, totalCost, purchaseDate, items }) {
                return mysql.query('receipts', {
                    method: 'POST',
                    body: {
                        storeId,
                        totalCost,
                        purchaseDate,
                        items
                    }
                })
                .then(res => {
                    // TODO: Fix the result as a returned array.
                    return {
                        id: res[0].results.insertId
                    };
                })
                .catch(console.log);
            }
        },
        addStore: {
            type: StoreType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                street1: {type: GraphQLString},
                street2: {type: GraphQLString},
                city: {type: GraphQLString},
                state: {type: GraphQLString},
                zip: {type: GraphQLString},
                phone: {type: GraphQLString}
            },
            resolve(parent, args) {
                return mysql.query('stores', {
                    method: 'POST',
                    body: {
                        name: args.name,
                        street1: args.street1,
                        street2: args.street2,
                        city: args.city,
                        state: args.state,
                        zip: args.zip,
                        phone: args.phone
                    }
                })
                .then(({results}) => {
                    return {
                        id: results.insertId
                    };
                })
                .catch(console.log);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

