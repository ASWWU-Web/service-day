import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  model() {
    var store = this.get("store");
    return Ember.RSVP.hash({
      instructions: store.findAll("instructions"),
      organizations: store.findAll("organization")
    });
  },
  setupController(controller, model) {
    controller.isAdmin = ENV.admin_emails.indexOf(controller.get('session.currentUser.email')) > -1;
    if (!controller.isAdmin) {
      this.transitionTo("home");
    }
    controller.set("model", model);
  },
  actions: {
    save(ins) {
      ins.save().then(function() {
        Ember.$('#success-text-'+ins.get("name")).text("Success!");
        window.setTimeout(function() {
          Ember.$('#success-text-'+ins.get("name")).text("");
        }, 2000);
      });
    }
  }
});
