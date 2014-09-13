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
