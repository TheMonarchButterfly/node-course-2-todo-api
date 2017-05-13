const{ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '58ea8da0a4ea91d008c63504';

Todo.remove({}).then((result) => {
  console.log(result);
});

// Todo.findOneAndRemove     //finds one and removes, giving back information about the removed object
// Todo.findByIdAndRemove    //removes by Id

Todo.findOneAndRemove({_id: '590d78f2b4751cdecae39b63'}).then((todo) => {
  
});

Todo.findByIdAndRemove('590d78f2b4751cdecae39b63').then((todo) => {
  console.log(todo);
});