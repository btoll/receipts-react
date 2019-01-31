// Load up env vars.
try {
    require('fs')
    .readFileSync('./env', 'utf8')
    .split('\n').forEach(keyvalue => {
        // Ignore empty strings.
        if (keyvalue) {
            const [ key, value ] = keyvalue.split('=');
            process.env[key] = value;
        }
    });
} catch ({code, errno, path}) {
    code === 'ENOENT' ?
        console.log(`[ERROR]: ${path} does not exist, exiting.`) :
        console.log(`[ERROR]: errno ${errno}, ${code} ${path}`);

    return;
}

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const path = require('path');

const schema = require('./schema/schema');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log('Express listening on port 3000');
});

