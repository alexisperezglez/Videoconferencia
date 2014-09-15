require('./bbdd')

var express_io = require('express.io'),
  https = require('https'),
  fs = require('fs'),
  path = require('path'),
  config = require('./config'),
  users = require('./api/user'),
  auth = require ('./api/auth'),

  sslOptions = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt'),
    ca: fs.readFileSync('./ssl/ca.crt'),
    requestCert: true,
    rejectUnauthorized: false
  },

  app = express_io()
  app.https(sslOptions).io();

/******************************/
/* Configuración del servidor */
/******************************/
app.configure(function () {
  app.set('port', process.env.PORT || config.port);
  app.use(express_io.logger('dev'));
  app.use(express_io.bodyParser());
  app.use(express_io.cookieParser( config.cookieSecret ) );
  app.use(express_io.cookieSession( config.sessionSecret ) );

  app.set('view engine', 'html');
  app.set('views', __dirname + '/views' );
  app.engine('html', require('hbs').__express);

  app.use(express_io.static(path.join(__dirname, 'public')));
  app.use(express_io.csrf());
  app.enable('trust proxy');
});



/*******************************/
/* Peticiones de la aplicación */
/*******************************/
app.get("/", function(req, res){
  res.render('index.html', { csrfToken: req.csrfToken() });
});

app.get('/api/auth', auth.getAuth);
app.post('/api/auth', auth.signIn);

app.post('/api/auth/signup', auth.signUp);

app.post('/api/auth/logout', auth.logOut);

app.post('/api/auth/close', auth.closeWindow);

app.get('/api/home', users.getUserInfo);


app.get('/users', users.getUsers);
app.get('/users/deleteall', users.deleteAll);

/**********************************/
/* Peticiones con datos de prueba */
/**********************************/
app.get('/mock/home', function (req, res) {
  fs.readFile('./mocks/homeModel.json', 'utf8', function (err, data) {
    if (err) throw err;
    res.send(JSON.parse(data));
  });
});

/*************************************/
/* Peticiones de la videoconferencia */
/*************************************/
app.io.sockets.on('connection', function (socket){

  function log(){
    var array = [">>> "];
    for (var i = 0; i < arguments.length; i++) {
      array.push(arguments[i]);
    }
      socket.emit('log', array);
  }

  socket.on('message', function (message) {
    log('Got message: ', message);
    socket.broadcast.emit('message', message); // should be room only
  });

  socket.on('create or join', function (room) {
    var numClients = app.io.sockets.clients(room).length;

    log('Room ' + room + ' has ' + numClients + ' client(s)');
    log('Request to create or join room', room);

    if (numClients == 0){
      socket.join(room);
      socket.emit('created', room);
    } else if (numClients == 1) {
      app.io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room);
    } else { // max two clients
      socket.emit('full', room);
    }
    socket.emit('emit(): client ' + socket.id + ' joined room ' + room);
    socket.broadcast.emit('broadcast(): client ' + socket.id + ' joined room ' + room);

  });

});

/*******************************/
/* Arranque del servidores     */
/*******************************/

app.listen(app.get('port'));
