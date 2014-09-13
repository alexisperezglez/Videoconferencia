$V.HomeView = $V.baseView.extend({
  tmpl: '#tmpl_home',
  events: {
    'click [data-desconectar]' : 'logOut',
    'click [data-user]' : 'tryToPerformCall',
    'click #finishCall' : 'finishCall'
  },

  calling: false,

  afterInitialize: function () {
    var self = this;
    this.model = new $V.BaseViewModel();
    this.loadPage();
  },

  loadPage: function () {
    var self = this;

    $.ajax({
      url: 'api/home',
      contentType: 'application/json',
      dataType: 'json',
      type: 'GET',
      beforeSend: this.beforeSendRequest
    }).done(function (data) {
      self.model.set(data, {silent: true});
      self.render();
    });
  },

  beforeSendRequest: function (xhr) {
    var csrfToken = $('meta[name="csrf-token"]').attr('content');
    
    if (csrfToken) {
      xhr.setRequestHeader('X-CSRF-Token', csrfToken);
    }
  },

  tryToPerformCall: function (ev) {
    var targetUserid = $(ev.currentTarget).attr('data-user');

    $V.utils.getUserMedia(this.successCallback, this.errorCallback);
  },

  successCallback : function (stream) {
    var localVideo = document.querySelector('#localVideo'),
      remoteVideo = document.querySelector('#remoteVideo'),
      $finishContainer = $('#finishContainer');
    
    window.stream = stream;
    if (window.URL) {
      localVideo.src = window.URL.createObjectURL(stream);
    } else {
      localVideo.src = stream;
    }
    localVideo.play();
    $finishContainer.removeClass('hidden');
  },

  errorCallback: function (error) {
    console.log('navigator.getUserMedia error: ', error);
  },

  finishCall: function (ev) {
    var localVideo = document.querySelector('#localVideo'),
      remoteVideo = document.querySelector('#remoteVideo'),
      $finishContainer = $('#finishContainer');

    window.stream.stop();
    localVideo.src='';
    remoteVideo.src='';
    $finishContainer.addClass('hidden');
  },
  
  logOut: function (ev) {
    $.ajax({
      url: 'api/auth/logout',
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      beforeSend: this.beforeSendRequest
    });
  }

});
