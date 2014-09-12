$V.HomeView = $V.baseView.extend({
  tmpl: '#tmpl_home',
  events: {
    'click [data-desconectar]' : 'logOut'
  },

  afterInitialize: function () {
    var self = this;
    this.model = new $V.BaseViewModel();
    this.loadPage();
  },

  loadPage: function () {
    var self = this;

    $.ajax({
      url: 'api/user',
      contentType: 'application/json',
      dataType: 'json',
      type: 'GET',
      beforeSend: this.beforeSendRequest
    }).done(function (data) {
      self.model.set(data, {silent: true});
      self.render();
    });
  },
  
  logOut: function (ev) {
    $.ajax({
      url: 'api/auth/logout',
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      beforeSend: this.beforeSendRequest
    });
  },

  beforeSendRequest: function (xhr) {
    var csrfToken = $('meta[name="csrf-token"]').attr('content');
    
    if (csrfToken) {
      xhr.setRequestHeader('X-CSRF-Token', csrfToken);
    }
  },

  afterRender: function () {
    debugger;
  }
});
