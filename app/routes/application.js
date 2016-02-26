import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get("session").fetch().catch(function() {});
  },
  setupController(controller) {
    // obviously not very secure, but eh, oh wells ;)
    // admin_emails are in config/environment.js
    controller.isAdmin = ENV.admin_emails.indexOf(controller.get('session.currentUser.email')) > -1;
  },
  actions: {
    signOut: function() {
      this.get("session").close();
      window.location.reload();
    }
  }
});
