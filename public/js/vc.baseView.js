(function() {
  $V.BaseViewModel = Backbone.Model.extend({
    defaults: {}
  });
  
  $V.baseView = Backbone.View.extend({
    coreEvents: {},

    initialize: function (options) {
      this.options = options || {};
      $V.utils.mergeEvents(this);
      if (_.isFunction(this.afterInitialize)) {
        this.afterInitialize();
      }
    },
    navigate: function (ev) {
      $V.utils.navigate(ev);
    },
    loadPage: function (options) {
      var self = this;
      this.model.fetch({
        beforeSend: options,
        success: function (model, resp) {
          if (_.isFunction(self.onSuccess)) {
            self.onSuccess();
          } else {
            self.pageLoaded();
          }
        },
        error: function (model, resp) {
          if (_.isFunction(self.onError)) {
            self.onError();
          } 
        }
      });
    },
    pageLoaded: function () {
      this.render();
    },
    render: function () {
      if (_.isFunction(this.beforeRender)) {
        this.beforeRender();
      }

      this.$el.html(_.tmpl(this.tmpl, this.model.toJSON()));

      if (_.isFunction(this.afterRender)) {
        this.afterRender();
      }
      return this;
    }
  });
}());
