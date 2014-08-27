(function() {
  $V.MainView = $V.baseView.extend({
    el: $('#contenedor'),
    tmpl: '#tmpl_main',
    events: {
      'click [data-link]': 'navigate'
    },
    afterInitialize: function () {
      this.model = new $V.BaseViewModel();
      this.pageLoaded();
    },
    afterRender: function () {
      $V.views.homeView = new $V.HomeView({
        el: $('#main-container')
      });
      $V.views.homeView.render();

      $V.views.loginView = new $V.LoginView({
        el: $('#side-container')
      });
      $V.views.loginView.render();
    }
  });
}());