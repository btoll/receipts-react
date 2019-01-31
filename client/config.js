//const protocol = 'http://';
//const host = 'localhost';
//const port = '3000';
//
//const SOCKET = `${protocol}${host}:${port}`;

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
    incr
};
