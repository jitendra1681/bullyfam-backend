/**
 * Module imports
 *
 **/
// import _ from 'lodash'
import Hoek from 'hoek'
// import GeoIP from 'geoip-lite'
import Joi from 'joi'

/**
 * Project imports
 *
 **/
import Helpers from '../../helpers'
import Users from '../users_model'
// import OTPs from '../../users/users-otp-model'
// import Twilio from '../../services/twilio'

// let TwilioService = new Twilio()

/**
 * Setup
 *
 **/

let defaults = {}
/**
     * Handler
     *
     **/

const handler = async(request, reply) => {
  const payload = request.payload
  try {
    if (payload.email) {
      const findMobileNo = await Users.findOne({ email: payload.email, role: 'user' })
      if (!findMobileNo) {
        return reply({ status: false, message: 'Your email is not registered', data: {}, token: '' })
      }
    }
    const findUser = await Users.findOne({ email: payload.email, password: payload.password, role: 'user' })
    if (!findUser) {
      return reply({ status: false, message: 'You are not logged in ! please check email or password', data: {}, token: '' })
    }
    const token = Helpers.createJwt(findUser)
    await Users.findOneAndUpdate({ _id: findUser._id }, { $set: { 'userToken': token } })
    findUser.userToken = token
    return reply({ status: true, message: 'You are logged in successfully', data: findUser, token })
  } catch (err) {
    return reply({
      status: false,
      message: err.message
    })
  }
}

const routeConfig = {
  method: 'POST',
  path: '/user/login',
  config: {
    validate: {
      payload: {
        email: Joi.string().required(),
        password: Joi.string().required()
      }
    },
    tags: ['api', 'token'],
    description: 'Returns a token .',
    notes: [],
    handler
  }
}

export default (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}
