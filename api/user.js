var mongoose = require('mongoose'),
  _ = require("underscore"),
  User = mongoose.model('user');

exports.getUsers = function(req, res) {
  console.log('Recuperando la lista de usuarios...');
  User.find(function (err, users) {
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

exports.getUserInfo = function (req, res) {
  var userInfo = {}, 
    contactList = [];

  User.find().lean().exec(function (err, users) {
    if (err) {
      res.json({ user: {}, contacts: {}, status: 'KO', logado: false, message: 'Se ha producido un error al recuperar la información de usuario' });
    }
    _.each(users, function (user) {
      if (user._id != req.signedCookies.user_id) {
        contactList.push({ id: user._id, name: user.username, state: user.state });
      } else {
        userInfo = _.omit(user, ['hash', '__v']);
      }
    });
    res.json({ user: userInfo, contacts: contactList, status: 'OK', logado: true, message: 'Información recuperada con éxito' });
  });
};