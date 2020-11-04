/**
 * Module imports
 *
 **/
// import _ from 'lodash'
import Hoek from 'hoek'
// import GeoIP from 'geoip-lite'
// import Joi from 'joi'
// import requestHttp from 'request'

/**
 * Project imports
 *
 **/
import Helpers from '../../helpers'
import Users from '../users_model'
// import OTPs from '../../users/users-otp-model'
// import Service from '../../services/sms'
/**
 * Setup
 *
 **/

let defaults = {}

// let geocoder = NodeGeocoder(options);
/**
     * Handler
     *
     **/

const handler = async(request, reply) => {
  const payload = request.payload
  try {
    if (payload.email) {
      const findUserEmail = await Users.findOne({ email: payload.email, role: 'user' })
      if (findUserEmail) {
        return reply({ status: false, message: 'User email already registered!', 'data': {}, 'token': '' })
      }
    }

    if (payload.phoneNo) {
      const findUserNumber = await Users.findOne({ phoneNo: payload.phoneNo, role: 'user' })
      if (findUserNumber) {
        return reply({ status: false, message: 'Mobile number already registered!', 'data': {}, 'token': '' })
      }
    }

    payload.role = 'user'
    payload.username = payload.phoneNo
    const createUser = await Users.create(payload)
    if (!createUser) {
      return reply({ status: false, message: 'Something went wrong', data: {}, token: '' })
    }
    const token = Helpers.createJwt(createUser)
    const userToken = token

    await Users.findOneAndUpdate({ _id: createUser._id }, { $set: { userToken } })

    const findUser = await Users.findOne({ _id: createUser._id })
    //  // let currentTime = new Date()
    //  let newTime = new Date().getTime()
    //  let reduce = newTime - 3600000
    //  // let reduce = newTime - 300000
    //  let expiryTime = newTime + 60000
    //  var digits = '0123456789';
    //  var otpLength = 4;
    //  var otp = '';
    //  for(let i=1; i<=otpLength; i++)
    //  {
    //    var index = Math.floor(Math.random()*(digits.length));
    //    otp = otp + digits[index];
    //  }

    // // const otp = Math.floor(100000 + Math.random() * 900000)
    //  let otpObject = {
    //    phoneNo:payload.phoneNo,
    //    expiryTime:expiryTime,
    //    otp:otp,
    //    time:newTime
    //  }
    //  const findOTP = await OTPs.findOne({ phoneNo:payload.phoneNo })
    //  if(!findOTP){
    //    //otpObject.otp = "1111"
    //    const createOTP = await OTPs.create(otpObject)
    //  }else{
    //    findOTP.otp = otpObject.otp
    //    findOTP.expiryTime = otpObject.expiryTime
    //    findOTP.time = otpObject.time
    //    const updateOTP = await OTPs.findOneAndUpdate({ _id:findOTP._id }, findOTP)
    //  }
    //  const msg = `${otp} is your Ever With U verification code`
    //  const sendOTP = await requestHttp(`https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey=oH54rKS4F0KEYvURIXpZJQ&senderid=EVRWTU&channel=2&DCS=0&flashsms=0&number=${payload.phoneNo}&text=${msg}`)

    return reply({ status: true, message: 'User registered successfully.', data: findUser, token: userToken })


    // createUser.isNewUser = true
    // createUser.userToken = token
    //return reply({status: true,"message":"Your account has been created successfully", "data":createUser,"token":token })

  } catch (err) {
    return reply({
      status: false,
      message: err.message,
      data: {},
      token: ''
    })
  }
}

const routeConfig = {
  method: 'POST',
  path: '/user/create',
  config: {
    // validate: {
    //   payload: {
    //     mobileNo: Joi.string().required(),
    //     userName: Joi.string().required(),
    //     email: Joi.string().required(),
    //     password: Joi.string().required(),
    //     // deviceId: Joi.string().required(),
    //     // deviceToken: Joi.string().required(),
    //     deviceType: Joi.string().required(),
    //     lat: Joi.string().required(),
    //     lng: Joi.string().required(),
    //   }
    // },
    tags: ['api', 'user'],
    description: 'Returns a user .',
    notes: [],
    handler
  }
}

export default (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}
