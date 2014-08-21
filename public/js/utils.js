window.utils = {

  loadTemplate: function(views, callback) {

    var deferreds = [];

    $.each(views, function(index, view) {
      if (window[view]) {
        deferreds.push($.get('tmpl/' + view + '.tmpl.html', function(data) {
            window[view].prototype.template = _.template(data);
        }));
      } else {
          alert(view + " not found");
      }
    });

    $.when.apply(null, deferreds).done(callback);
  }

}