(function() {
  $V.AppRouter = Backbone.Router.extend({
    routes: {
      '' : 'defaultRoute',
      'login' : 'defaultRoute',
      'home' : 'defaultRoute',
      'signup' : 'signUp'
    },


    defaultRoute: function (actions) {
      $.when(
        $('#contenedor').html(_.tmpl('#tmpl_main'))
      ).then(
        $V.views.main = new $V.MainView()
      );
    },

    signUp: function () {
      $V.views.signup = new $V.SignUpView();
    }
  });
}());