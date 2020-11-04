/*
 * Tax Provision Loggin Config file functions
**/
import fs from 'fs'

import moment from 'moment'
import dotenv from 'dotenv'

dotenv.config()

const backUp = moment().format('MM_DD_YYYY')
const serverPath = __dirname.split(`/${process.env.DIRECTORYNAME}`)[0]
const desLocalPath = `${serverPath}/server_logs/${backUp}_log`
if (!fs.existsSync(desLocalPath)) {
  fs.appendFile(`${desLocalPath}`, '', err => {
    if (!err) {
      // eslint-disable-next-line no-console
      console.log(desLocalPath)
    }
  })
}

const logging = {}

logging.includes = {
  request: ['headers', 'payload']
}
// eslint-disable-next-line no-magic-numbers
logging.ops = {
  interval: 1000
}
logging.reporters = {
  file: [{
    module: 'good-squeeze',
    name: 'Squeeze',
    args: [{
      log: '*',
      response: '*',
      request: '*'
    }]
  }, {
    module: 'good-squeeze',
    name: 'SafeJson'
  }, {
    module: 'good-file',
    args: [`${desLocalPath}`]
  }
  ]
}

export default logging
