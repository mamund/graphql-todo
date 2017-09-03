/* graphql basic types */
/* http://graphql.org/graphql-js/basic-types/ */

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`);

var root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1,2,3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
};

var app = express();
app.use('/graphql',graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Runninga GraphQL API server at localhost:4000/graphql');

