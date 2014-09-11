(function() {
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g,
    evaluate: /\[\[(.+?)\]\]/g
  };

  _.mixin({

    tmpl: function (id, context) {
      var html = $.trim($(id).html()).replace(/(\r\n|\n|\r)/gm, '');
      return _.template(html, context);
    },

    serializeForm: function ($form) {
      var formArray = [],
        formObj = {};

      if (!_.isEmpty($form)) {
        formArray = $form.serializeArray();
        _.each(formArray, function (field) {
          formObj[field.name] = field.value;
        });
      }

      return formObj;
    },

    validateNotBlank: function (formObj) {
      var result = [];

      _.each(_.keys(formObj), function (field) {
        if (_.isEmpty(formObj[field])) {
          result.push(field);
        }
      });

      return result;
    },

    cleanErrorValidations: function ($form) {
      $form.find('[name]').closest('div').removeClass('has-error');
    },

    markValidationErrors: function ($form, list) {
      _.each(list, function (item) {
        $form.find('[name="' + item + '"]').closest('div').addClass('has-error');
      });
    }
  });
}());