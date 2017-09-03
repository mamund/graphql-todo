var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// construct a schema
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// root resolver
var root = {
  hello: () => {
    return 'Hello, world!';
  }
};

// setup express
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a Graphql API server at localhost:4000/graphql');

