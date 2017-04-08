const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  //  deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  //  deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Users').deleteMany({name: 'Eddrick'});

  // db.collection('Users').findOneAndDelete({
  //   _id: new ObjectID("58e7ba1fe3877e340cbf8f4a")
  // }).then((results) => {
  //   console.log(JSON.stringify(results, undefined, 2));
  // });

  // db.collection('User').findOneAndDelete({_id: new ObjectID("58e7b57dac56e72550ec0aa9")}).then((results) => {
  //   console.log(JSON.stringify(results, undefined, 2));
  // });
});
  // db.close();
