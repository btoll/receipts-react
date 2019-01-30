// TODO: Throw an exception if env var is not set!
const mysql = require(process.env.RECEIPTS_DB || '');

const routeFn = route =>
    (req, res, next) =>
        mysql.query(route, req)
        .then(({results}) => {
            res.send(results);
        })
        .catch(next);

module.exports = app => {
    app.post('/login', routeFn('login'));

    app.get('/products', routeFn('products'));
    app.post('/products', routeFn('products'));

    app.post('/receipts', routeFn('receipts'));

    app.get('/stores', routeFn('stores'));
    app.post('/stores', routeFn('stores'));
};

