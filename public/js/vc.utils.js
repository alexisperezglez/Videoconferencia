(function() {
  $V.utils = {};
  // Navigate
  $V.utils.navigate = function (ev) {
    var url = $(ev.currentTarget).attr('data-link');
    ev.preventDefault();
    $V.AppRouter.navigate(url, {trigger: true});
  };

  $V.utils.mergeEvents = function (self) {
    $V.utils.mergeObject(self, 'events');
  };

  $V.utils.mergeObject = function (view, type) {
    view[type] = view[type] || {};
    if (type === 'events') {
      view[type] = _.extend(view[type], view.coreEvents);
    }
  };
  
})();