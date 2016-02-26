import DS from 'ember-data';

export default DS.Model.extend({
  owner: DS.attr('string'),
  name: DS.attr('string'),
  address: DS.attr('string'),
  contact_name: DS.attr('string'),
  contact_phone: DS.attr('string'),
  contact_email: DS.attr('string'),
  person_on_site: DS.attr('string'),
  description: DS.attr('string'),
  special_instructions: DS.attr('string'),
  notes: DS.attr('string'),
  minimum_count: DS.attr('number'),
  maximum_count: DS.attr('number'),
  tools: DS.attr('string')
});
