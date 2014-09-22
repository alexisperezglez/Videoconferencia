var mongoose = require('mongoose'),
  config = require('./config'),
  Schema = mongoose.Schema,
  userSchema = new Schema({
    username: { type: String,  required: true, unique: true },
    email: String,
    hash: String,
    state: { type: Number, default: 0 } // 0: online, 1: offline, 2: busy
  });

  userSchema.pre("save", function(next) {
    var self = this;

    User.findOne({username : this.username}, 'user', function(err, results) {
        if(err) {
            next(err);
        } else if(results) {
            self.invalidate('user', 'nombre de usuario existente');
            next(new Error('Nombre de usuario existente, elija otro por favor'));
        } else {
            next();
        }
    });
});

var User = mongoose.model('user', userSchema);
mongoose.connect(config.mongoUrl, function (err, res) {
  if (err) {
  console.log ('Error conectando a la base de datos: ' + config.mongoUrl + '. ' + err);
  } else {
  console.log ('Conectado con éxito a: '+ config.mongoUrl);
  }
});