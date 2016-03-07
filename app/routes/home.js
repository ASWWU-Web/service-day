import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  'isRegister': true,
  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('signup');
    }
  },
  actions: {
    submit(){
      console.log("submit()");
      if(this.get('isRegister'))
        this.send('register');
      else {
        this.send('signIn');
      }
    },
    showRegister() {
      // could change this to open a modal??
      Ember.$('#registerStuff').removeClass('hidden-xl-down');
      Ember.$('#registerStuff + div').addClass('hidden-xl-down');
      this.set('isRegister',true);
    },
    hideRegister() {
      // could change this to open a modal??
      Ember.$('#registerStuff').addClass('hidden-xl-down');
      Ember.$('#registerStuff + div').removeClass('hidden-xl-down');
      this.set('isRegister',false);
    },
    register: function() {
      var self = this;
      var email = Ember.$('input[name=email]').val();
      var password = Ember.$('input[name=password]').val();
      var ref = new Firebase(ENV.firebase);
      ref.createUser({
        email: email,
        password: password
      }, function(error, userData) {
        if (error) {
          Ember.$('#error-text').text(error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          self.send('signIn');
        }
      });
    },
    signIn: function() {
      var email = Ember.$('input[name=email]').val();
      var password = Ember.$('input[name=password]').val();
      this.get("session").open("firebase", {
        provider: "password",
        email: email,
        password: password
      }).then(function(data) {
        console.log(data.currentUser);
        window.location.reload();
      }).catch(function(error) {
        Ember.$('#error-text').text(error);
      });
    }
    // signOut is in the broader scoped routes/application.js
  }
});
