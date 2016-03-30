import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  actions: {
    changePassword() {
      //var email = this.get("session").currentUser.email;
      var ref = new Firebase(ENV.firebase);
      var authdata = ref.getAuth();
      var email = authdata.password.email;

      var say = function (text ,color) {
        Ember.$('#change-error').text(text);
        Ember.$('#change-error').css("color",color);
      };
      var oldPass = Ember.$('input[name=oldPass]').val();
      var newPass = Ember.$('input[name=newPass]').val();
      var verifyPass = Ember.$('input[name=verifyPass]').val();
      if(newPass === verifyPass) {
        ref.changePassword({
          email: email,
          oldPassword: oldPass,
          newPassword: newPass
        },function(error){
          if (error===null) {
            say("You password has been changed.","green");
          } else {
            say(error,"red");
          }
        });
      }else {
        say("The New Passwords you entered were not the same","red");
      }
    }
  }
});
