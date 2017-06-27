const protocol = 'http://';
const host = 'localhost';
const port = '3000';

const PRODUCTS_URL = `${protocol}${host}:${port}/products`;
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
    PRODUCTS_URL,
    STORES_URL,
    incr
};
