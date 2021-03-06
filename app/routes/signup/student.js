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
          resolve(data);
        } else {
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
  setupController(controller, model) {
    controller.set("model", model);
    this.get("store").findAll("instructions").then(function(ins) {
      ins.forEach(function(i) {
        if (i.get('name') === "student") {
          controller.set("instructions", i);
        }
      });
    });
  },
  actions: {
    save(student) {
      var name = student.get('name');
      var phone = student.get('phone');
      var tShirt = student.get('tShirt');
      var school = student.get('school');
      var didPass = true;
      if(!(name && phone && tShirt && school)){
        Ember.$("#fail-text").text("Please fill in all the above feilds.");
        window.setTimeout(function() {
          Ember.$('#fail-text').text("");
        }, 3000);
        didPass = false;
      }
      student.save().then(function(){
        if(didPass){
          Ember.$('#success-text').text("Saved!");
          window.setTimeout(function() {
            Ember.$('#success-text').text("");
          }, 2000);
        }
      });
    },
    update(project,stu) {
      if(project.get('password')){
        var pass = prompt("Enter Project Password");
        if(pass != project.get('password')) {
          alert("Password Not Correct.");
          return;
        }
      }
      this.send('save',stu);
      var oldProject = stu.get('projectID');
      var newProject = project.get('id');
      var ref = new Firebase(ENV.firebase + "organizations");

      if(oldProject){
        //decriment old project.
        ref.child(oldProject).once('value', function(dataSnapshot) {
          if(dataSnapshot.val() == null){
            return;
          }
           var old = dataSnapshot.val().count - 1;
          ref.child(oldProject).update({"count":old});
        });

      }

      //Incriment new Project
      var nowNew;
      ref.child(newProject).once('value', function(dataSnapshot) {
        nowNew = dataSnapshot.val().count + 1;
      });
      ref.child(newProject).update({"count":nowNew});

      //Write to store and save
      stu.set("projectID", project.get('id'));
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
