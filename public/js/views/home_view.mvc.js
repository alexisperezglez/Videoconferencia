(function() {
  $V.HomeView = $V.baseView.extend({
    tmpl: '#tmpl_home',
    events: {},
    afterInitialize: function () {
      var self = this;
      this.model = new $V.BaseViewModel();
    },
    afterRender: function () {
    }
  });
}());