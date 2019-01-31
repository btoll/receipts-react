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

