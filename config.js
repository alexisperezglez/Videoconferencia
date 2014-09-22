module.exports = {
  port: 8001,
  sslPort: 8002,
  mongoUrl: 'mongodb://localhost/mongo',
  sessionSecret: 'videoconferencia-secret',
  cookieSecret: 'videoconferencia-secret',
  cookieMaxAge: (1 * 24 * 3600 * 1000)  //1 día
};