/* graphql-todo API Server */
/* Documenting Web APIs (mitra/amundsen) */

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// graphql schema
var schema = buildSchema (`

  # Todo object
  type ToDo {
    # Unique ID of the record
    id: String
    # Title of the record
    title: String
    # Completed flag (true/false)
    completed:Boolean
  }

  # Root Query type for ToDo objects
  type Query {

    # Return a single ToDo record by ID
    todo(id: String): ToDo

    # Return all ToDo records on file
    todoList: [ToDo]

    # Return all ToDo records where the status matches true or false
    todoStatus(completed:Boolean): [ToDo]

    #Return all ToDo records where the title contains the string
    todoSearch(title:String) : [ToDo] 
  }

`);

// in-memory storage
var storage = {
  '0' : {
    id: '0',
    title: 'Till soil',
    completed: true,
  },
  '1' : {
    id: '1',
    title: 'Plant seeds',
    completed: true,
  },
  '2' : {
    id: '2',
    title: 'Fertilize',
    completed: true,
  },
  '3' : {
    id: '3',
    title: 'Pull weeds',
    completed: false,
  },
  '4' : {
    id: '4',
    title: 'Harvest crops',
    completed: false,
  },
}

// graphql root resolver
var root = {
  todo: function({id}) {
    return storage[id];
  },

  todoList : () => {
    var output = [], item;
    for (var x in storage) {
      item= {};
      item.id = storage[x].id;
      item.title = storage[x].title;
      item.completed = storage[x].completed
      output.push(item);
    }
    return output;
  },

  todoStatus : function({completed}) {
    var output = [], item;
    for(var x in storage) {
      if(storage[x].completed==completed) {
        item = {};
        item.id = storage[x].id;
        item.title = storage[x].title;
        item.completed = storage[x].completed;
        output.push(item);
      }
    }
    return output;
  },

  todoSearch : function({title}) {
    var output = [], item;
    for(var x in storage) {
      if(storage[x].title.indexOf(title)>-1) {
        item = {};
        item.id = storage[x].id;
        item.title = storage[x].title;
        item.completed = storage[x].completed;
        output.push(item);
      }
    }
    return output;
  },

};

// express graphiql app
var app = express();
app.use('/todo-graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a ToDo GraphQL API Server at localhost:4000/todo-graphql');


