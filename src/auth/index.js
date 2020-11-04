import Hoek from 'hoek'
import Mongoose from 'mongoose'
//import _ from 'lodash'

import Helpers from '../helpers'

//import Constants from './../constants.js'

/*
 * Here Auth Server details
 * Validate Function checking here
**/
let defaults = {
  key: null,
  verifyOptions: { algorithms: ['HS256'] },
  validateFunc: (decoded, request, callback) => {
    const isValidate = Helpers.CheckDomain(request)
    if (!isValidate) {
      return callback(null, false)
    }
    // validate the mongo id
    if (!Mongoose.Types.ObjectId.isValid(decoded.id)) {
      return callback(null, false)
    } else {
      // const userRole = _.findKey(Constants.USER.ROLES, data => {
      //   return data === _.get(decoded, 'scope', '3')
      // })
      // if (userRole) {
      //   let accessApis = []
      //   accessApis = _.find(Constants.USERAPIS, (data, key) => {
      //     return key === userRole
      //   })
      //   const isApiAllowed = _.findIndex(accessApis, api => {
      //     return api.path === _.get(request.route, 'path', '') &&
      //     api.method === _.get(request.route, 'method', '')
      //   })
      //   if (isApiAllowed !== -1) {
      //     return callback(null, true)
      //   } else {
      //     return callback(null, false)
      //   }
      return callback(null, true)
      // } else {
      //   return callback(null, false)
      // }
    }
  }
}

exports.register = (server, options, next) => {
  defaults = Hoek.applyToDefaults(defaults, options)
  server.auth.strategy('jwt', 'jwt', defaults)
  next()
}

exports.register.attributes = {
  name: 'auth'
}
