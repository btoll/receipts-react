const mysql = require('mysql');
const env = process.env;

const connection = mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME
});

connection.connect(err => {
    if (err) {
        if (~err.sqlMessage.indexOf('Unknown database')) {
            console.error('[ERROR] No database, use `create_db.sql` to create:\n\tmysql -u USERNAME -p < ./server/db/create_db.sql');
        } else {
            console.error(`[ERROR] error connecting\n: ${err.stack}`);
        }
        return;
    }

    console.log(`connected as id ${connection.threadId}`);
});

const createPromise = sql =>
    new Promise((resolve, reject) =>
        connection.query(sql, (err, results, fields) => {
            if (err) {
                reject(err);
            } else {
                resolve({
                    results,
                    fields
                });
            }
        })
    );

module.exports.query = (route, { type, args }) => {
    let sql;

    switch (route) {
        case 'items':
            if (type === 'GET') {
                sql = `SELECT * FROM items WHERE receiptId = ${args.receiptId}`;
            }

            return createPromise(sql)
            .catch(err => {
                throw err;
            });

        case 'login':
            sql = connection.format(
                'SELECT username FROM users WHERE username = ?',
                [args.username]
            );

            return createPromise(sql)
            .catch(err => {
                throw err;
            });

        case 'products':
            if (type === 'POST') {
                sql = connection.format(
                    'INSERT INTO products VALUES(NULL, ?, ?)',
                    [args.name, args.brand]
                );
            } else if (type === 'GET') {
                sql = 'SELECT * FROM products';
            } else if (type === 'ONE') {
                sql = `SELECT * FROM products WHERE id = ${args.productId}`;
            }

            return createPromise(sql)
            .catch(err => {
                throw err;
            });

        case 'receipts':
            if (type === 'POST') {
                sql = connection.format(
                    'INSERT INTO receipts VALUES(NULL, ?, ?, ?)',
                    [
                        Number(args.storeId),
                        Number(args.totalCost),
                        args.purchaseDate
                    ]
                );

                return createPromise(sql)
                .then(data => {
                    return Promise.all((
                        args.items.map(item =>
                            createPromise(
                                connection.format(
                                    'INSERT INTO items VALUES(NULL, ?, ?, ?, ?)',
                                    [
                                        data.results.insertId,
                                        Number(item.productId),
                                        Number(item.cost),
                                        Number(item.quantity)
                                    ]
                                )
                            )
                        )
                    ));
                })
                .catch(err => {
                    throw err;
                });
            } else if (type === 'ONE') {
                sql = `SELECT * FROM receipts WHERE id = ${args.id}`;

                return createPromise(sql)
                .catch(err => {
                    throw err;
                });
            } else {
                sql = 'SELECT * FROM receipts';

                return createPromise(sql)
                .catch(err => {
                    throw err;
                });
            }

        case 'stores':
            if (type === 'POST') {
                sql = connection.format(
                    'INSERT INTO stores VALUES(NULL, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        args.name,
                        args.street1,
                        args.street2,
                        args.city,
                        args.state,
                        args.zip,
                        args.phone
                    ]
                );
            } else if (type === 'GET') {
                sql = 'SELECT * FROM stores';
            }

            return createPromise(sql)
            .catch(err => {
                throw err;
            });
    }
};

