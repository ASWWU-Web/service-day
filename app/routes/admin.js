import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  model() {
    var store = this.get("store");
    return Ember.RSVP.hash({
      instructions: store.findAll("instructions"),
      organizations: store.findAll("organization"),
      students: store.findAll("student")
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
    },
    csv(record) {
      var ref;
      try{
        ref = new Firebase(ENV.firebase + record);
      }
      catch(er){
        alert("There was an Error" + er);
        return;
      }
      var recordData;
      ref.once("value", (data) => {
        recordData = data.val();
      });
      var data = ['<records>'];
      var regex = /[\n"/<>'&]/g;
      Ember.$.each(recordData, (key,value) => {
        var subData = "<record>";
        Ember.$.each(value,(k,v) => {
          try{
            subData += "<" + k + ">" + v.replace(regex,"") + "</" + k + ">\n";
          }
          catch(er){
            subData += "<" + k + ">" + v + "</" + k + ">\n";
          }
        });
        subData += "</record>";
        data.push(subData);
      });
      data.push('</records>');
      var csvContent = data.join('\n');
      try {
        var a = document.createElement('a');
        a.href = 'data:attachment/xml,' +  encodeURIComponent(csvContent);
        a.target = '_blank';
        a.download = record + '.xml';

        document.body.appendChild(a);
        a.click();
        a.remove();
      }
      catch(er){
        alert("There was an error. Try using Firefox or Chome.\n" + er);
      }

    }
  }
});
