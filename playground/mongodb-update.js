const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

//  db.collection('Todos').findOneAndUpdate({
//    _id: new ObjectID('58e7dd33a669e270c7469c3f')
//  }, {
//    $set: {     //set is an update operator
//      completed: true
//    }
//  }, {
//    returnOriginal: false
//  }).then((result) => {
//    console.log(result);
//  });
// });

  db.collection('Users').findOneAndUpdate({
   _id: new ObjectID('58e7b57dac56e72550ec0aa9')
 }, {
   $set: {     //set is an update operator
     name: 'Eddrick'
   }, 
  $inc: {
    age: 1
   }
  }, {
   returnOriginal: false
 }).then((result) => {
   console.log(result);
 });
});
  // db.close();
