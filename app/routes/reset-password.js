import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get("session").fetch().catch(function() {});
  },
  actions: {
    resetPassword() {
      var email = Ember.$('input[name=resetEmail]').val();
      var ref = new Firebase(ENV.firebase);
      var say = function (text ,color) {
        Ember.$('#password-error').text(text);
        Ember.$('#password-error').css("color",color);
      };
      ref.resetPassword({
        "email" : email
      }, function(error) {
        if (error === null) {
          say("Password reset email sent successfully", "green");
        } else {
          say(error,"red");
        }
      });
    }
  }
});
