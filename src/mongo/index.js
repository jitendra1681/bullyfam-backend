import Bluebird from 'bluebird'
import Hoek from 'hoek'
import Mongoose from 'mongoose'
import _ from 'lodash'
import dotenv from 'dotenv'

/*eslint no-magic-numbers: ['error', { 'ignore': [25, 30000, 60000, 30] }]*/
dotenv.config()
Mongoose.Promise = Bluebird
let defaults = {
  url: ''
}
const mongooseOptions = {
  useNewUrlParser: true,
  //autoReconnect: true,
  poolSize: 25,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000
}

if (_.get(process.env, 'AUTHDB', '') !== '' &&
    _.get(process.env, 'MONGOUSER', '') !== '' &&
    _.get(process.env, 'MONGOPASSWORD', '') !== '' && process.env.DOMAIN !== 'localhost') {
  mongooseOptions.auth = { authdb: (`${_.get(process.env, 'AUTHDB', '')}`) }
  mongooseOptions.user = (`${_.get(process.env, 'MONGOUSER', '')}`)
  mongooseOptions.password = (`${_.get(process.env, 'MONGOPASSWORD', '')}`)
}

// eslint-disable-next-line valid-jsdoc
/**
    * Plugin
    *
   *
  */
exports.register = (server, options, next) => {
  defaults = Hoek.applyToDefaults(defaults, options)

  if (Mongoose.connection.readyState) {
    return next()
  }
  // setup our connection
  server.log(`${process.env.NOED_ENV} server connecting to ${defaults.url} ${defaults.url}`)
  if (!Mongoose.connection.readyState) {
    // setup our connection
    server.log(`${process.env.NOED_ENV} server connecting to ${defaults.url} ${defaults.url}`)
    return Mongoose.connect(defaults.url, mongooseOptions).then(() => {
      return next() // call the next item in hapi bootstrap
    })
  }
}

exports.register.attributes = {
  name: 'mongo'
}
