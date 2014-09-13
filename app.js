require('./bbdd')

var express = require('express'),
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

  app = express();

/******************************/
/* Configuración del servidor */
/******************************/
app.configure(function () {
  app.set('port', process.env.PORT || config.port);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use( express.cookieParser( config.cookieSecret ) );
  app.use( express.cookieSession( config.sessionSecret ) );

  app.set('view engine', 'html');
  app.set('views', __dirname + '/views' );
  app.engine('html', require('hbs').__express);

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.csrf());
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

/**********************************/
/* Arranque de los servidores     */
/**********************************/
app.listen(app.get('port'));

var secureServer = https.createServer(sslOptions,app).listen(config.sslPort, function(){
  console.log("Servidor https escuchando en el puerto: " + config.sslPort);
});