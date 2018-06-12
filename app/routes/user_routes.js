var http = require('http');
var ObjectId = require('mongodb').ObjectID;

module.exports = function(app, db){
  app.get('/users/:id', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    db.collection('users').find({'_id': new ObjectId(req.params.id)}).toArray((err, users) => {
      console.log(users);
      if (err){
        res.send(JSON.stringify({'err': 'Can not find user by id'}));
      }
      else{
        res.send(JSON.stringify(users[0] || []));
      }
    });
  });
  app.put('/users/:id', (req, resp) => {
    resp.setHeader("Content-Type", "application/json");
    db.collection('users').updateOne({'_id': new ObjectId(req.params.id)}, {
      '$set': req.body
    }, {upsert: true}, (err, res) => {
      if(err){
        resp.send(JSON.stringify({
          'err': 'Can not update user'
        }));
      }
      else{
        resp.send(JSON.stringify({
          'message': 'Updated ' + res.result.n + ' users'
        }));
      }
    });
  });
  app.delete('/users/:id', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    db.collection('users').remove({'_id': new ObjectId(req.params.id)}, (err, result) => {
      if(err){
        res.send(JSON.stringify({
          'err': 'Can not delete user'
        }));
      }
      else{
        res.send(JSON.stringify({
          'message': 'Removed ' + result.result.n + ' users'
        }));
      }
    });
  });
  app.get('/users', function(req, res){
    res.setHeader("Content-Type", "application/json");
    db.collection('users').find().toArray((err, users) => {
      if (err){
        res.send(JSON.stringify({'err': 'Can not find users'}));
      }
      else{
        res.send(JSON.stringify(users));
      }
    });
  });
  app.post('/users', function(req, res){
    const user = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password
    };
    res.setHeader("Content-Type", "application/json");
    db.collection('users').insert(user, (err, result) => {
      if(err){
        res.send({'error': 'Error at inserting user'});
      }
      else{
        res.send(result.ops[0]);
      }
    });
  });
};
