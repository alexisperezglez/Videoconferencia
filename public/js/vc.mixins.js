(function() {
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g,
    evaluate: /\[\[(.+?)\]\]/g
  };

  _.mixin({
    tmpl: function (id, context) {
      var html = $.trim($(id).html()).replace(/(\r\n|\n|\r)/gm, '');
      return _.template(html, context);
    }
  });
}());