// import Path from 'path'

// import _ from 'lodash'
import Glue from 'glue'
// import * as Sentry from '@sentry/node'

import Manifest from './manifest'

// if (_.get(process.env, 'NODE_ENV', '') === 'production') {
//   Sentry.init({ dsn: process.env.SENTRY_KEY_RELIBIT })
// }

const composeOptions = {
  relativeTo: __dirname
}

const composer = Glue.compose.bind(Glue, Manifest.get('/'), composeOptions)
composer((err, server) => {
  if (err) throw err
  server.initialize(errInit => {
    if (err) {
      throw errInit
    }
    server.start(() => {
      const env = process.env.NODE_ENV
      const msg = `${env} server started at ${server.info.uri}`
      server.log(['server', 'info'], msg)
    })
  })
})

export default composer
