/* constructing types */
/* http://graphql.org/graphql-js/constructing-types/ */

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// graphql schema
var schema = buildSchema (`
  # User object
  type User {
    # unique ID of the record
    id: String
    # name of the user
    name: String
  }

  # Root Query type for User objects
  type Query {
    user(id: String): User
    users: [User]
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
  },
  users : () => {
    var output = [], item, i, x
    for (var db in fakeDatabase) {
      item= {},
      item.id = fakeDatabase[db].id;
      item.name = fakeDatabase[db].name;
      output.push(item);
    }
    return output;
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


