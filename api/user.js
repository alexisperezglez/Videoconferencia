var mongoose = require('mongoose'),
  User = mongoose.model('user');

exports.getUsers = function(req, res) {
  console.log('Recuperando la lista de usuarios...');
  User.find(function(err, users) {
    if (err) {
      console.log('Se ha producido un error');
    } else {
      console.log('Listado de usuarios recuperado con éxito');
      res.send(users);
    }
  });
};

exports.deleteAll = function (req, res) {
  mongoose.connection.collections['users'].drop(function (err) {
    if (err) {
      console.log('Se ha producido un error');
    } else {
      res.send('Lista de usuarios borrada');
      console.log('Lista de usuarios borrada');
    }
  });
};