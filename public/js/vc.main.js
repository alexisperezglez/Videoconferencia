var $V, $, _, Backbone, io;
(function() {

	$V = {
    appName: 'VideoConferencia',
    appTitle: 'Videoconferencia sobre HTML5',
    version: '2.0.0',
    templatesReady: false,
    jsLibs: {
      route: 'libs/',
      versions: {
        jquery: '1.10.2',
        underscore: '1.6.0',
        backbone: '1.1.2',
        requireText: '2.0.12',
        bootstrap: '3.2.0',
        socketio: '1.1.0'
      }
    },
    templates: {
      route: '../tmpl/'
    },
    views: {}
  };

  require.config({
    paths: {
      text: 'libs/require.text-' + $V.jsLibs.versions.requireText,
      'jquery': $V.jsLibs.route + 'jquery-' + $V.jsLibs.versions.jquery,
      'underscore': $V.jsLibs.route + 'underscore-' + $V.jsLibs.versions.underscore,
      'backbone': $V.jsLibs.route + 'backbone-' + $V.jsLibs.versions.backbone,
      'bootstrap': $V.jsLibs.route + 'bootstrap-' + $V.jsLibs.versions.bootstrap,
      'socketio': '../socket.io/socket.io',
      'adapter_webrtc': $V.jsLibs.route + 'adapter.webrtc',
      'mixins': 'vc.mixins',
      '$V_utils': 'vc.utils',
      '$V_router': 'vc.router',
      '$V_baseView': 'vc.baseView',
      'main_view': 'views/main_view.mvc',
      'home_view': 'views/home_view.mvc',
      'login_view': 'views/login_view.mvc',
      'signup_view': 'views/signup_view.mvc'
    },
    shim: {
      'socketio': {
        deps: [],
        exports: 'io'
      },
      'underscore': {
        deps: [],
        exports: '_'
      },
      'backbone': {
        deps: ['jquery', 'underscore'],
        exports: 'Backbone'
      },
      'bootstrap': {
        deps: ['jquery']
      },
      'mixins': {
        deps: ['jquery', 'underscore']
      },
      'adapter_webrtc': {
        deps: []
      },
      '$V_router': {
        deps: ['backbone']
      },
      '$V_utils': {
        deps: ['jquery', 'underscore', 'adapter_webrtc']
      },
      '$V_baseView': {
        deps: ['$V_utils', '$V_router', 'mixins', 'bootstrap']
      },
      'main_view': {
        deps: ['$V_baseView']
      },
      'home_view': {
        deps: ['main_view']
      },
      'login_view': {
        deps: ['main_view']
      },
      'signup_view': {
        deps: ['$V_baseView']
      }
    },
    waitSeconds: 30
  });

  $V.resourcesJs = [
    'jquery',
    'underscore',
    'backbone',
    'socketio',
    'adapter_webrtc',
    'mixins',
    '$V_utils',
    '$V_router',
    '$V_baseView',
    'main_view',
    'home_view',
    'login_view',
    'signup_view'
  ];

  $V.resourcesText = [
    'text!' + $V.templates.route + 'tmpl_main.html',
    'text!' + $V.templates.route + 'tmpl_home.html',
    'text!' + $V.templates.route + 'tmpl_login.html',
    'text!' + $V.templates.route + 'tmpl_signup.html'
  ];


  $V.initialize = function () {
    $V.app_router = new $V.AppRouter();
    $V.views.mainView = new $V.MainView();
    Backbone.history.start();
  }

  define($V.resourcesJs.concat($V.resourcesText), function () {
    var templates = '',
      l = arguments.length,
      i;
    $ = arguments[0];
    _ = arguments[1];
    Backbone = arguments[2];
    io = arguments[3];
    for (i = 5; i < l; i += 1) {
      if (typeof arguments[i] === 'string') {
        templates += arguments[i];
      }
    }

    $.when($('#templates-area').append(templates)).then(function () {
      $V.templatesReady = true;
      $V.initialize();
    });
  });
}());