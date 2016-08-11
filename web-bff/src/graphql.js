'use strict';

const graphql = require('graphql');

const schemaFactory = require('./query/schema');
const tables        = require('./dynamodb/tables');
const DayService    = require('./services/dayService');

module.exports.getSchema = function() {
  const dayService = new DayService(tables.Day);
  return schemaFactory(dayService);
};

module.exports.handler = function(event, context, cb) {
  console.log('Received event', event);
  const schema = this.getSchema();

  console.log('Processing graphql query');
  return graphql.graphql(schema, event.body.query)
    .then((response) => {
      cb(null, response)
    })
    .catch((error) => {
      cb(error)
    });
}
