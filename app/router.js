import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', {'path': '/'});

  this.route('signup', function() {
    this.route('organization', function() {
      this.route('edit', {'path': '/edit/:id'});
    });
    this.route('student');
    this.route('facilitator');
  });
  this.route('admin');
  this.route('resetPassword');
  this.route('account');
});

export default Router;
