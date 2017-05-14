// var mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');

require('./config/config');

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');  
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  // console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});   //set an object instead of an array so that you can add additional shit to it in the future
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  };

Todo.findById(id).then((todo) => {
  if(!todo){
    return res.status(404).send();
  }

  res.send({todo});
  }).catch((e) => {
    res.status(400).send();
});
});


// app.listen(3000, () => {
//   console.log('Started on port 3000');
// });

app.delete('/todos/:id', (req, res) => {
  // get the id
  var id = req.params.id;
  // validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
  //remove todo by id
    // success
      // if no doc, send 404
      // if doc, send doc back 200
    // error
      // 400 with empty body
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;   //clearing something from the database can just set it to be null

  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
    // res.send(user);
  }).then((token) => {
    res.header('x-auth', token).send(user);
    }).catch((e) => {
    res.status(400).send(e);
  })
});



app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
  // var token = req.header('x-auth');

  // User.findByToken(token).then((user) => {
  //   if (!user) {
  //     return Promise.reject();
  //   }

  //   res.send(user);
  // }).catch((e) => {
  //   res.status(401).send();
  // });
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
   return user.generateAuthToken().then((token) => {
     res.header('x-auth', token).send(user);
    });
    }).catch((e) => {
    res.status(400).send();
  });
  // res.send(body);
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};

// var Todo = mongoose.model('Todo', {
//   text: {
//     type: String,
//     required: true,
//     minlength: 1,
//     trim: true    //trim off extra spaces at the beginning and end of the string
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Number,
//     default: null
//   }
// });

// var newTodo = new Todo({
//   text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo')
// });

// save new something

// var otherTodo = new Todo({
//   text: 'Feed the doge',
//   completed: true,
//   completedAt: 123
// });

// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save todo', e)
// });

// var User = mongoose.model('User', {
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 1
//   }
// });

// var user = new User({
//   email: 'etqz@hotmail.com         '
// });

// user.save().then((doc) => {
//   console.log('User saved', doc);
// }, (e) => {
//   console.log('Unable to save user', e)
// });

