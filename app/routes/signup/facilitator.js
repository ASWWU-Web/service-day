import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.Route.extend({
  email: "",
  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.set('email',this.get('session.currentUser.email'));
    }else{
      this.transitionTo('signup');
    }
  },
  model(){
    var self = this;
    var store = self.get("store");
    var student = new Ember.RSVP.Promise(function (resolve, reject) {
      self.get('store').query('student', {
        orderBy: 'email',
        equalTo: self.get('email')
      }).then(function(data) {
        var y;
        data.forEach(function(obj) {
          y = obj;
        });
        if (!y) {
          self.set("isEditing",true);
          var stu = self.get('store').createRecord('student', {
            "name": self.get('name'),
            "projectID": "",
            "email": self.get('email')
          });
          stu.save();
          resolve(data);
        } else {
          resolve(data);
        }
      });
    });
    return Ember.RSVP.hash({
      facilitator: store.findAll("facilitator"),
      "student": student,
    });
  },
  actions:{
    check(stu){
      var email = stu.get('email');
      var phone = stu.get('phone');
      var name = stu.get('name');
      var school = stu.get('school');
      var projectID = stu.get('projectID');
      if(email && phone && name && school && projectID) {
        var ref = new Firebase(ENV.firebase + "facilitators/");
        var data;
        ref.once('value',function(dataSnapshot){
          data = dataSnapshot.val();
        });
        var isApplicable = true;
        if(data){
          $.each(data,function(key,value){
            if(value.school == school){
              isApplicable = false;
            }
          });
        }
        if(isApplicable){
          var fac = this.get('store').createRecord("facilitator",{
            "school": school,
            "email": email,
            "phone": phone,
            "name": name
          });
          stu.set('isFacilitator',true);
          stu.save();
          fac.save();
        }else {
          Ember.$("#error").text("A facilitator from your school has already signed up.");
        }

      }else {
        Ember.$("#error").text("You haven't finished your student signup yet.");
      }

    }
  }
});
