(function() {
  $V.MainView = $V.baseView.extend({
    el: $('#contenedor'),
    tmpl: '#tmpl_main',
    events: {
      'click [data-link]': 'navigate'
    },
    logado: false,

    afterInitialize: function () {
      this.model = new $V.BaseViewModel();
      this.loadPage();
    },

    loadPage: function () {
      var self = this;
      $.ajax({
        url: '/api/auth',
        method: 'GET',
        success: function (resp){
          self.logado = resp.logado;
          self.render();
        }
      });
    },

    afterRender: function () {
      if (this.logado){
        $V.views.homeView = new $V.HomeView({
          el: $('#page-content')
        });
        $V.views.homeView.render();
      } else {
        $V.views.loginView = new $V.LoginView({
          el: $('#page-content')
        });
        $V.views.loginView.render();
      }
    }

  });
}());