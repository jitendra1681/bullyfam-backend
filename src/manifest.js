import Confidence from 'confidence'
import dotenv from 'dotenv'

import AppConfig from './config'

dotenv.config()

const criteria = {
  env: process.env.NODE_ENV
}

const manifest = {
  $meta: 'Our main server manifest',
  server: {},
  connections: [
    AppConfig.get('/server')
  ],
  registrations: [
    { plugin: 'hapi-auth-jwt2' },
    { plugin: 'inert' },
    { plugin: 'vision' },
    { plugin: {
      register: 'hapi-swagger',
      options: AppConfig.get('/api')
    }
    }, {
      plugin: {
        register: 'good',
        options: AppConfig.get('/logging')
      }
    }, {
      plugin: {
        register: './mongo',
        options: AppConfig.get('/mongo')
      }
    },
    // {
    //   plugin: {
    //     register: './cron',
    //     options: AppConfig.get('/job')
    //   }
    // },
    {
      plugin: {
        register: './auth',
        options: AppConfig.get('/auth')
      }
    },
    {
      plugin: {
        register: './hapi-rate-limit',
        options: AppConfig.get('/ratelimit')
      }
    },
    // { plugin: './session' },
    { plugin: './users' },
    { plugin: './me' },
    // { plugin: './company' },
    // { plugin: './jobs' },
    // { plugin: './order' },
    // { plugin: './events' },
    // { plugin: './purchase_order' },
    // { plugin: './dashboard' },
    // { plugin: './products' },
    // { plugin: './product_items' },
    // { plugin: './tracking' },
    // { plugin: './get_help' },
    // { plugin: './variant' },
    // { plugin: './cost_history' },
    // { plugin: './payment_methods' },
    // { plugin: './inventory_item' },
    { plugin: './email' }
    // { plugin: './transaction' },
    // { plugin: './incoming_pos' }
  ]
}

const store = new Confidence.Store(manifest)

export default {
  get: key => store.get(key, criteria),
  meta: key => store.meta(key, criteria)
}
