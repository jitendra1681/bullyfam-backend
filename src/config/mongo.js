import dotenv from 'dotenv'
/*
 * Tax Provision MongoDB Connection string define here
**/
dotenv.config()

const mongo = {}
mongo.url = {
  $filter: 'env',
  development: process.env.MONGODB_URI || 'mongodb://localhost:27017/ringc_portal',
  test: process.env.MONGODB_URI || 'mongodb://localhost:27017/ringc_portal',
  sandbox: process.env.MONGODB_URI || 'mongodb://localhost:27017/ringc_portal',
  production: process.env.MONGODB_URI || 'mongodb://localhost:27017/ringc_portal',
  $default: process.env.MONGODB_URI || 'mongodb://localhost:27017/ringc_portal'
}

export default mongo
