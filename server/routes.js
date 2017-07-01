const mysql = require(process.env.RECEIPTS_DB);

const routeFn = route =>
    (req, res, next) =>
        mysql.query(route, req)
        .then(({results}) => {
            res.send(results);
        })
        .catch(next);

module.exports = app => {
    app.get('/products', routeFn('products'));
    app.post('/products', routeFn('products'));

    app.post('/receipts', routeFn('receipts'));

    app.get('/stores', routeFn('stores'));
    app.post('/stores', routeFn('stores'));
};

