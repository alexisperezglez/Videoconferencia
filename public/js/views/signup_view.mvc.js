(function() {
  $V.SignUpView = $V.baseView.extend({
    tmpl: '#tmpl_signup',
    el: $('#contenedor'),
    events: {
      'submit #signUp-form' : 'sendForm'
    },

    afterInitialize: function () {
      this.model = new $V.BaseViewModel();
      this.render();
    },

    sendForm: function (ev) {
      ev.preventDefault();
      var $form = $(ev.currentTarget),
        $validationContainer = this.$('#validationContainer'),
        userData = {},
        validationErrors = [];

      $validationContainer.addClass('hidden');
      userData = _.serializeForm($form);

      _.cleanErrorValidations($form);
      validationErrors = _.validateNotBlank(userData);
      if (!_.isEmpty(validationErrors)) {
        _.markValidationErrors($form, validationErrors);
      } else {
        this.onSignUp(JSON.stringify(userData), this.successCallback, this.errorCallback);
      }
    },

    onSignUp: function (data, success, error) {
      $.ajax({
        url: 'api/auth/signup',
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
          _.markValidationErrors($('form'), ['username']),
          $validationContainer.removeClass('hidden')
        );
      }
    },

    errorCallback: function (data) {}

  });
}());