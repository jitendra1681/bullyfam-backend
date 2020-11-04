import bluebird from 'bluebird'
import Joi from 'joi'
import ObjectId from 'joi-objectid'

Joi.objectId = ObjectId(Joi)
bluebird.promisifyAll(Joi)

export default Joi
