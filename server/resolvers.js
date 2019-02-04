const mysql = require('./db/receipts_db');

const _get = (queryName, type = 'GET', args) =>
    mysql.query(queryName, { type, args })
    .then(({results}) => {
        return results;
    })
    .catch(console.log);

module.exports = {
    Mutation: {
        addProduct(_, { name, brand }) {
            return mysql.query('products', {
                type: 'POST',
                args: {
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
        },
        addReceipt(_, { storeId, totalCost, purchaseDate, items }) {
            return mysql.query('receipts', {
                type: 'POST',
                args: {
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
        },
        addStore(_, { name, street1, street2, city, state, zip, phone }) {
            return mysql.query('stores', {
                type: 'POST',
                args: {
                    name,
                    street1,
                    street2,
                    city,
                    state,
                    zip,
                    phone
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
    Query: {
        getItems: () => _get('items'),
        getProducts: () => _get('products'),
        getReceipt: id => _get('receipts', 'ONE', id),
        getReceipts: () => _get('receipts'),
        getStores: () => _get('stores')
    },
    Receipt: {
        items: ({ id }) =>
            mysql.query('items', {
                type: 'GET',
                args: {
                    receiptId: id
                }
            })
            .then(({results}) => {
                return results;
            })
            .catch(console.log)
    },
    ReceiptItem: {
        product: ({ productId }) =>
            mysql.query('products', {
                type: 'ONE',
                args: {
                    productId
                }
            })
            .then(({results}) => {
                return results;
            })
            .catch(console.log)
    }
};

