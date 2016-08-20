import Ember from 'ember';

export default Ember.Controller.extend({
  sortProperties: 'minimum_count:asc',
  order: 'asc',
  sortedOrganizations: Ember.computed.sort('model.organizations', 'sortProperties'),
  sortedStudents: Ember.computed.sort('model.students', 'sortProperties'),
  actions: {
    sortBy(property){
      var localOrder = this.get('order');
      if(localOrder == 'asc'){
        localOrder = 'desc';
      } else {
        localOrder = 'asc';
      }
      this.set('order',localOrder);
      this.set('sortProperties',[property+':' + localOrder]);
    }
  }
});
