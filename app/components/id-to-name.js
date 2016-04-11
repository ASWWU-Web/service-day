import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  tagName: "span",
  organization: null,
  didReceiveAttrs() {
    this._super(...arguments);
    var self = this;
    let id = this.get('studentID');
    if(!(id)|| id === null || id === ""){
      return null;
    }
    return this.get('store').findRecord('organization', id).then((data) => {
      self.set('organization', data);
    });
  }
});
