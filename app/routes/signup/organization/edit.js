import Ember from 'ember';
import ENV from "../../../config/environment";

export default Ember.Route.extend({
  setupController(controller, model) {
    // obviously not very secure, but eh, oh wells ;)
    // admin_emails are in config/environment.js
    controller.isAdmin = ENV.admin_emails.indexOf(controller.get('session.currentUser.email')) > -1;
    controller.set('model', model);
  },
  model(params) {
    return this.get('store').findRecord('organization', params.id);
  },
  actions: {
    save() {
      this.modelFor(this.routeName).save().then(function() {
        Ember.$('#success-text').text("Success!");
        Ember.$('#successModal').modal('show');
        window.setTimeout(function() {
          Ember.$('#success-text').text("");
        }, 2000);
      });
    },
    destroy() {
      var self = this;
      if(confirm("Are you sure you want to delete this project?") != true)
        return;
      this.modelFor(this.routeName).destroyRecord().then(function() {
        self.transitionTo('signup.organization');
      });
    }
  }
});
