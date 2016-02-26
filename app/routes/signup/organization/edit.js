import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.get('store').findRecord('organization', params.id);
  },
  actions: {
    save() {
      this.modelFor(this.routeName).save().then(function() {
        Ember.$('#success-text').text("Success!");
        window.setTimeout(function() {
          Ember.$('#success-text').text("");
        }, 2000);
      });
    },
    destroy() {
      var self = this;
      this.modelFor(this.routeName).destroyRecord().then(function() {
        self.transitionTo('signup.organization');
      });
    }
  }
});
