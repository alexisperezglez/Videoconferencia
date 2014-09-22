var mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  _ = require("underscore"),
  config = require('../config'),
  User = mongoose.model('user');

exports.getAuth = function (req, res) {
  User.findOne({ _id: req.signedCookies.user_id, hash: req.signedCookies.auth_token }).lean().exec(function (err, user) {
    if (err) {
      next(err);
    }
    if (!_.isEmpty(user)) {
      User.findOneAndUpdate({ _id: user._id }, { state : 0 }, { upsert: false }, function (err, user) {
        console.log(user);
      });
      res.json({ user: _.omit(user, ['hash', '__v']), logado: true, message: 'Usuario logado'});
    } else {
      res.json({ user: {}, message: 'Usuario nuevo', logado: false });
    }
  });
}

exports.signIn = function (req, res) {
  User.findOne({ username: req.body.username }).lean().exec(function (err, user) {
    if (user) {
      if( bcrypt.compareSync( req.body.password, user.hash )){
        User.findOneAndUpdate({ _id: user._id }, { state : 0 }, { upsert: false }, function (err, user) {
          console.log(user);
        });
        res.cookie('user_id', user._id, { signed: true, maxAge: config.cookieMaxAge });
        res.cookie('auth_token', user.hash, { signed: true, maxAge: config.cookieMaxAge });
        res.json({ user: _.omit(user, ['hash', '__v']), logado: true, message: 'Usuario logado con éxito', status: 'OK' });
      } else {
          res.json({ user: {}, logado: false, message: 'Contraseña incorrecta', status:'KO' });
      }
    } else {
      res.json({ user: {}, logado: false, message: 'No existe usuario', status:'KO' });
    }
  });
}

exports.signUp = function (req, res) {
  var user = new User({
      username: req.body.username,
      email: req.body.email,
      hash: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8))
    }).save(function (err, newUser) {
      if (err) {
        res.json({ user: {}, logado: false, message: 'Nombre de usuario existente, elija otro por favor', status:'KO' });
      } else {
        User.findOne({ username: newUser.username }).lean().exec(function (err2, user) {
          res.cookie('user_id', user._id, { signed: true, maxAge: config.cookieMaxAge });
          res.cookie('auth_token', user.hash, { signed: true, maxAge: config.cookieMaxAge });
          res.json({ user: _.omit(user, ['hash', '__v']), logado: true, message: 'Usuario dado de alta con éxito', status: 'OK' });
        });
      }
    });
}

exports.logOut = function (req, res) {
  User.findOneAndUpdate({ _id: req.signedCookies.user_id }, { state : 1 }, { upsert: false }, function (err, user) {
    console.log(user);
  });
  res.clearCookie('user_id');
  res.clearCookie('auth_token');
  res.redirect('/');
}

exports.closeWindow = function (req, res) {
  User.findOneAndUpdate({ _id: req.signedCookies.user_id }, { state : 1 }, { upsert: false }, function (err, user) {
    console.log(user);
  });
}