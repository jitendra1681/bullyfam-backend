import _ from 'lodash'

import constants from '../constants'
/*
 * Api Responder
**/
const massagePayload = payload => {
  // setup an empty response when our route handler provides null
  if (payload === null) {
    payload = []
  }
  if (!_.isArray(payload)) {
    payload = [payload]
  }
  return payload
}

const getResponseCode = (request, payload) => {
  let responseCode = constants.HTTP200
  if (request.method === 'post') responseCode = constants.HTTP201
  if (!payload.length && request.method !== 'get') responseCode = constants.HTTP204
  return responseCode
}

const responder = (server, request, reply) => {
  // continue without modification if it's an error or docs
  const skip = new RegExp('documentation|swagger|/me|session|/listings/all').test(request.path)
  if (request.response.isBoom || skip) {
    return reply.continue()
  }
  const payload = massagePayload(request.response.source)
  const responseCode = getResponseCode(request, payload)

  return reply({
    message: 'ok',
    data: payload
  }).code(responseCode)
}

exports.register = (server, options, next) => {
  server.ext('onPreResponse', responder)
  next()
}

exports.register.attributes = {
  name: 'responder'
}
