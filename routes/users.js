var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('userdb', server);

db.open(function(err, db) {
  if(!err) {
    console.log("Conectado a la base de datos");
    db.collection('users', {strict:true}, function(err, collection) {
      if (err) {
        console.log("The 'users' collection doesn't exist. Creating it with sample data...");
        populateDB();
      }
    });
  }
});

exports.getUsers = function(req, res) {
  console.log('Recuperando la lista de usuarios...');
  db.collection('users', function(err, collection) {
    collection.find().toArray(function(err, items) {
      res.send(items);
    });
  });
};
 
exports.getUserById = function(req, res) {
  var id = req.params.id;

  console.log('Recuperando usuario con id: ' + id);
  db.collection('users', function(err, collection) {
    collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, item) {
        res.send(item);
    });
  });
};

exports.addUser = function(req, res) {
  var user = req.body;
  console.log('Añadiendo usuario: ' + JSON.stringify(user));
  db.collection('users', function(err, collection) {
    collection.insert(user, {safe:true}, function(err, result) {
      if (err) {
        console.log('Error añadiendo usuario: ' + err);
        res.send({'error':'Se ha producido un error'});
      } else {
        console.log('Exito al añadir usuario: ' + JSON.stringify(result[0]));
        res.send(result[0]);
      }
    });
  });
}

exports.updateUser = function(req, res) {
  var id = req.params.id;
  var user = req.body;
  console.log('Actualizando usuario: ' + id);
  console.log(JSON.stringify(user));
  db.collection('users', function(err, collection) {
    collection.update({'_id':new BSON.ObjectID(id)}, user, {safe:true}, function(err, result) {
      if (err) {
        console.log('Error actualizando usuario: ' + err);
        res.send({'error':'Se ha producido un error'});
      } else {
        console.log('' + result + ' usuario actualizado');
        res.send(user);
      }
    });
  });
}

exports.deleteUser = function(req, res) {
  var id = req.params.id;
  console.log('Deleting wine: ' + id);
  db.collection('wines', function(err, collection) {
    collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
      if (err) {
        res.send({'error':'Se ha producido un error - ' + err});
      } else {
        console.log('' + result + ' usuario borrado');
        res.send(req.body);
      }
    });
  });
}

var populateDB = function() {
 
  var users = [
    {
      username: 'usuario1',
      email: 'usuario1@user.com',
      state: 'online'
    },
    {
      username: 'usuario2',
      email: 'usuario2@user.com',
      state: 'busy'
    },
    {
      username: 'usuario3',
      email: 'usuario3@user.com',
      state: 'offline'
    }
  ];

  db.collection('users', function(err, collection) {
      collection.insert(users, {safe:true}, function(err, result) {});
  });
 
};