const mysql = require('/home/btoll/connect_db');

const routeFn = route =>
    (req, res) =>
        mysql.query(route, req)
        .then(({results}) => {
//             console.log(results);
            res.send(results);
        })
        .catch(err => {
            console.log(err);
            res.send('Error 500');
        });

module.exports = app => {
    app.get('/products', routeFn('products'));
    app.post('/products', routeFn('products'));

    app.get('/stores', routeFn('stores'));
    app.post('/stores', routeFn('stores'));
};

