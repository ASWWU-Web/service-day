import Ember from 'ember';

export default Ember.Route.extend({
  email: " ",
  name: " ",
  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.set('email',this.get('session.currentUser.email'));
      var data = this.get('store').query('student',{
        orderBy: 'owner',
        equalTo: this.get('email')
      });
      console.log(data);
    }else{
      this.transitionTo('home');
    }
  },
  model() {
    var store = this.get("store");
    return Ember.RSVP.hash({
      organizations: store.findAll("organization")
    });
  },
  actions: {
    update(org) {
      this.send('signUp');
    },
    signUp(ins) {
      var email = this.get("email");
      var stu = this.get('store').createRecord('student', {"name": " ", "projectID": ins, "email": email});
      stu.owner = email;
      stu.save().then(function() {
        console.log("WORKED");
      });
    }
  }
});
