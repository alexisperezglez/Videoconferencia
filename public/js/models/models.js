window.User = Backbone.Model.extend({

  urlRoot: "/users",

  idAttribute: "_id",

  defaults: {
    _id: null,
    username: "",
    email: "",
    status: "online"
  }
});

window.Users = Backbone.Collection.extend({

    model: User,

    url: "/users"

});