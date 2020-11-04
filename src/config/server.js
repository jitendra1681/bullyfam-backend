require('dotenv').config()

export default {
  port: process.env.PORT || '5001',
  host: '0.0.0.0',
  routes: {
    cors: {
      origin: ['*'],
      additionalHeaders: ['token']
    },
    payload: {
      maxBytes: 26214400
    }
  }
}
