(function() {
  $V.utils = {};
  // Navigate
  $V.utils.navigate = function (ev) {
    var url = $(ev.currentTarget).attr('data-link');
    ev.preventDefault();
    $V.app_router.navigate(url, {trigger: true});
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

  $V.utils.performHttpRequest = function (view) {
    $.ajax({
      url: view.postUrl,
      contentType: 'application/json',
      dataType: 'json',
      type: view.postMethod,
      beforeSend: view.beforeSendRequest,
      data: view.model,
      success: view.onSuccess,
      error: view.onError
    });
  };

  $V.utils.getUserState = function (state) {
    var states= [
      'online',
      'offline',
      'busy'
    ];

    return states[state];
  };

  $V.utils.getUserMedia = function (successCallback, errorCallback) {
    var constraints = {audio: true, video: true};

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia(constraints, successCallback, errorCallback);
  }
  
})();