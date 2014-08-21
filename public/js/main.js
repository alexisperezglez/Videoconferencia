var AppRouter = Backbone.Router.extend({

  routes: {
    ""            : "login",
    /*"login"       : "login",
    "users/:id"   : "userDetails",
    "users"       : "usersList"*/
  },

  login: function () {
    $('#content').html(new login_view().el);
  },

  /*usersList: function() {
    var usersList = new UsersCollection();
    usersList.fetch({
      success: function(){
        $("#content").html(new WineListView({model: usersList}).el);
      }
    });
  },

  userDetails: function (id) {
    var user = new User({_id: id});
    user.fetch({
      success: function(){
       $("#content").html(new WineView({model: wine}).el);
      }
    });
  }*/

});

utils.loadTemplate(['login_view'], function() {
  app = new AppRouter();
  Backbone.history.start();
});