var express = require('express'),
	path = require('path'),
  http = require('http'),
	users = require('./routes/users');
 
var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 8001);
  app.use(express.logger('dev')); 
  app.use(express.bodyParser()),
  app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/users', users.getUsers);
app.get('/users/:id', users.getUserById);
app.post('/users', users.addUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUser);
 
http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});