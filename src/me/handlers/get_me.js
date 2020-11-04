import Hoek from 'hoek'
import Bluebird from 'bluebird'

import Helpers from '../../helpers'
import Constants from '../../constants'
import Users from '../../users/users_model'
// import SentryService from '../../services/sentry_service'

// const SentryServices = new SentryService()
let defaults = {}
/*
 * Here is the api for get login user record based on jwt token
**/
/*eslint no-magic-numbers: ['error', { 'ignore': [1, -1, 0, -240]}]*/
/*eslint max-nested-callbacks: [2, 5]*/
const handler = async (request, reply) => {
  try {
    const id = Helpers.extractUserId(request)
    Bluebird.all([
      Users.findOne({ _id: id }).lean()
    ]).spread(async user => {
      if (user) {
        return reply({
          status: true,
          message: 'ok',
          data: user
        }).code(Constants.HTTP200)
      } else {
        reply({
          status: false,
          message: 'ok',
          data: {}
        }).code(Constants.HTTP200)
      }
    })
  } catch (error) {
    // SentryServices.sendException(error)
    return reply({
      status: false,
      message: error.message,
      data: ''
    })
  }
}
const routeConfig = {
  method: 'GET',
  path: '/user/me',
  config: {
    auth: 'jwt',
    tags: ['api', 'me'],
    description: 'Returns a user object based on JWT along with a new token.',
    notes: [],
    handler
  }
}

export default (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}
