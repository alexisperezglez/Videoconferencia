$V.LoginView = $V.baseView.extend({
  tmpl: '#tmpl_login',
  events: {
    'submit #login-form': 'signIn'
  },

  afterInitialize: function () {
    this.model = new $V.BaseViewModel();
  },

  signIn: function (ev) {
    ev.preventDefault();
    ev.stopPropagation()
    var $form = $(ev.currentTarget),
      $validationContainer = this.$('#validationContainer'),
      userData = {};

    $validationContainer.addClass('hidden');
    userData = _.serializeForm($form);

    _.cleanErrorValidations($form);
    validationErrors = _.validateNotBlank(userData);
    if (!_.isEmpty(validationErrors)) {
      _.markValidationErrors($form, validationErrors);
    } else {
      this.onSignIn(JSON.stringify(userData), this.successCallback, this.errorCallback);
    }
  },

  onSignIn: function (data, success, error) {
    $.ajax({
      url: 'api/auth',
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      beforeSend: this.beforeSendRequest,
      data: data,
      success: success,
      error: error
    });
  },

  beforeSendRequest: function (xhr) {
    var csrfToken = $('meta[name="csrf-token"]').attr('content');
    
    if (csrfToken) {
      xhr.setRequestHeader('X-CSRF-Token', csrfToken);
    }
  },

  successCallback: function (data) {
    var status = data.status,
      $validationContainer = $('#validationContainer');;

    if (status === 'OK') {
      $V.app_router.navigate('home', {trigger: true});
    } else {
      $.when(
        $validationContainer.find('#validationMessage').html(data.message)
      ).then(
        $validationContainer.removeClass('hidden')
      );
    }
  },

  errorCallback: function (data) {}
});