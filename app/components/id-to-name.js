import Ember from 'ember';

export default Ember.Component.extend({
  organization: null,
  didReceiveAttrs() {
    this._super(...arguments);
    var self = this;
    let id = this.get('studentID');
    return this.get('store').findRecord('organization', {'id': id}).then((data) => {
      self.set('organization', data);
    });
  }
});
