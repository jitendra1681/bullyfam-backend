import getMe from './handlers/get_me'
/*
 * Here Includes login user apis
**/
exports.register = (server, options, next) => {
  getMe(server, options)
  next()
}

exports.register.attributes = {
  name: 'me'
}
