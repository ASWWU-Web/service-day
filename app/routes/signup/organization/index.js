import Ember from 'ember';
import ENV from '../../../config/environment';

export default Ember.Route.extend({
  model() {
    return this.get('store').query('organization', {
      orderBy: 'owner',
      equalTo: this.get('session.currentUser.email')
    });
  },
  setupController(controller, model) {
    controller.set("model", model);
    this.get("store").findAll("instructions").then(function(ins) {
      ins.forEach(function(i) {
        if (i.get('name') === "organization") {
          controller.set("instructions", i);
        }
      });
    });
  },
  actions: {
    createNew() {
      var pass = this.get('session.org_pass') || prompt("Enter organization code (this should have been emailed to you)");
      if (pass === ENV.org_pass) {
        var self = this;
        var org = this.get('store').createRecord('organization',{name: "New organization "+Math.floor(Math.random()*100)});
        org.owner = this.get('session.currentUser.email');
        org.save().then(function() {
          self.transitionTo("signup.organization.edit", org);
        });
      } else {
        alert("Wrong password!");
      }
    }
  }
});
