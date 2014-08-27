(function() {
  $V.AppRouter = Backbone.Router.extend({
    routes: {
      "login": "defaultRoute"
    },


    defaultRoute: function (actions) {
      $.when($("#contenedor").html(_.tmpl('#tmpl_login'))).then($V.views.login = new $V.LoginView());
    }
  });
}());