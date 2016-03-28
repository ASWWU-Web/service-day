import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  actions: {
    resetPassword() {
      //var email = Ember.$('input[name=resetEmail]').val();
      var ref = new Firebase(ENV.firebase);
      //var say = function(text,color) {
      //  Ember.$('#password-error').text(text);
      //  Ember.$('#password-error').css("color",color);
      //};
      ref.resetPassword({
        "email" : email
      }, function(error) {
        if (error === null) {
          console.log("WORKED");
          //("Password reset email sent successfully", "green");
        } else {
          console.log("ERR");
          //say(error,"red");
        }
      });
    }
  }
});
