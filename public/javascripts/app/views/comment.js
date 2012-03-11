$(function() {
  window.CommentView = Backbone.View.extend({
    events: {
      "click .delete-comment": "clear"
    },

    initialize: function() {
      _.bindAll(this, 'render', 'clear', 'remove');
    },

    render: function() {
      var pretty_timestamp = 
        moment(this.model.attributes.created_at).fromNow();
      console.log(this.model);
      this.$el.html(
        JST.comment({
          model: this.model.toJSON(),
          gravatar_url: get_gravatar_url(this.model.attributes.user.email, 24),
          pretty_timestamp: pretty_timestamp,
          user_id: this.options.user_id
        })
      );
      return this;
    },

    clear: function() {
      var self = this;
      this.model.destroy({success: function() {
        self.remove();
      }});
    },

    remove: function() {
      $(this.el).remove();
    }
  });
});