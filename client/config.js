const protocol = 'http://';
const host = 'localhost';
const port = '3000';

const SOCKET = `${protocol}${host}:${port}`;
const LOGIN_URL = `${socket}/login`;
const PRODUCTS_URL = `${socket}/products`;
const RECEIPTS_URL = `${socket}/receipts`;
const STORES_URL =  `${socket}/stores`;

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
