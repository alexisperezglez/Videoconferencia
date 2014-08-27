(function() {
  $V.LoginView = $V.baseView.extend({
    tmpl: '#tmpl_login',
    events: {},
    afterInitialize: function () {
      var self = this;
      this.model = new $V.BaseViewModel();
    },
    afterRender: function () {
    }
  });
}());
/*window.login_view = Backbone.View.extend({

  events: {
    'submit .login_view_form': 'saveUser'
  },

  saveUser: function (ev) {
    var $form = $(ev.currentTarget),
    	userDetails = JSON.parse({
    		username: this.$('#username'),
    		email: this.$('email')
    	}),
    	user = new User();

    user.save(userDetails, {
      success: function (user) {
        router.navigate('', {trigger:true});
      }
    });
    return false;
  },

  initialize:function () {
    this.render();
  },

  render:function () {
    $(this.el).html(this.template());
    return this;
  }
});*/