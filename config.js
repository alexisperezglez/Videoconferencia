module.exports = {
  port: 8001,
  sslPort: 8002,
  mongoUrl: 'mongodb://localhost/mongo',
  sessionSecret: 'videoconferencia-secret',
  cookieSecret: 'videoconferencia-secret',
  cookieMaxAge: (10 * 24 * 3600 * 1000)  //10 días
};