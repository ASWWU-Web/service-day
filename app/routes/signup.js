import Ember from 'ember';

export default Ember.Route.extend({
  // if the user is logged out, go to the home page
  beforeModel() {
    if (!this.get('session.currentUser')) {
      this.transitionTo('home');
    }
  }
});
