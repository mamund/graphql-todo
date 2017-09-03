/* graphql basic types */
/* http://graphql.org/graphql-js/passing-arguments/ */

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

var root = {
  rollDice: function (args) {
    var output = [];
    for(var i = 0; i<args.numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (args.numSides || 6 )));
    }
    return output;
  },
};

var app = express();
app.use('/graphql',graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

