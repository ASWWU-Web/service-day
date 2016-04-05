import Ember from 'ember';

export default Ember.Route.extend({
  email: "",
  beforeModel() {
    if (this.get('session.isAuthenticated')) {
      this.set('email',this.get('session.currentUser.email'));
    }else{
      this.transitionTo('home');
    }
  },
  model() {
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
          resolve(stu);
        } else {
          data.forEach(function(obj) {
            Ember.$('#'+ obj.get('projectID')).addClass("bg-primary");
          });

          resolve(data);
        }
      });
    });
    return Ember.RSVP.hash({
      organizations: store.findAll("organization"),
      "student": student,
      isEditing: this.get("isEditing")
    });
  },
  actions: {
    save(student) {
      student.save().then(function(){
        Ember.$('#success-text').text("Saved!");
        window.setTimeout(function() {
          Ember.$('#success-text').text("");
        }, 2000);
      });
    },
    update(project,stu) {
      stu.set("projectID", project.get('id'));
      //Ember.$(".bg-primary").removeClass("bg-primary");
      //Ember.$('#'+ project.get('id')).addClass("bg-primary");
      stu.save();
    },
    signUp(project) {
      var email = this.get("email");
      var stu = this.get('store').createRecord('student', {"name": this.get('name'), "projectID": project.get("id"), "email": email});
      stu.save().then(function() {
        console.log("WORKED",project.get("id"));
      });
    }
  }
});
