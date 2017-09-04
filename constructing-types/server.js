/* constructing types */
/* http://graphql.org/graphql-js/constructing-types/ */

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema (`
  type User {
    id: String
    name: String
  }

  type Query {
    user(id: String): User
  }
`);

// local User objects
var fakeDatabase = {
  'a' : {
    id: 'a',
    name: 'alice',
  },
  'b' : {
    id: 'b',
    name: 'bob',
  },
}

// root resolver
var root = {
  user: function({id}) {
    return fakeDatabase[id];
  }
};

// express app
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API Server at localhost:4000/graphql');


