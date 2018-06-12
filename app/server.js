const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();

const port = 8080;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

MongoClient.connect('mongodb://localhost:27017/feedify', (err, db) => {
  if (err){
    console.log(err);
  }
  else{
    require('./routes')(app, db.db('feedify'));
    app.listen(port, () => {
      console.log('Listen at :8080');
    });
  }
});
