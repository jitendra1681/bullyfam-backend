import postUser from './handlers/post_user'
import loginUser from './handlers/login_user'

exports.register = (server, options, next) => {
  postUser(server, options)
  loginUser(server, options)
  next()
}

exports.register.attributes = {
  name: 'users'
}
