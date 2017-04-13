const{ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '58ea8da0a4ea91d008c63504';

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// };

Todo.findById(id).then((todos) => {
  if(!todos){
    return console.log('Id not found');
  }
  console.log('Todo By Id', todos);
}).catch((e) => console.log(e));

User.findById('58e8b6e27fca5724133a6735').then((user) => {
  if(!user){
    return console.log('Unable to find user');
  }
  console.log(JSON.stringify(user, undefined, 2));
},(e) => {
  console.log(e)
})