'use strict';

const hapi = require('hapi');
const joi = require('joi');
const range = require('lodash.range');

const config = require('./config');
const fizzbuzz = require('./index');

const server = new hapi.Server();

server.connection(config.connection);

server.route({
  method: 'GET',
  path: '/fizzbuzz',
  config: {
    validate: {
      query: {
        start: joi.number().integer().default(1),
        end: joi.number().integer().default(100)
      },
    },
  },
  handler: (request, reply) => {
    let result = null;
    try {
      result = fizzbuzz(range(request.query.start, request.query.end + 1));
    }
    catch (err) {
      console.log(err);
      return reply(err);
    }
    reply(result);
  }
});

server.start((err) => {
  if (err) throw err;

  console.log(server.info.uri);
});
