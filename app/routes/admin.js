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
      //declare firebase object
      try{
        ref = new Firebase(ENV.firebase + record);
      }
      catch(er){
        alert("There was an Error" + er);
        return;
      }
      var projectID2name = function(id) {
        var responce;
        try {
          ref.root().child("organizations/" + id).once('value', (data) => {
            try {
              responce = data.val().name;
            } catch(er) {
              responce = "PROJECT REMOVED!";
            }
          });
        } catch(er) {
          responce = "PROJECT REMOVED!";
        }

        return responce;
      };

      //get records from firebase
      ref.once("value", function(recordData) {
        recordData = recordData.val();
        //this the array that gets joined together in the end
        var data = [];
        var regex = /[\n"/<>'&]/g;
        //this is what the csv will be ordered by. (name is first)
        var keys = ["name"];

        //Add RecordID
        var currentID = 1;


        //go through all the record objects
        Ember.$.each(recordData, function(key,value) {
          //put any data whose key is already known into subdata[]
          var subData = [currentID];
          for (var i = 0; i < keys.length; i++){
            var k = keys[i];
            if (k in value){
              //convert projectID to project name if necessary.
              if(k === "projectID" && value[k] != "" && value[k] != null){
                subData.push('"' + projectID2name(value[k]).replace(regex,"") + '"');
              } else {
                subData.push('"' + String(value[k]).replace(regex,"") + '"');
              }
              //remove the value from the json so that it won't be used again.
              delete value[k];
            } else {
              subData.push('" "');
            }
          }
          //add the remaining elements and make sure not to add any duplicates.
          Ember.$.each(value, function(k,v) {
            //add k to keys[]
            keys.push(k);
            // and add v to subData[] (also check if it is a projectID)
            if(k === "projectID" && v != "" && v != null){
              subData.push('"' + projectID2name(v).replace(regex,"") + '"');
            } else {
              subData.push('"' + String(v).replace(regex,"") + '"');
            }
          });
          data.push(subData.join(','));
          currentID++;
        });
        //Add ID to keys array.(so that everything is properly labled.)
        keys.unshift('ID');
        //Add keys to begining of csvArray.
        data.unshift(keys);
        //download file to client using HTML5
        var csvContent = data.join('\n');
        try {
          var a = document.createElement('a');
          a.href = 'data:attachment/csv,' +  encodeURIComponent(csvContent);
          a.target = '_blank';
          a.download = record + '.csv';

          document.body.appendChild(a);
          a.click();
          a.remove();
        }
        catch(er){
          alert("There was an error. Try using Firefox or Chome.\n" + er);
        }
      });


    }
  }
});
