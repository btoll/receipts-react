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

const { ApolloServer, gql } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');

const { typeDefs } = require('./schema');
const resolvers = require('./resolvers');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.applyMiddleware({ app });

app.listen(3000, () => {
    console.log('Express listening on port 3000');
});

