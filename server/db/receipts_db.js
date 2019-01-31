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

module.exports.query = (route, { method, body }) => {
    let sql;

    switch (route) {
        case 'login':
            sql = connection.format(
                'SELECT username FROM users WHERE username = ?',
                [body.username]
            );

            return createPromise(sql)
            .catch(err => {
                throw err;
            });

        case 'products':
            if (method === 'POST') {
                sql = connection.format(
                    'INSERT INTO products VALUES(NULL, ?, ?)',
                    [body.name, body.brand]
                );
            } else if (method === 'GET') {
                sql = 'SELECT * FROM products';
            }

            return createPromise(sql)
            .catch(err => {
                throw err;
            });

        case 'receipts':
            sql = connection.format(
                'INSERT INTO receipts VALUES(NULL, ?, ?, ?)',
                [
                    Number(body.storeId),
                    Number(body.totalCost),
                    body.purchaseDate
                ]
            );

            return createPromise(sql)
            .then(data => {
                return Promise.all((
                    body.items.map(item =>
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

        case 'stores':
            if (method === 'POST') {
                sql = connection.format(
                    'INSERT INTO stores VALUES(NULL, ?, ?, ?, ?, ?, ?, ?)',
                    [
                        body.name,
                        body.street1,
                        body.street1,
                        body.city,
                        body.state,
                        body.zip,
                        body.phone
                    ]
                );
            } else if (method === 'GET') {
                sql = 'SELECT * FROM stores';
            }

            return createPromise(sql)
            .catch(err => {
                throw err;
            });
    }
};

