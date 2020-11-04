// import sendHtokReturn from './handlers/send-hto-return-email'
// import sendEmailOnHTOKNotRetrurn from './handlers/htok-kit-not-return'

exports.register = (server, options, next) => {
  // setup our routes
  // sendHtokReturn(server, options)
  // sendEmailOnHTOKNotRetrurn(server, options)
  next()
}

exports.register.attributes = {
  name: 'email'
}
