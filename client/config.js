const protocol = 'http://';
const host = 'localhost';
const port = '3000';

const LOGIN_URL = `${protocol}${host}:${port}/login`;
const PRODUCTS_URL = `${protocol}${host}:${port}/products`;
const RECEIPTS_URL = `${protocol}${host}:${port}/receipts`;
const STORES_URL =  `${protocol}${host}:${port}/stores`;

function* incrementer() {
    let n = 100;

    while (true) {
        yield n++;
    }
};

const incr = (i =>
    () => i.next().value
)(incrementer());

export {
    LOGIN_URL,
    PRODUCTS_URL,
    RECEIPTS_URL,
    STORES_URL,
    incr
};
