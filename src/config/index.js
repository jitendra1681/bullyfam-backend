import Confidence from 'confidence'

/*
 * Tax Provision Config files includes here
**/
import pkg from '../../package.json'

import api from './api'
import auth from './auth'
import general from './general'
import logging from './logging'
import mongo from './mongo'
import server from './server'
import aws from './aws'
import emitter from './emitter'
import sendgrid from './sendgrid'
import stripe from './stripe'
import ratelimit from './ratelimit'
import job from './job'

const criteria = {
  env: process.env.NODE_ENV
}

const config = {
  $meta: 'Our main server config',
  pkg,
  server,
  api,
  auth,
  general,
  logging,
  job,
  mongo,
  aws,
  emitter,
  sendgrid,
  stripe,
  ratelimit
}

config.payload = {
  maxBytes: 100000000000
}

const store = new Confidence.Store(config)
export default {
  get: key => store.get(key, criteria)
}
